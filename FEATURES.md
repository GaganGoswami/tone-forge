# Features Documentation

## 🎹 Expanded Instrument Library

ToneForge+ now includes a comprehensive instrument library with 21+ instruments across multiple categories:

### Categories
- **Lead**: Bright leads, analog synths, brass stabs
- **Bass**: Deep bass, sub bass
- **Pad**: Warm pads, ambient pads
- **Strings**: Violin
- **Woodwind**: Flute
- **Brass**: Saxophone
- **Drums**: 808 Kick, Snare Drum, Tom Drum, Hi-Hat
- **Organ**: Soft Organ
- **Piano**: Electric Piano
- **Choir**: Choir Aah

### New Instruments Added
1. **Violin** - Rich string sounds with reverb
2. **Flute** - Airy woodwind tones
3. **Saxophone** - Jazz-style brass instrument
4. **Snare Drum** - Crisp percussive hits
5. **Tom Drum** - Deep drum sounds
6. **Bright Synth** - Sharp, modern lead synthesis
7. **Soft Organ** - Church-like organ tones
8. **Electric Piano** - Classic electric keys

## 🎨 Custom Instrument Maker

Create your own instruments by uploading or recording audio samples!

### Features
- **Upload Audio Files**: Support for various audio formats
- **Record Samples**: Record directly from your microphone
- **Pitch Specification**: Tell the app which note your sample represents
- **Automatic Pitch Shifting**: App calculates other notes automatically
- **Preview & Tuning**: Test your instrument with pitch adjustment (-12 to +12 semitones)
- **Local Storage**: Custom instruments persist across sessions

### How to Use
1. Click the "🎨 Custom" button in the Instruments panel
2. Either upload an audio file or record a sample
3. Specify which note the sample represents (e.g., C4, A3)
4. Adjust pitch if needed and preview
5. Save your custom instrument
6. Use it in any composition!

## 📝 Score Editor

A visual music notation system for traditional composition!

### Features
- **Staff Notation**: Visual representation with treble clef
- **Note Input**: Click to add notes with specified pitch and duration
- **Musical Parameters**:
  - Tempo (BPM): 40-240
  - Time Signature: 4/4, 3/4, 6/8, 2/4
  - Key Signature: C Major, G Major, D Major, F Major, A Minor
- **Duration Options**: Whole, Half, Quarter, Eighth, Sixteenth notes
- **Playback**: Hear your composed score
- **Visual Feedback**: See notes on the staff in real-time

### How to Use
1. Switch to the "📝 Score Editor" tab
2. Set your tempo, time signature, and key
3. Select an instrument from the dropdown
4. Choose a note and duration
5. Click "➕ Add Note" to add it to the score
6. See the note appear on the staff
7. Click "▶ Play Score" to hear your composition

## ⌨️ Keyboard Shortcuts

See [KEYBOARD_SHORTCUTS.md](KEYBOARD_SHORTCUTS.md) for complete list.

### Quick Reference
- `Space`: Play/Pause
- `Cmd/Ctrl + N`: New Score
- `Cmd/Ctrl + S`: Save
- `Cmd/Ctrl + P`: Play/Pause
- `Cmd/Ctrl + Z`: Undo

## 🎼 Enhanced Composition Tab

The original sequencer now supports all new instruments:
- Drag and drop instruments into tracks
- 16-step pattern grid
- Real-time playback
- BPM control
- Export compositions

## 💻 Live Coding Mode

Write musical patterns using a simple syntax:
```
bpm:120
instr:violin
melody: [C4-4n, E4-4n, G4-4n, C5-4n]
rep(melody, 2)
```

## Data Management

### Export Options
- **Export Data**: Save all instruments and arrangements
- **Export Arrangement**: Save current composition only
- **Export Pattern**: Save live coding pattern

### Import
- Load previously exported data
- Restore custom instruments
- Continue where you left off

## Browser Support

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

Requires:
- Web Audio API support
- Modern JavaScript (ES6+)
