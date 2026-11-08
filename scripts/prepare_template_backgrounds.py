import os
import sys
import fitz
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

sys.stdout.reconfigure(encoding='utf-8')

# 1. Prepare clean background images from the PDF if not already done
template_pdf = r'C:\Lap_Trinh_Ung_dung\Xanh Dương Trắng và Đen Cổ Điển Du lịch Việt Nam Cố Đô Huế Bài Thuyết Trình.pdf'
doc_orig = fitz.open(template_pdf)

os.makedirs('scratch/heritage_slides', exist_ok=True)

# Generate high-res clean background for each page
# Note: For page 1 and page 10, let's keep original art or clean version
for i in range(10):
    page = doc_orig[i]
    # For page 10, keep the artistic 'XIN CẢM ƠN'
    if i == 9:
        pix = page.get_pixmap(dpi=150)
        pix.save(f'scratch/heritage_slides/slide_bg_{i+1}.png')
    else:
        # Load from template_no_text if exists, or redact text
        # Let's create a fresh redacted page
        doc_tmp = fitz.open(template_pdf)
        p = doc_tmp[i]
        for b in p.get_text("blocks"):
            p.add_redact_annot(fitz.Rect(b[0], b[1], b[2], b[3]))
        p.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
        pix = p.get_pixmap(dpi=150)
        pix.save(f'scratch/heritage_slides/slide_bg_{i+1}.png')

print("All slide backgrounds saved to scratch/heritage_slides!")
