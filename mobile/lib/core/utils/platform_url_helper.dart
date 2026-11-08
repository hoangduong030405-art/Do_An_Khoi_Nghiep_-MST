import 'platform_url_helper_stub.dart'
    if (dart.library.html) 'platform_url_helper_web.dart';

abstract class PlatformUrlHelperInterface {
  void openUrl(String url, {String? downloadFileName});
}

PlatformUrlHelperInterface createPlatformUrlHelper() => getPlatformUrlHelper();

