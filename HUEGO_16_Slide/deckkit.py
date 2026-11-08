# -*- coding: utf-8 -*-
"""Small helper layer on top of python-pptx for the HUEGO deck."""
import os
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from pptx.oxml import parse_xml
from lxml import etree
from PIL import Image, ImageFont

# ---------------------------------------------------------------- palette
INK        = "18140D"
BLACK      = "000000"
WHITE      = "FFFFFF"
CREAM      = "F2F1EB"
PAPER      = "FAF8F2"
BLUE       = "0E6FA6"
BLUE_DARK  = "0A3D5C"
BLUE_DEEP  = "08222F"
BLUE_LIGHT = "DCEBF3"
BLUE_PALE  = "EEF5F9"
GOLD       = "B98A32"
GOLD_LIGHT = "EFE1C2"
GRAY       = "6E6A60"
GRAY_MID   = "9A958A"
GRAY_LIGHT = "D8D4C9"
RED        = "A33A26"

DISPLAY = "Segoe UI Black"
LABEL   = "Bahnschrift SemiBold Condensed"
BODY    = "Segoe UI"
LIGHT   = "Segoe UI Light"
SERIF   = "Georgia"

FONT_FILES = {
    (DISPLAY, False): r"C:\Windows\Fonts\seguibl.ttf",
    (BODY, False):    r"C:\Windows\Fonts\segoeui.ttf",
    (BODY, True):     r"C:\Windows\Fonts\segoeuib.ttf",
    (LIGHT, False):   r"C:\Windows\Fonts\segoeuil.ttf",
    (SERIF, False):   r"C:\Windows\Fonts\georgia.ttf",
    (SERIF, True):    r"C:\Windows\Fonts\georgiab.ttf",
    (LABEL, True):    r"C:\Windows\Fonts\bahnschrift.ttf",
}

ALIGN = {"l": PP_ALIGN.LEFT, "c": PP_ALIGN.CENTER, "r": PP_ALIGN.RIGHT, "j": PP_ALIGN.JUSTIFY}
ANCHOR = {"t": MSO_ANCHOR.TOP, "m": MSO_ANCHOR.MIDDLE, "b": MSO_ANCHOR.BOTTOM}


def C(hexstr):
    return RGBColor.from_string(hexstr)


# ---------------------------------------------------------------- measuring
def text_width_pt(text, family, bold, size_pt, tracking_em=0.0):
    path = FONT_FILES.get((family, bold), FONT_FILES[(BODY, False)])
    f = ImageFont.truetype(path, max(1, int(round(size_pt * 4))))
    w = f.getlength(text) / 4.0
    if tracking_em:
        w += tracking_em * size_pt * max(0, len(text) - 1)
    return w


def fit_size(lines, max_width_in, family=DISPLAY, bold=False,
             max_pt=90, min_pt=28, tracking_em=-0.015):
    """Largest font size (pt) at which every line fits max_width_in."""
    for s in range(int(max_pt), int(min_pt) - 1, -1):
        if all(text_width_pt(l, family, bold, s, tracking_em) / 72.0 <= max_width_in
               for l in lines):
            return s
    return min_pt


# ---------------------------------------------------------------- text
def _style_run(run, o):
    f = run.font
    fam = o.get("font", BODY)
    f.name = fam
    f.size = Pt(o.get("size", 14))
    f.bold = o.get("bold", False)
    f.italic = o.get("italic", False)
    f.color.rgb = C(o.get("color", INK))
    tr = o.get("tracking")
    if tr:
        # tracking is expressed in em; DrawingML wants 1/100 pt
        run.font._rPr.set("spc", str(int(round(tr * o.get("size", 14) * 100))))
    if o.get("strike"):
        run.font._rPr.set("strike", "sngStrike")
    if o.get("underline"):
        f.underline = True
    if o.get("caps"):
        # caller already uppercases; kept for API symmetry
        pass


