const { useState, useEffect, useCallback, useRef } = React;

// Initial Data - Complete instrument database with live patterns
const initialData = {
  metadata: {
    appName: "ToneForge",
    version: "1.0.0",
    author: "auto-generated",
    description: "Music composition and synthesis workstation"
  },
  instruments: [
    {
      id: "lead-saw-bright",
      name: "Lead Saw Bright",
      category: "lead",
      oscillator: { type: "sawtooth", detune: 0, volume: -6 },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.8, release: 0.5 },
      filter: { type: "lowpass", cutoff: 1500, resonance: 1.2 },
      effect: { type: "reverb", wet: 0.15 },
      meta: { bpm: 120, tags: ["bright", "lead", "energetic"] }
    },
    {
      id: "deep-bass",
      name: "Deep Bass",
      category: "bass",
      oscillator: { type: "sine", detune: 0, volume: -3 },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 0.4 },
      filter: { type: "lowpass", cutoff: 200, resonance: 0.5 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 90, tags: ["bass", "deep", "sub"] }
    },
    {
      id: "warm-pad",
      name: "Warm Pad",
      category: "pad",
      oscillator: { type: "triangle", detune: 5, volume: -10 },
      envelope: { attack: 1.5, decay: 0.5, sustain: 0.9, release: 2.0 },
      filter: { type: "lowpass", cutoff: 800, resonance: 0.3 },
      effect: { type: "reverb", wet: 0.4 },
      meta: { bpm: 80, tags: ["pad", "ambient", "warm"] }
    },
    {
      id: "pluck-synth",
      name: "Pluck Synth",
      category: "lead",
      oscillator: { type: "sawtooth", detune: -10, volume: -8 },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0.3, release: 0.2 },
      filter: { type: "lowpass", cutoff: 2000, resonance: 2.0 },
      effect: { type: "delay", wet: 0.2 },
      meta: { bpm: 120, tags: ["pluck", "sharp", "percussive"] }
    },
    {
      id: "kick-808",
      name: "808 Kick",
      category: "percussive",
      oscillator: { type: "sine", detune: 0, volume: 0 },
      envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.001 },
      filter: { type: "lowpass", cutoff: 150, resonance: 0.1 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 100, tags: ["kick", "bass", "drum"] }
    },
    {
      id: "white-noise-hat",
      name: "White Noise Hi-Hat",
      category: "percussive",
      oscillator: { type: "white", detune: 0, volume: -15 },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.001 },
      filter: { type: "highpass", cutoff: 8000, resonance: 0.5 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 120, tags: ["hihat", "noise", "percussion"] }
    },
    {
      id: "choir-aah",
      name: "Choir Aah",
      category: "choir",
      oscillator: { type: "sine", detune: 8, volume: -12 },
      envelope: { attack: 0.5, decay: 0.3, sustain: 0.85, release: 1.5 },
      filter: { type: "bandpass", cutoff: 1200, resonance: 1.5 },
      effect: { type: "reverb", wet: 0.5 },
      meta: { bpm: 70, tags: ["choir", "vocal", "ethereal"] }
    },
    {
      id: "analog-lead",
      name: "Analog Lead",
      category: "lead",
      oscillator: { type: "square", detune: -5, volume: -7 },
      envelope: { attack: 0.02, decay: 0.15, sustain: 0.7, release: 0.3 },
      filter: { type: "lowpass", cutoff: 1200, resonance: 3.0 },
      effect: { type: "delay", wet: 0.25 },
      meta: { bpm: 110, tags: ["analog", "classic", "resonant"] }
    },
    {
      id: "sub-bass",
      name: "Sub Bass",
      category: "bass",
      oscillator: { type: "sine", detune: 0, volume: -2 },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.8, release: 0.3 },
      filter: { type: "lowpass", cutoff: 100, resonance: 0.2 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 85, tags: ["sub", "bass", "low"] }
    },
    {
      id: "arp-synth",
      name: "Arp Synth",
      category: "lead",
      oscillator: { type: "sawtooth", detune: 0, volume: -9 },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0.5, release: 0.4 },
      filter: { type: "lowpass", cutoff: 1800, resonance: 1.0 },
      effect: { type: "delay", wet: 0.3 },
      meta: { bpm: 128, tags: ["arp", "melodic", "rhythmic"] }
    },
    {
      id: "ambient-pad",
      name: "Ambient Pad",
      category: "pad",
      oscillator: { type: "triangle", detune: 12, volume: -14 },
      envelope: { attack: 2.0, decay: 1.0, sustain: 0.95, release: 3.0 },
      filter: { type: "lowpass", cutoff: 600, resonance: 0.4 },
      effect: { type: "reverb", wet: 0.6 },
      meta: { bpm: 60, tags: ["ambient", "atmospheric", "slow"] }
    },
    {
      id: "brass-stab",
      name: "Brass Stab",
      category: "lead",
      oscillator: { type: "sawtooth", detune: -8, volume: -5 },
      envelope: { attack: 0.005, decay: 0.4, sustain: 0.6, release: 0.3 },
      filter: { type: "lowpass", cutoff: 2200, resonance: 2.5 },
      effect: { type: "reverb", wet: 0.1 },
      meta: { bpm: 105, tags: ["brass", "stab", "punchy"] }
    }
  ],
  arrangements: [
    {
      id: "demo-loop-1",
      name: "Demo Loop",
      bpm: 100,
      tracks: [
        {
          instrumentId: "lead-saw-bright",
          pattern: [
            { time: "0:0:0", note: "C4", duration: "4n" },
            { time: "0:1:0", note: "E4", duration: "4n" },
            { time: "0:2:0", note: "G4", duration: "4n" },
            { time: "0:3:0", note: "C5", duration: "4n" }
          ]
        },
        {
          instrumentId: "deep-bass",
          pattern: [
            { time: "0:0:0", note: "C2", duration: "2n" },
            { time: "0:2:0", note: "G2", duration: "2n" }
          ]
        }
      ]
    }
  ],
  livePatterns: [
    {
      id: "live-pattern-1",
      name: "C Major Melody",
      code: `// Simple C Major scale melody\nbpm:120\ninstr:lead-saw-bright\npattern: [C4-8n, D4-8n, E4-8n, F4-8n, G4-8n, A4-8n, B4-8n, C5-8n]\nrep(pattern, 2)`,
      category: "beginner",
      createdAt: "2025-11-11T00:00:00Z"
    },
    {
      id: "live-pattern-2",
      name: "Ambient Pad Loop",
      code: `// Warm ambient chord progression\nbpm:80\ninstr:warm-pad\nchord1: [C4-2n, E4-2n, G4-2n]\nchord2: [F4-2n, A4-2n, C5-2n]\nrep(chord1, 2)\nrep(chord2, 2)`,
      category: "ambient",
      createdAt: "2025-11-11T00:00:00Z"
    },
    {
      id: "live-pattern-3",
      name: "Drum Pattern",
      code: `// Simple 4-on-floor drum pattern\nbpm:120\ninstr:kick-808\nkickpattern: [C2-8n, -, C2-8n, -, C2-8n, -, C2-8n, -]\nrep(kickpattern, 4)`,
      category: "drums",
      createdAt: "2025-11-11T00:00:00Z"
    },
    {
      id: "live-pattern-4",
      name: "Bassline Groove",
      code: `// Funky bassline\nbpm:100\ninstr:deep-bass\nbass: [C2-8n, -, E2-8n, -, G2-8n, -, F2-8n, -]\nrep(bass, 4)`,
      category: "bass",
      createdAt: "2025-11-11T00:00:00Z"
    }
  ]
};

