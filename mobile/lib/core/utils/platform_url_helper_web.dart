// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'platform_url_helper.dart';

PlatformUrlHelperInterface getPlatformUrlHelper() => WebPlatformUrlHelper();

class WebPlatformUrlHelper implements PlatformUrlHelperInterface {
  @override
  void openUrl(String url, {String? downloadFileName}) {
    if (downloadFileName != null && downloadFileName.isNotEmpty) {
      final anchor = html.AnchorElement(href: url)
        ..target = '_blank'
        ..download = downloadFileName;
      html.document.body?.append(anchor);
      anchor.click();
      anchor.remove();
    } else {
      html.window.open(url, '_blank');
    }
  }
}