def fill_tf(tf, paras, anchor="t", margins=(0, 0, 0, 0), wrap=True):
    tf.word_wrap = wrap
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = Inches(margins[0])
    tf.margin_right = Inches(margins[1])
    tf.margin_top = Inches(margins[2])
    tf.margin_bottom = Inches(margins[3])
    tf.vertical_anchor = ANCHOR[anchor]
    for i, p in enumerate(paras):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        if isinstance(p, str):
            p = {"runs": [(p, {})]}
        para.alignment = ALIGN[p.get("align", "l")]
        para.line_spacing = p.get("line", 1.0)
        if p.get("before") is not None:
            para.space_before = Pt(p.get("before", 0))
        if p.get("after") is not None:
            para.space_after = Pt(p.get("after", 0))
        for r in p["runs"]:
            text, o = (r, {}) if isinstance(r, str) else r
            run = para.add_run()
            run.text = text
            _style_run(run, o)
    return tf


def txt(slide, x, y, w, h, paras, anchor="t", margins=(0, 0, 0, 0), wrap=True):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    fill_tf(tb.text_frame, paras, anchor=anchor, margins=margins, wrap=wrap)
    return tb


def shape_txt(sh, paras, anchor="m", margins=(0.08, 0.08, 0.02, 0.02)):
    fill_tf(sh.text_frame, paras, anchor=anchor, margins=margins)
    return sh


# ---------------------------------------------------------------- shapes
def _no_line(sh):
    sh.line.fill.background()


def rect(slide, x, y, w, h, fill=None, line=None, lw=1.0, radius=None,
         shadow=False, alpha=None, rot=None):
    st = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    sh = slide.shapes.add_shape(st, Inches(x), Inches(y), Inches(w), Inches(h))
    if radius:
        sh.adjustments[0] = min(0.5, radius / max(0.01, min(w, h)))
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid()
        sh.fill.fore_color.rgb = C(fill)
        if alpha is not None:
            set_alpha(sh, alpha)
    if line is None:
        _no_line(sh)
    else:
        sh.line.color.rgb = C(line)
        sh.line.width = Pt(lw)
    sh.shadow.inherit = False
    if shadow:
        soft_shadow(sh)
    if rot is not None:
        sh.rotation = rot
    sh.text_frame.word_wrap = True
    return sh


def circle(slide, x, y, d, fill, line=None, lw=1.0, alpha=None):
    sh = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(d), Inches(d))
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid()
        sh.fill.fore_color.rgb = C(fill)
        if alpha is not None:
            set_alpha(sh, alpha)
    if line is None:
        _no_line(sh)
    else:
        sh.line.color.rgb = C(line)
        sh.line.width = Pt(lw)
    sh.shadow.inherit = False
    return sh


def hline(slide, x, y, w, color=GRAY_LIGHT, thickness=0.008):
    return rect(slide, x, y, w, thickness, fill=color)


def vline(slide, x, y, h, color=GRAY_LIGHT, thickness=0.008):
    return rect(slide, x, y, thickness, h, fill=color)


def arrow_down(slide, x, y, w, h, color=GRAY_MID):
    sh = slide.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Inches(x), Inches(y), Inches(w), Inches(h))
    sh.fill.solid()
    sh.fill.fore_color.rgb = C(color)
    _no_line(sh)
    sh.shadow.inherit = False
    return sh


def set_alpha(sh, alpha):
    """alpha 0..1 opacity."""
    solid = sh.fill._xPr.find(qn("a:solidFill"))
    srgb = solid.find(qn("a:srgbClr"))
    a = etree.SubElement(srgb, qn("a:alpha"))
    a.set("val", str(int(round(alpha * 100000))))


def soft_shadow(sh, blur=22, dist=7, opacity=0.14, direction=5400000):
    spPr = sh._element.spPr
    effect = parse_xml(
        '<a:effectLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
        f'<a:outerShdw blurRad="{int(blur*12700)}" dist="{int(dist*12700)}" '
        f'dir="{direction}" algn="ctr" rotWithShape="0">'
        f'<a:srgbClr val="000000"><a:alpha val="{int(opacity*100000)}"/></a:srgbClr>'
        '</a:outerShdw></a:effectLst>'
    )
    spPr.append(effect)


def gradient_overlay(slide, x, y, w, h, top_alpha=0.0, bottom_alpha=0.9,
                     color="000000", angle=5400000):
    return gradient_stops(slide, x, y, w, h, [(0.0, top_alpha), (1.0, bottom_alpha)],
                          color=color, angle=angle)


