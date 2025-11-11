# 🎹 ToneForge+ - Advanced Music Composition Workstation

A powerful web-based music composition and synthesis application built with React and Tone.js. Create music using visual sequencing, score notation, or live coding!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎼 Three Composition Modes

1. **Visual Sequencer** - Traditional grid-based pattern sequencer
2. **Score Editor** - Music notation with staff visualization
3. **Live Coding** - Code-based pattern creation with real-time feedback

### 🎨 Instrument Library

- **21+ Built-in Instruments** across multiple categories
- Synthesizers (Lead, Bass, Pad)
- Orchestral (Violin, Flute, Saxophone)
- Percussion (Kick, Snare, Tom, Hi-Hat)
- Keyboards (Electric Piano, Organ)
- **Custom Instrument Maker** - Upload or record your own samples

### ⌨️ Keyboard Shortcuts

- `Space` - Play/Pause
- `Cmd/Ctrl + N` - New Score
- `Cmd/Ctrl + S` - Save Composition
- `Cmd/Ctrl + P` - Play/Pause
- `Cmd/Ctrl + Z` - Undo

[See complete keyboard shortcuts documentation](KEYBOARD_SHORTCUTS.md)

### 📝 Score Editor Features

- Visual staff notation with treble clef
- Support for multiple note durations (whole, half, quarter, eighth, sixteenth)
- Configurable tempo (40-240 BPM)
- Multiple time signatures (4/4, 3/4, 6/8, 2/4)
- Key signature selection
- Real-time visual feedback
- Playback with any instrument

### 🎨 Custom Instrument Maker

Create your own instruments from audio samples:
- Upload audio files or record live
- Specify the base note of your sample
- Automatic pitch-shifting to generate all notes
- Preview with adjustable pitch
- Persistent storage of custom instruments

### 💻 Live Coding

Write musical patterns using simple syntax:

```javascript
// Example pattern
bpm:120
instr:violin
melody: [C4-4n, E4-4n, G4-4n, C5-4n]
rep(melody, 4)
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/GaganGoswami/tone-forge.git
   cd tone-forge
   ```

2. **Open in browser**
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Or using Node.js
   npx serve
   
   # Or simply open index.html in your browser
   ```

3. **Start creating!**
   - Browse instruments in the left panel
   - Add instruments to the sequencer
   - Switch between tabs to explore different composition modes
   - Use keyboard shortcuts for faster workflow

## 📖 Documentation

- [Features Documentation](FEATURES.md) - Detailed feature descriptions
- [Keyboard Shortcuts](KEYBOARD_SHORTCUTS.md) - Complete shortcut reference

## 🎵 Composition Modes

### 1. Visual Sequencer
- 16-step grid pattern editor
- Multiple tracks with different instruments
- Real-time playback
- Visual note activation

### 2. Score Editor
- Traditional music notation
- Staff visualization with notes
- Click to add notes
- Configurable musical parameters
- Export scores

### 3. Live Coding
- Text-based pattern creation
- Real-time pattern parsing
- Visual waveform feedback
- Pattern library with examples
- Export patterns

## 🛠️ Technology Stack

- **Frontend**: React 18 (via CDN)
- **Audio**: Tone.js 14.8
- **UI**: Custom CSS with design system
- **JavaScript**: ES6+ with JSX (Babel standalone)

## 🎛️ Instrument Categories

- **Lead**: Bright, cutting sounds for melodies
- **Bass**: Deep, low-frequency instruments
- **Pad**: Atmospheric, sustained sounds
- **Strings**: Orchestral string instruments
- **Woodwind**: Flute and wind instruments
- **Brass**: Saxophone and brass sounds
- **Drums**: Percussion instruments
- **Organ**: Church and soft organs
- **Piano**: Electric and acoustic pianos
- **Custom**: User-created instruments

## 💾 Data Management

### Export Options
- **Export Data** - Save all instruments and arrangements
- **Export Arrangement** - Save current composition only
- **Export Pattern** - Save live coding patterns

### Import
- Load previously saved compositions
- Restore custom instruments
- Continue your work seamlessly

## 🌓 Theme Support

Toggle between light and dark modes using the theme button in the header.

## 🎨 Advanced Features

### Instrument Editor
- Oscillator type selection (Sine, Square, Sawtooth, Triangle, Noise)
- ADSR envelope controls (Attack, Decay, Sustain, Release)
- Filter configuration (Lowpass, Highpass, Bandpass)
- Effects (Reverb, Delay)
- Real-time preview

### Pattern System
- Pre-built pattern library
- Save custom patterns
- Load and modify existing patterns
- Export patterns for sharing

## 🔧 Development

This is a client-side application with no build step required:

```bash
# Just serve the files
python3 -m http.server 8080
```

## 📱 Browser Support

Works best in modern browsers with Web Audio API support:
- Chrome/Edge (recommended)
- Firefox
- Safari

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎼 Credits

Built with:
- [React](https://react.dev/) - UI Framework
- [Tone.js](https://tonejs.github.io/) - Web Audio Framework
- [Babel Standalone](https://babeljs.io/docs/en/babel-standalone) - JSX Transformation

## 🌟 Acknowledgments

Inspired by:
- [flat.io](https://flat.io) - Score-based music notation
- [Sonic Pi](https://sonic-pi.net/) - Live coding concepts
- Modern DAW interfaces

---

**Made with ❤️ and 🎵**
