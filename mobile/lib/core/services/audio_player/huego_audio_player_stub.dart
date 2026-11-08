import 'dart:async';
import 'huego_audio_player.dart';

HuegoAudioPlayerInterface getPlatformAudioPlayer() => StubHuegoAudioPlayer();

class StubHuegoAudioPlayer implements HuegoAudioPlayerInterface {
  final StreamController<Duration> _posCtrl = StreamController<Duration>.broadcast();
  final StreamController<Duration> _durCtrl = StreamController<Duration>.broadcast();
  final StreamController<void> _completeCtrl = StreamController<void>.broadcast();
  Timer? _timer;
  double _rate = 1.0;
  int _posMs = 0;
  final int _totalMs = 45000;

  @override
  Stream<Duration> get onPositionChanged => _posCtrl.stream;

  @override
  Stream<Duration> get onDurationChanged => _durCtrl.stream;

  @override
  Stream<void> get onPlayerComplete => _completeCtrl.stream;

  @override
  Future<void> play(String url) async {
    await stop();
    _durCtrl.add(Duration(milliseconds: _totalMs));
    _timer = Timer.periodic(const Duration(milliseconds: 200), (t) {
      _posMs += (200 * _rate).toInt();
      _posCtrl.add(Duration(milliseconds: _posMs));
      if (_posMs >= _totalMs) {
        _completeCtrl.add(null);
        stop();
      }
    });
  }

  @override
  Future<void> pause() async {
    _timer?.cancel();
  }

  @override
  Future<void> resume() async {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(milliseconds: 200), (t) {
      _posMs += (200 * _rate).toInt();
      _posCtrl.add(Duration(milliseconds: _posMs));
      if (_posMs >= _totalMs) {
        _completeCtrl.add(null);
        stop();
      }
    });
  }

  @override
  Future<void> stop() async {
    _timer?.cancel();
    _posMs = 0;
  }

  @override
  Future<void> setPlaybackRate(double rate) async {
    _rate = rate;
  }

  @override
  void dispose() {
    stop();
    _posCtrl.close();
    _durCtrl.close();
    _completeCtrl.close();
  }
}