// Create Tone.js synth from instrument configuration
function createSynth(instrument) {
  const oscType = instrument.oscillator.type === 'white' ? 'noise' : instrument.oscillator.type;
  
  const synth = new Tone.Synth({
    oscillator: {
      type: oscType,
      detune: instrument.oscillator.detune
    },
    envelope: {
      attack: instrument.envelope.attack,
      decay: instrument.envelope.decay,
      sustain: instrument.envelope.sustain,
      release: instrument.envelope.release
    },
    volume: instrument.oscillator.volume
  }).toDestination();

  // Apply filter
  const filter = new Tone.Filter({
    type: instrument.filter.type,
    frequency: instrument.filter.cutoff,
    Q: instrument.filter.resonance
  });
  
  // Apply effect
  let effect = null;
  if (instrument.effect.type === 'reverb') {
    effect = new Tone.Reverb({ wet: instrument.effect.wet });
  } else if (instrument.effect.type === 'delay') {
    effect = new Tone.FeedbackDelay({ wet: instrument.effect.wet, delayTime: "8n", feedback: 0.3 });
  }

  // Chain: synth -> filter -> effect -> destination
  synth.disconnect();
  synth.connect(filter);
  
  if (effect) {
    filter.connect(effect);
    effect.toDestination();
  } else {
    filter.toDestination();
  }

  return { synth, filter, effect };
}

// Theme Toggle Component
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

// Instrument Card Component
function InstrumentCard({ instrument, onPreview, onEdit, onAddToSequencer }) {
  return (
    <div className="instrument-card">
      <h3>{instrument.name}</h3>
      <span className={`category-badge category-${instrument.category}`}>
        {instrument.category}
      </span>
      <div className="card-actions">
        <button className="btn btn-primary btn-small" onClick={() => onPreview(instrument)}>
          ▶ Preview
        </button>
        <button className="btn btn-secondary btn-small" onClick={() => onEdit(instrument)}>
          ✏️ Edit
        </button>
        <button className="btn btn-secondary btn-small" onClick={() => onAddToSequencer(instrument)}>
          + Add
        </button>
      </div>
    </div>
  );
}

