"""Hörmodus-Audios mit Piper erzeugen (freie Sprachsynthese, Stimme «de_DE-thorsten-high», Lizenz CC0).

Aufruf:  python make-audio.py <segments.json> <voice.onnx> <ausgabeordner> [--jobs 4]
- liest die von scripts/export-audio-segments.ts exportierten Abschnitte,
- erzeugt je Lektion eine MP3-Datei (mono, 32 kbit/s) mit Pausen zwischen den Abschnitten
  und der Denkpause im Hör-Quiz,
- schreibt manifest.json mit Prüfsumme, Dauer und Sprungmarken (Startzeit und Titel je Abschnitt).
Lektionen, deren Prüfsumme schon im bestehenden Manifest steht, werden übersprungen.
"""
import json, os, subprocess, sys, tempfile, wave
from concurrent.futures import ProcessPoolExecutor

GAP = 0.7  # Sekunden zwischen Abschnitten

def render(args):
    lesson, voice_path, outdir = args
    from piper import PiperVoice
    voice = PiperVoice.load(voice_path)
    rate = voice.config.sample_rate
    frames = bytearray(); marks = []; t = 0.0
    silence = lambda sec: b'\x00\x00' * int(rate * sec)
    for s in lesson['segs']:
        marks.append({'t': round(t, 2), 'title': s['title']})
        with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
            with wave.open(tmp.name, 'wb') as w:
                voice.synthesize_wav(s['text'], w)
            with wave.open(tmp.name) as r:
                data = r.readframes(r.getnframes())
        frames += data; t += len(data) / 2 / rate
        pause = GAP + float(s.get('pause') or 0)
        frames += silence(pause); t += pause
    wav_path = os.path.join(outdir, lesson['id'] + '.wav')
    with wave.open(wav_path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(bytes(frames))
    mp3 = os.path.join(outdir, lesson['id'] + '.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav_path, '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '32k', mp3], check=True)
    os.remove(wav_path)
    return lesson['id'], {'hash': lesson['hash'], 'file': lesson['id'] + '.mp3', 'dur': round(t, 1), 'marks': marks}

def main():
    seg_file, voice_path, outdir = sys.argv[1:4]
    jobs = int(sys.argv[sys.argv.index('--jobs') + 1]) if '--jobs' in sys.argv else 4
    os.makedirs(outdir, exist_ok=True)
    lessons = json.load(open(seg_file, encoding='utf-8'))
    man_path = os.path.join(outdir, 'manifest.json')
    man = json.load(open(man_path, encoding='utf-8')) if os.path.exists(man_path) else {'voice': 'Piper de_DE-thorsten-high (CC0)', 'lessons': {}}
    todo = [l for l in lessons if man['lessons'].get(l['id'], {}).get('hash') != l['hash'] or not os.path.exists(os.path.join(outdir, l['id'] + '.mp3'))]
    print(len(todo), 'von', len(lessons), 'Lektionen zu erzeugen', flush=True)
    with ProcessPoolExecutor(max_workers=jobs) as ex:
        for lid, entry in ex.map(render, [(l, voice_path, outdir) for l in todo]):
            man['lessons'][lid] = entry
            json.dump(man, open(man_path, 'w', encoding='utf-8'), ensure_ascii=False)
            print('fertig', lid, entry['dur'], 's', flush=True)
    # Lektionen, die es nicht mehr gibt, aus dem Manifest entfernen
    ids = {l['id'] for l in lessons}
    man['lessons'] = {k: v for k, v in man['lessons'].items() if k in ids}
    json.dump(man, open(man_path, 'w', encoding='utf-8'), ensure_ascii=False)
    print('Manifest:', len(man['lessons']), 'Lektionen')

if __name__ == '__main__':
    main()
