// ignore: avoid_web_libraries_in_flutter
import 'dart:async';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'huego_audio_player.dart';

HuegoAudioPlayerInterface getPlatformAudioPlayer() => WebHuegoAudioPlayer();

class WebHuegoAudioPlayer implements HuegoAudioPlayerInterface {
  html.AudioElement? _audio;
  final StreamController<Duration> _posCtrl = StreamController<Duration>.broadcast();
  final StreamController<Duration> _durCtrl = StreamController<Duration>.broadcast();
  final StreamController<void> _completeCtrl = StreamController<void>.broadcast();
  StreamSubscription? _timeSub;
  StreamSubscription? _metaSub;
  StreamSubscription? _endSub;

  @override
  Stream<Duration> get onPositionChanged => _posCtrl.stream;

  @override
  Stream<Duration> get onDurationChanged => _durCtrl.stream;

  @override
  Stream<void> get onPlayerComplete => _completeCtrl.stream;

  @override
  Future<void> play(String url) async {
    await stop();
    final audio = html.AudioElement(url);
    _audio = audio;
    audio.autoplay = true;

    _timeSub = audio.onTimeUpdate.listen((_) {
      if (audio.currentTime > 0) {
        _posCtrl.add(Duration(milliseconds: (audio.currentTime * 1000).toInt()));
      }
    });

    _metaSub = audio.onLoadedMetadata.listen((_) {
      final dur = audio.duration;
      if (!dur.isNaN && !dur.isInfinite) {
        _durCtrl.add(Duration(milliseconds: (dur * 1000).toInt()));
      }
    });

    _endSub = audio.onEnded.listen((_) {
      _completeCtrl.add(null);
    });

    try {
      await audio.play();
    } catch (_) {}
  }

  @override
  Future<void> pause() async {
    _audio?.pause();
  }

  @override
  Future<void> resume() async {
    try {
      await _audio?.play();
    } catch (_) {}
  }

  @override
  Future<void> stop() async {
    _timeSub?.cancel();
    _metaSub?.cancel();
    _endSub?.cancel();
    if (_audio != null) {
      _audio!.pause();
      _audio!.src = '';
      _audio!.remove();
      _audio = null;
    }
  }

  @override
  Future<void> setPlaybackRate(double rate) async {
    if (_audio != null) {
      _audio!.playbackRate = rate;
    }
  }

  @override
  void dispose() {
    stop();
    _posCtrl.close();
    _durCtrl.close();
    _completeCtrl.close();
  }
}