def gradient_stops(slide, x, y, w, h, stops, color="000000", angle=5400000):
    """stops: list of (position 0..1, alpha 0..1)."""
    sh = rect(slide, x, y, w, h, fill=color)
    spPr = sh._element.spPr
    spPr.remove(spPr.find(qn("a:solidFill")))
    gs = "".join(
        f'<a:gs pos="{int(p*100000)}"><a:srgbClr val="{color}">'
        f'<a:alpha val="{int(a*100000)}"/></a:srgbClr></a:gs>' for p, a in stops
    )
    xml = (
        '<a:gradFill xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" rotWithShape="1">'
        f'<a:gsLst>{gs}</a:gsLst>'
        f'<a:lin ang="{angle}" scaled="0"/>'
        '</a:gradFill>'
    )
    ln = spPr.find(qn("a:ln"))
    if ln is not None:
        ln.addprevious(parse_xml(xml))
    else:
        spPr.append(parse_xml(xml))
    return sh


# ---------------------------------------------------------------- pictures
def pic(slide, path, x, y, w=None, h=None):
    kw = {}
    if w is not None:
        kw["width"] = Inches(w)
    if h is not None:
        kw["height"] = Inches(h)
    p = slide.shapes.add_picture(path, Inches(x), Inches(y), **kw)
    p.shadow.inherit = False
    return p


def pic_cover(slide, path, x, y, w, h):
    iw, ih = Image.open(path).size
    src, tgt = iw / ih, w / h
    p = pic(slide, path, x, y, w, h)
    if src > tgt:
        f = (1 - tgt / src) / 2
        p.crop_left = f
        p.crop_right = f
    elif src < tgt:
        f = (1 - src / tgt) / 2
        p.crop_top = f
        p.crop_bottom = f
    return p


# ---------------------------------------------------------------- page chrome
def page(slide, number, section, dark=False, bg=WHITE):
    if bg is None:
        slide.background.fill.background()
    else:
        slide.background.fill.solid()
        slide.background.fill.fore_color.rgb = C(bg)
    fg = WHITE if dark else INK
    sub = "C9C4B8" if dark else GRAY
    line_c = "4A453C" if dark else GRAY_LIGHT

    rect(slide, 0.9, 0.57, 0.105, 0.105, fill=GOLD)
    txt(slide, 1.12, 0.44, 3.0, 0.32,
        [{"runs": [("HUEGO", {"size": 12, "bold": True, "color": fg, "tracking": 0.16})]}],
        anchor="m")
    txt(slide, 12.4, 0.44, 6.7, 0.32,
        [{"runs": [(section.upper(), {"size": 10, "color": sub, "tracking": 0.16,
                                      "font": LABEL, "bold": True})], "align": "r"}],
        anchor="m")
    hline(slide, 0.9, 0.95, 18.2, color=line_c)

    hline(slide, 0.9, 10.62, 18.2, color=line_c)
    txt(slide, 0.9, 10.7, 10.0, 0.28,
        [{"runs": [("Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí",
                    {"size": 9, "color": sub, "font": LABEL})]}], anchor="m")
    txt(slide, 15.5, 10.7, 3.6, 0.28,
        [{"runs": [(f"{number:02d} / 16", {"size": 9, "color": sub, "font": LABEL,
                                           "tracking": 0.12})], "align": "r"}], anchor="m")


def eyebrow(slide, y, text, color=BLUE, x=0.9, w=12.0):
    txt(slide, x, y, w, 0.3,
        [{"runs": [(text.upper(), {"size": 11, "bold": True, "color": color,
                                   "font": LABEL, "tracking": 0.2})]}], anchor="m")


def headline(slide, lines, x, y, w, max_pt=76, min_pt=30, color=INK,
             tracking=-0.02, line=0.9, h=None, align="l"):
    size = fit_size(lines, w, DISPLAY, False, max_pt, min_pt, tracking)
    if h is None:
        h = size * line * len(lines) / 72.0 + 0.15
    paras = [{"runs": [(ln.upper(), {"size": size, "font": DISPLAY, "color": color,
                                     "tracking": tracking})], "line": line, "align": align}
             for ln in lines]
    txt(slide, x, y, w, h, paras)
    return size