// Instrument Browser Component
function InstrumentBrowser({ instruments, onPreview, onEdit, onAddToSequencer }) {
  const [filter, setFilter] = useState('all');

  const filteredInstruments = filter === 'all' 
    ? instruments 
    : instruments.filter(i => i.category === filter);

  const categories = ['all', ...new Set(instruments.map(i => i.category))];

  return (
    <div className="left-panel">
      <h2>Instruments</h2>
      <div className="filter-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="instruments-grid">
        {filteredInstruments.map(instrument => (
          <InstrumentCard
            key={instrument.id}
            instrument={instrument}
            onPreview={onPreview}
            onEdit={onEdit}
            onAddToSequencer={onAddToSequencer}
          />
        ))}
      </div>
    </div>
  );
}

// Instrument Editor Component
function InstrumentEditor({ instrument, onSave, onClose }) {
  const [editedInstrument, setEditedInstrument] = useState(instrument ? JSON.parse(JSON.stringify(instrument)) : {
    id: `custom-${Date.now()}`,
    name: "New Instrument",
    category: "lead",
    oscillator: { type: "sine", detune: 0, volume: -6 },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.8, release: 0.5 },
    filter: { type: "lowpass", cutoff: 1500, resonance: 1.0 },
    effect: { type: "none", wet: 0 },
    meta: { bpm: 120, tags: [] }
  });

  const handleChange = (path, value) => {
    setEditedInstrument(prev => {
      const newInst = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = newInst;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = parseFloat(value) || value;
      return newInst;
    });
  };

  const handlePreview = async () => {
    await Tone.start();
    const { synth } = createSynth(editedInstrument);
    synth.triggerAttackRelease("C4", "1n");
    setTimeout(() => {
      synth.dispose();
    }, 2000);
  };

  const handleSave = () => {
    if (!editedInstrument.name.trim()) {
      alert('Please enter an instrument name');
      return;
    }
    onSave(editedInstrument);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Instrument Editor</h2>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={editedInstrument.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={editedInstrument.category} onChange={(e) => handleChange('category', e.target.value)}>
            <option value="lead">Lead</option>
            <option value="bass">Bass</option>
            <option value="pad">Pad</option>
            <option value="percussive">Percussive</option>
            <option value="choir">Choir</option>
          </select>
        </div>

        <div className="section-title">Oscillator</div>
        <div className="form-group">
          <label>Type</label>
          <select value={editedInstrument.oscillator.type} onChange={(e) => handleChange('oscillator.type', e.target.value)}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
            <option value="white">White Noise</option>
          </select>
        </div>

        <div className="form-group">
          <label>Detune <span className="slider-value">{editedInstrument.oscillator.detune} cents</span></label>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={editedInstrument.oscillator.detune}
            onChange={(e) => handleChange('oscillator.detune', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Volume <span className="slider-value">{editedInstrument.oscillator.volume} dB</span></label>
          <input
            type="range"
            min="-40"
            max="0"
            step="1"
            value={editedInstrument.oscillator.volume}
            onChange={(e) => handleChange('oscillator.volume', e.target.value)}
          />
        </div>

        <div className="section-title">Envelope (ADSR)</div>
        <div className="form-group">
          <label>Attack <span className="slider-value">{editedInstrument.envelope.attack}s</span></label>
          <input
            type="range"
            min="0.001"
            max="2"
            step="0.001"
            value={editedInstrument.envelope.attack}
            onChange={(e) => handleChange('envelope.attack', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Decay <span className="slider-value">{editedInstrument.envelope.decay}s</span></label>
          <input
            type="range"
            min="0.001"
            max="2"
            step="0.001"
            value={editedInstrument.envelope.decay}
            onChange={(e) => handleChange('envelope.decay', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Sustain <span className="slider-value">{editedInstrument.envelope.sustain}</span></label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={editedInstrument.envelope.sustain}
            onChange={(e) => handleChange('envelope.sustain', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Release <span className="slider-value">{editedInstrument.envelope.release}s</span></label>
          <input
            type="range"
            min="0.001"
            max="5"
            step="0.001"
            value={editedInstrument.envelope.release}
            onChange={(e) => handleChange('envelope.release', e.target.value)}
          />
        </div>

        <div className="section-title">Filter</div>
        <div className="form-group">
          <label>Type</label>
          <select value={editedInstrument.filter.type} onChange={(e) => handleChange('filter.type', e.target.value)}>
            <option value="lowpass">Lowpass</option>
            <option value="highpass">Highpass</option>
            <option value="bandpass">Bandpass</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cutoff <span className="slider-value">{Math.round(editedInstrument.filter.cutoff)} Hz</span></label>
          <input
            type="range"
            min="20"
            max="20000"
            step="10"
            value={editedInstrument.filter.cutoff}
            onChange={(e) => handleChange('filter.cutoff', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Resonance <span className="slider-value">{editedInstrument.filter.resonance}</span></label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={editedInstrument.filter.resonance}
            onChange={(e) => handleChange('filter.resonance', e.target.value)}
          />
        </div>

        <div className="section-title">Effect</div>
        <div className="form-group">
          <label>Type</label>
          <select value={editedInstrument.effect.type} onChange={(e) => handleChange('effect.type', e.target.value)}>
            <option value="none">None</option>
            <option value="reverb">Reverb</option>
            <option value="delay">Delay</option>
          </select>
        </div>

        <div className="form-group">
          <label>Wet/Dry <span className="slider-value">{editedInstrument.effect.wet}</span></label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={editedInstrument.effect.wet}
            onChange={(e) => handleChange('effect.wet', e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handlePreview}>
            ▶ Preview
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Sequencer Component
function Sequencer({ tracks, instruments, onAddTrack, onRemoveTrack, onToggleNote }) {
  return (
    <div className="sequencer">
      <h2>Sequencer</h2>
      <div className="tracks-container">
        {tracks.length === 0 ? (
          <p style={{color: 'var(--color-text-secondary)'}}>No tracks yet. Add an instrument to get started!</p>
        ) : (
          tracks.map((track, trackIndex) => {
            const instrument = instruments.find(i => i.id === track.instrumentId);
            return (
              <div key={trackIndex} className="track">
                <div className="track-header">
                  <h4>{instrument?.name || 'Unknown Instrument'}</h4>
                  <button className="btn btn-secondary btn-small" onClick={() => onRemoveTrack(trackIndex)}>
                    🗑️ Remove
                  </button>
                </div>
                <div className="pattern-grid">
                  {Array.from({ length: 16 }, (_, i) => {
                    const hasNote = track.pattern.some(n => {
                      const [bar, beat] = n.time.split(':').map(Number);
                      return bar * 4 + beat === i;
                    });
                    return (
                      <div
                        key={i}
                        className={`pattern-cell ${hasNote ? 'active' : ''}`}
                        onClick={() => onToggleNote(trackIndex, i)}
                        title={`Step ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Player Controls Component
function PlayerControls({ isPlaying, bpm, onPlayStop, onBpmChange, onExportData, onExportArrangement, onImport }) {
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          onImport(data);
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="player-controls">
      <div className="playback-controls">
        <button className="btn btn-primary" onClick={onPlayStop}>
          {isPlaying ? '⏸ Stop' : '▶ Play'}
        </button>
      </div>
      
      <div className="bpm-control">
        <label>BPM:</label>
        <input
          type="number"
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => onBpmChange(parseInt(e.target.value) || 120)}
        />
      </div>

      <div className="export-controls">
        <button className="btn btn-secondary" onClick={onExportArrangement}>
          💾 Export Arrangement
        </button>
        <button className="btn btn-secondary" onClick={onExportData}>
          📥 Export Data
        </button>
        <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
          📂 Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
      </div>
    </div>
  );
}

// Status Message Component
function StatusMessage({ message, show }) {
  if (!show) return null;
  return <div className="status-message">{message}</div>;
}

// Pattern Parser Function
function parsePattern(code, instruments) {
  const errors = [];
  let bpm = 120;
  let instrumentId = 'lead-saw-bright';
  const notes = [];

  try {
    // Extract BPM
    const bpmMatch = code.match(/bpm:(\d+)/);
    if (bpmMatch) {
      bpm = parseInt(bpmMatch[1]);
      if (bpm < 40 || bpm > 240) {
        errors.push('BPM must be between 40 and 240');
        bpm = 120;
      }
    }

    // Extract instrument
    const instrMatch = code.match(/instr:([a-z0-9\-]+)/);
    if (instrMatch) {
      instrumentId = instrMatch[1];
      const instrExists = instruments.find(i => i.id === instrumentId);
      if (!instrExists) {
        errors.push(`Instrument "${instrumentId}" not found`);
        instrumentId = 'lead-saw-bright';
      }
    }

    // Extract pattern definitions
    const patternMatches = code.matchAll(/([a-z0-9]+):\s*\[([^\]]+)\]/g);
    const patterns = {};
    
    for (const match of patternMatches) {
      const patternName = match[1];
      const patternContent = match[2];
      const patternNotes = patternContent.split(',').map(n => n.trim()).filter(n => n);
      patterns[patternName] = patternNotes;
    }

    // Extract rep() calls and build note sequence
    const repMatches = code.matchAll(/rep\(([a-z0-9]+),\s*(\d+)\)/g);
    let currentTime = 0;
    
    for (const match of repMatches) {
      const patternName = match[1];
      const repetitions = parseInt(match[2]);
      
      if (!patterns[patternName]) {
        errors.push(`Pattern "${patternName}" not defined`);
        continue;
      }

      for (let r = 0; r < repetitions; r++) {
        for (const noteStr of patterns[patternName]) {
          if (noteStr === '-' || noteStr.toLowerCase() === 'rest') {
            // Rest - advance time but don't add note
            currentTime += 0.5; // Default 8th note duration
          } else {
            // Parse note format: NOTE-DURATION (e.g., C4-8n)
            const noteParts = noteStr.split('-');
            if (noteParts.length >= 2) {
              const noteName = noteParts[0];
              const duration = noteParts[1];
              
              // Validate note name
              if (!/^[A-G][#b]?[0-9]$/.test(noteName)) {
                errors.push(`Invalid note name: ${noteName}`);
                continue;
              }
              
              // Validate duration
              if (!/^(1|2|4|8|16)n$|^w$/.test(duration)) {
                errors.push(`Invalid duration: ${duration}`);
                continue;
              }
              
              notes.push({
                note: noteName,
                duration: duration,
                time: currentTime
              });
              
              // Calculate time advancement
              const durationMap = { 'w': 4, '2n': 2, '4n': 1, '8n': 0.5, '16n': 0.25 };
              currentTime += durationMap[duration] || 0.5;
            }
          }
        }
      }
    }

    // If no notes were parsed, add an error
    if (notes.length === 0 && Object.keys(patterns).length > 0) {
      errors.push('No valid notes found. Use rep(patternName, count) to play patterns.');
    }

  } catch (error) {
    errors.push(`Parse error: ${error.message}`);
  }

  return { bpm, instrumentId, notes, errors };
}

// Live Coding Editor Component
function LiveCodingEditor({ code, onChange, onPlay, onStop, isPlaying }) {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onPlay();
    }
  };

  return (
    <div className="live-coding-editor-pane">
      <div className="pane-header">📝 Pattern Editor</div>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="// Type your pattern here...\nbpm:120\ninstr:lead-saw-bright\npattern: [C4-8n, D4-8n, E4-8n, F4-8n]\nrep(pattern, 4)"
        spellCheck={false}
      />
    </div>
  );
}

// Live Output Component
function LiveOutput({ parsedPattern, playingNote, errors }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    const draw = () => {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background');
      ctx.fillRect(0, 0, width, height);

      if (playingNote) {
        // Draw animated waveform when playing
        const time = Date.now() / 1000;
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.05 + time * 5) * 40 * Math.sin(x * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw frequency bars
        const barCount = 20;
        const barWidth = width / barCount;
        for (let i = 0; i < barCount; i++) {
          const barHeight = Math.abs(Math.sin(time * 3 + i * 0.5)) * (height / 2);
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
          ctx.globalAlpha = 0.6;
          ctx.fillRect(i * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
        }
        ctx.globalAlpha = 1;
      } else {
        // Draw static waveform when idle
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playingNote]);

  return (
    <div className="live-coding-output-pane">
      <div className="pane-header">📊 Live Output</div>
      <div className="output-content">
        {playingNote && (
          <div className="playing-note-indicator">
            ♪ Playing: {playingNote}
          </div>
        )}

        <canvas ref={canvasRef} className="visualization-canvas" />

        {errors.length > 0 && (
          <div className="error-panel">
            <strong>⚠️ Errors:</strong>
            {errors.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        {parsedPattern && errors.length === 0 && (
          <div className="pattern-info">
            <h4>Pattern Information</h4>
            <p><strong>BPM:</strong> {parsedPattern.bpm}</p>
            <p><strong>Instrument:</strong> {parsedPattern.instrumentId}</p>
            <p><strong>Total Notes:</strong> {parsedPattern.notes.length}</p>
            <p><strong>Duration:</strong> {parsedPattern.notes.length > 0 
              ? `~${Math.ceil(parsedPattern.notes[parsedPattern.notes.length - 1]?.time || 0)} beats`
              : 'N/A'
            }</p>
          </div>
        )}

        {parsedPattern && parsedPattern.notes.length > 0 && errors.length === 0 && (
          <div className="pattern-info">
            <h4>Note Sequence</h4>
            <div style={{maxHeight: '150px', overflowY: 'auto', fontSize: '12px'}}>
              {parsedPattern.notes.slice(0, 20).map((note, i) => (
                <div key={i}>
                  {i + 1}. {note.note} ({note.duration}) at beat {note.time.toFixed(2)}
                </div>
              ))}
              {parsedPattern.notes.length > 20 && (
                <div style={{color: 'var(--color-text-secondary)', marginTop: '8px'}}>
                  ... and {parsedPattern.notes.length - 20} more notes
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Syntax Help Modal
function SyntaxHelpModal({ onClose }) {
  return (
    <div className="modal-overlay syntax-help-modal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Pattern Syntax Reference</h2>
        
        <h3 style={{marginTop: '16px', fontSize: '16px'}}>Basic Syntax</h3>
        <div className="syntax-example">
{`// Set tempo (40-240 BPM)
bpm:120

// Select instrument (use instrument ID)
instr:lead-saw-bright

// Define a pattern
pattern: [C4-8n, D4-8n, E4-8n, F4-8n]

// Repeat pattern 4 times
rep(pattern, 4)`}
        </div>

        <h3 style={{marginTop: '16px', fontSize: '16px'}}>Note Format</h3>
        <p style={{fontSize: '14px', color: 'var(--color-text-secondary)'}}>Format: NOTE-DURATION</p>
        <div className="syntax-example">
{`C4-8n   // C4 eighth note
D4-4n   // D4 quarter note
E4-2n   // E4 half note
F4-w    // F4 whole note
G#4-8n  // G sharp 4 eighth note
-       // Rest (silence)`}
        </div>

        <h3 style={{marginTop: '16px', fontSize: '16px'}}>Complete Example</h3>
        <div className="syntax-example">
{`// C Major melody
bpm:120
instr:lead-saw-bright
melody: [C4-4n, E4-4n, G4-4n, C5-4n]
rep(melody, 2)

// Add bass
instr:deep-bass
bass: [C2-2n, G2-2n]
rep(bass, 4)`}
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
}

// Pattern Library Modal
function PatternLibraryModal({ patterns, onLoad, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Pattern Library</h2>
        <div className="pattern-library">
          {patterns.map(pattern => (
            <div key={pattern.id} className="pattern-item" onClick={() => onLoad(pattern.code)}>
              <h5>{pattern.name}</h5>
              <span className={`category-badge category-${pattern.category}`}>
                {pattern.category}
              </span>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [instruments, setInstruments] = useState(initialData.instruments);
  const [arrangements, setArrangements] = useState(initialData.arrangements);
  const [currentArrangement, setCurrentArrangement] = useState(initialData.arrangements[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  
  // Live Coding State
  const [activeTab, setActiveTab] = useState('composition');
  const [liveCode, setLiveCode] = useState(`// Simple C Major melody\nbpm:120\ninstr:lead-saw-bright\npattern: [C4-8n, D4-8n, E4-8n, F4-8n, G4-8n, A4-8n, B4-8n, C5-8n]\nrep(pattern, 2)`);
  const [savedPatterns, setSavedPatterns] = useState(initialData.livePatterns || []);
  const [parsedPattern, setParsedPattern] = useState(null);
  const [patternErrors, setPatternErrors] = useState([]);
  const [playingNote, setPlayingNote] = useState(null);
  const [isLivePlaying, setIsLivePlaying] = useState(false);
  const [showSyntaxHelp, setShowSyntaxHelp] = useState(false);
  const [showPatternLibrary, setShowPatternLibrary] = useState(false);
  const [liveBpm, setLiveBpm] = useState(120);
  
  const synthsRef = useRef([]);
  const partsRef = useRef([]);
  const liveSynthRef = useRef(null);
  const livePartRef = useRef(null);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // Space bar to toggle play/stop
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        handlePlayStop();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentArrangement]);

  const showStatusMessage = (msg) => {
    setStatusMessage(msg);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handlePreview = async (instrument) => {
    await Tone.start();
    const { synth, filter, effect } = createSynth(instrument);
    synth.triggerAttackRelease("C4", "1n");
    setTimeout(() => {
      synth.dispose();
      filter.dispose();
      if (effect) effect.dispose();
    }, 2000);
  };

  const handleEdit = (instrument) => {
    setEditingInstrument(instrument);
    setEditorOpen(true);
  };

  const handleSaveInstrument = (instrument) => {
    const existingIndex = instruments.findIndex(i => i.id === instrument.id);
    if (existingIndex >= 0) {
      const newInstruments = [...instruments];
      newInstruments[existingIndex] = instrument;
      setInstruments(newInstruments);
      showStatusMessage('Instrument updated!');
    } else {
      setInstruments([...instruments, instrument]);
      showStatusMessage('New instrument created!');
    }
    setEditorOpen(false);
    setEditingInstrument(null);
  };

  const handleAddToSequencer = (instrument) => {
    const newTrack = {
      instrumentId: instrument.id,
      pattern: []
    };
    const updatedArrangement = {
      ...currentArrangement,
      tracks: [...currentArrangement.tracks, newTrack]
    };
    setCurrentArrangement(updatedArrangement);
    showStatusMessage(`Added ${instrument.name} to sequencer`);
  };

  const handleRemoveTrack = (trackIndex) => {
    const updatedArrangement = {
      ...currentArrangement,
      tracks: currentArrangement.tracks.filter((_, i) => i !== trackIndex)
    };
    setCurrentArrangement(updatedArrangement);
  };

  const handleToggleNote = (trackIndex, stepIndex) => {
    const track = currentArrangement.tracks[trackIndex];
    const bar = Math.floor(stepIndex / 4);
    const beat = stepIndex % 4;
    const timeString = `${bar}:${beat}:0`;
    
    const existingNoteIndex = track.pattern.findIndex(n => n.time === timeString);
    
    let newPattern;
    if (existingNoteIndex >= 0) {
      newPattern = track.pattern.filter((_, i) => i !== existingNoteIndex);
    } else {
      newPattern = [...track.pattern, { time: timeString, note: "C4", duration: "4n" }];
    }
    
    const updatedTracks = [...currentArrangement.tracks];
    updatedTracks[trackIndex] = { ...track, pattern: newPattern };
    
    setCurrentArrangement({
      ...currentArrangement,
      tracks: updatedTracks
    });
  };

  const handlePlayStop = async () => {
    if (!isPlaying) {
      await Tone.start();
      
      // Clear existing parts and synths
      partsRef.current.forEach(part => part.dispose());
      synthsRef.current.forEach(({ synth, filter, effect }) => {
        synth.dispose();
        filter.dispose();
        if (effect) effect.dispose();
      });
      partsRef.current = [];
      synthsRef.current = [];

      // Create synths and parts for each track
      currentArrangement.tracks.forEach(track => {
        const instrument = instruments.find(i => i.id === track.instrumentId);
        if (!instrument) return;

        const synthBundle = createSynth(instrument);
        synthsRef.current.push(synthBundle);

        const part = new Tone.Part((time, note) => {
          synthBundle.synth.triggerAttackRelease(note.note, note.duration, time);
        }, track.pattern.map(n => ({ time: n.time, note: n.note, duration: n.duration })));

        part.loop = true;
        part.loopEnd = "4m";
        part.start(0);
        partsRef.current.push(part);
      });

      Tone.Transport.start();
      setIsPlaying(true);
      showStatusMessage('Playback started');
    } else {
      Tone.Transport.stop();
      partsRef.current.forEach(part => part.dispose());
      synthsRef.current.forEach(({ synth, filter, effect }) => {
        synth.dispose();
        filter.dispose();
        if (effect) effect.dispose();
      });
      partsRef.current = [];
      synthsRef.current = [];
      setIsPlaying(false);
      showStatusMessage('Playback stopped');
    }
  };

  const handleExportData = () => {
    const data = {
      metadata: initialData.metadata,
      instruments,
      arrangements: [currentArrangement]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-export.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatusMessage('Data exported successfully!');
  };

  const handleExportArrangement = () => {
    const blob = new Blob([JSON.stringify(currentArrangement, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentArrangement.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatusMessage('Arrangement exported!');
  };

  const handleImport = (data) => {
    if (data.instruments) {
      setInstruments(data.instruments);
    }
    if (data.arrangements && data.arrangements.length > 0) {
      setCurrentArrangement(data.arrangements[0]);
      setArrangements(data.arrangements);
    }
    if (data.livePatterns) {
      setSavedPatterns(data.livePatterns);
    }
    showStatusMessage('Data imported successfully!');
  };

  // Live Coding Handlers
  const handleLiveCodeChange = (code) => {
    setLiveCode(code);
    // Parse on change to show errors immediately
    const parsed = parsePattern(code, instruments);
    setParsedPattern(parsed);
    setPatternErrors(parsed.errors);
  };

  const handleLivePlay = async () => {
    await Tone.start();
    
    // Parse the pattern
    const parsed = parsePattern(liveCode, instruments);
    setParsedPattern(parsed);
    setPatternErrors(parsed.errors);

    if (parsed.errors.length > 0) {
      showStatusMessage('Fix errors before playing');
      return;
    }

    if (parsed.notes.length === 0) {
      showStatusMessage('No notes to play');
      return;
    }

    // Stop existing playback
    if (livePartRef.current) {
      livePartRef.current.dispose();
      livePartRef.current = null;
    }
    if (liveSynthRef.current) {
      liveSynthRef.current.synth.dispose();
      liveSynthRef.current.filter.dispose();
      if (liveSynthRef.current.effect) liveSynthRef.current.effect.dispose();
      liveSynthRef.current = null;
    }

    // Set BPM
    Tone.Transport.bpm.value = parsed.bpm;
    setLiveBpm(parsed.bpm);

    // Create synth for the instrument
    const instrument = instruments.find(i => i.id === parsed.instrumentId);
    if (!instrument) {
      showStatusMessage('Instrument not found');
      return;
    }

    const synthBundle = createSynth(instrument);
    liveSynthRef.current = synthBundle;

    // Create part from parsed notes
    const part = new Tone.Part((time, note) => {
      synthBundle.synth.triggerAttackRelease(note.note, note.duration, time);
      // Update playing note indicator
      Tone.Draw.schedule(() => {
        setPlayingNote(`${note.note} (${note.duration})`);
        setTimeout(() => setPlayingNote(null), 100);
      }, time);
    }, parsed.notes.map(n => ({ time: n.time, note: n.note, duration: n.duration })));

    part.loop = true;
    const totalDuration = parsed.notes[parsed.notes.length - 1]?.time + 2 || 4;
    part.loopEnd = totalDuration;
    part.start(0);
    livePartRef.current = part;

    Tone.Transport.start();
    setIsLivePlaying(true);
    showStatusMessage('Pattern playing!');
  };

  const handleLiveStop = () => {
    Tone.Transport.stop();
    
    if (livePartRef.current) {
      livePartRef.current.dispose();
      livePartRef.current = null;
    }
    if (liveSynthRef.current) {
      liveSynthRef.current.synth.dispose();
      liveSynthRef.current.filter.dispose();
      if (liveSynthRef.current.effect) liveSynthRef.current.effect.dispose();
      liveSynthRef.current = null;
    }
    
    setIsLivePlaying(false);
    setPlayingNote(null);
    showStatusMessage('Stopped');
  };

  const handleClearCode = () => {
    setLiveCode('');
    setParsedPattern(null);
    setPatternErrors([]);
  };

  const handleSavePattern = () => {
    const name = prompt('Enter pattern name:');
    if (!name) return;

    const newPattern = {
      id: `pattern-${Date.now()}`,
      name: name,
      code: liveCode,
      category: 'custom',
      createdAt: new Date().toISOString()
    };

    setSavedPatterns([...savedPatterns, newPattern]);
    showStatusMessage('Pattern saved!');
  };

  const handleLoadPattern = (code) => {
    setLiveCode(code);
    setShowPatternLibrary(false);
    const parsed = parsePattern(code, instruments);
    setParsedPattern(parsed);
    setPatternErrors(parsed.errors);
    showStatusMessage('Pattern loaded!');
  };

  const handleExportPattern = () => {
    const blob = new Blob([liveCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pattern.txt';
    a.click();
    URL.revokeObjectURL(url);
    showStatusMessage('Pattern exported!');
  };

  const handleLiveBpmChange = (newBpm) => {
    setLiveBpm(newBpm);
    Tone.Transport.bpm.value = newBpm;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎹 ToneForge+</h1>
        <ThemeToggle />
      </header>
      
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'composition' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('composition');
            if (isLivePlaying) handleLiveStop();
          }}
        >
          🎼 Composition
        </button>
        <button 
          className={`tab-button ${activeTab === 'liveCoding' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('liveCoding');
            if (isPlaying) handlePlayStop();
          }}
        >
          💻 Live Coding
        </button>
      </div>
      
      <main className="main">
        {activeTab === 'composition' && (
          <>
            <InstrumentBrowser
              instruments={instruments}
              onPreview={handlePreview}
              onEdit={handleEdit}
              onAddToSequencer={handleAddToSequencer}
            />
            
            <div className="right-panel">
              <Sequencer
                tracks={currentArrangement.tracks}
                instruments={instruments}
                onAddTrack={() => {}}
                onRemoveTrack={handleRemoveTrack}
                onToggleNote={handleToggleNote}
              />
            </div>
          </>
        )}

        {activeTab === 'liveCoding' && (
          <div className="live-coding-container">
            <div className="live-coding-panes">
              <LiveCodingEditor
                code={liveCode}
                onChange={handleLiveCodeChange}
                onPlay={handleLivePlay}
                onStop={handleLiveStop}
                isPlaying={isLivePlaying}
              />
              <LiveOutput
                parsedPattern={parsedPattern}
                playingNote={playingNote}
                errors={patternErrors}
              />
            </div>
            <div className="live-coding-controls">
              <button 
                className="btn btn-primary" 
                onClick={isLivePlaying ? handleLiveStop : handleLivePlay}
              >
                {isLivePlaying ? '⏸ Stop' : '▶ Play'}
              </button>
              <button className="btn btn-secondary" onClick={handleClearCode}>
                🗑️ Clear
              </button>
              <button className="btn btn-secondary" onClick={handleSavePattern}>
                💾 Save Pattern
              </button>
              <button className="btn btn-secondary" onClick={() => setShowPatternLibrary(true)}>
                📚 Load Pattern
              </button>
              <button className="btn btn-secondary" onClick={() => setShowSyntaxHelp(true)}>
                ❓ Syntax Help
              </button>
              <button className="btn btn-secondary" onClick={handleExportPattern}>
                📥 Export Pattern
              </button>
              <div className="bpm-slider-control">
                <label>BPM:</label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={liveBpm}
                  onChange={(e) => handleLiveBpmChange(parseInt(e.target.value))}
                />
                <span>{liveBpm}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <PlayerControls
        isPlaying={isPlaying}
        bpm={bpm}
        onPlayStop={handlePlayStop}
        onBpmChange={setBpm}
        onExportData={handleExportData}
        onExportArrangement={handleExportArrangement}
        onImport={handleImport}
      />

      {editorOpen && (
        <InstrumentEditor
          instrument={editingInstrument}
          onSave={handleSaveInstrument}
          onClose={() => {
            setEditorOpen(false);
            setEditingInstrument(null);
          }}
        />
      )}

      <StatusMessage message={statusMessage} show={showStatus} />

      {showSyntaxHelp && (
        <SyntaxHelpModal onClose={() => setShowSyntaxHelp(false)} />
      )}

      {showPatternLibrary && (
        <PatternLibraryModal
          patterns={savedPatterns}
          onLoad={handleLoadPattern}
          onClose={() => setShowPatternLibrary(false)}
        />
      )}
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);