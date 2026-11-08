import 'package:flutter/foundation.dart';
import 'platform_url_helper.dart';

PlatformUrlHelperInterface getPlatformUrlHelper() => StubPlatformUrlHelper();

class StubPlatformUrlHelper implements PlatformUrlHelperInterface {
  @override
  void openUrl(String url, {String? downloadFileName}) {
    debugPrint('Open URL: $url (downloadFileName: $downloadFileName)');
  }
}

