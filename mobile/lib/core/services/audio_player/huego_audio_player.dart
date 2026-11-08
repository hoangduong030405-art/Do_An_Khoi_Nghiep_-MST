import 'huego_audio_player_stub.dart'
    if (dart.library.html) 'huego_audio_player_web.dart';

abstract class HuegoAudioPlayerInterface {
  Future<void> play(String url);
  Future<void> pause();
  Future<void> resume();
  Future<void> stop();
  Future<void> setPlaybackRate(double rate);
  Stream<Duration> get onPositionChanged;
  Stream<Duration> get onDurationChanged;
  Stream<void> get onPlayerComplete;
  void dispose();
}

HuegoAudioPlayerInterface createHuegoAudioPlayer() => getPlatformAudioPlayer();

