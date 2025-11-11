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
    },
    {
      id: "violin",
      name: "Violin",
      category: "strings",
      oscillator: { type: "sawtooth", detune: 2, volume: -8 },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.85, release: 0.8 },
      filter: { type: "lowpass", cutoff: 3500, resonance: 1.8 },
      effect: { type: "reverb", wet: 0.35 },
      meta: { bpm: 90, tags: ["violin", "strings", "classical"] }
    },
    {
      id: "flute",
      name: "Flute",
      category: "woodwind",
      oscillator: { type: "sine", detune: 0, volume: -10 },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0.7, release: 0.5 },
      filter: { type: "lowpass", cutoff: 4000, resonance: 0.8 },
      effect: { type: "reverb", wet: 0.25 },
      meta: { bpm: 100, tags: ["flute", "woodwind", "airy"] }
    },
    {
      id: "saxophone",
      name: "Saxophone",
      category: "brass",
      oscillator: { type: "square", detune: -3, volume: -7 },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.8, release: 0.4 },
      filter: { type: "lowpass", cutoff: 2800, resonance: 2.2 },
      effect: { type: "reverb", wet: 0.2 },
      meta: { bpm: 110, tags: ["sax", "brass", "jazz"] }
    },
    {
      id: "snare-drum",
      name: "Snare Drum",
      category: "drums",
      oscillator: { type: "white", detune: 0, volume: -10 },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.001 },
      filter: { type: "highpass", cutoff: 2000, resonance: 1.5 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 120, tags: ["snare", "drum", "percussion"] }
    },
    {
      id: "tom-drum",
      name: "Tom Drum",
      category: "drums",
      oscillator: { type: "sine", detune: 0, volume: -5 },
      envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.001 },
      filter: { type: "lowpass", cutoff: 400, resonance: 0.8 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 120, tags: ["tom", "drum", "percussion"] }
    },
    {
      id: "bright-synth",
      name: "Bright Synth",
      category: "lead",
      oscillator: { type: "square", detune: 5, volume: -6 },
      envelope: { attack: 0.001, decay: 0.15, sustain: 0.6, release: 0.2 },
      filter: { type: "lowpass", cutoff: 3000, resonance: 2.5 },
      effect: { type: "delay", wet: 0.15 },
      meta: { bpm: 128, tags: ["synth", "bright", "lead"] }
    },
    {
      id: "soft-organ",
      name: "Soft Organ",
      category: "organ",
      oscillator: { type: "sine", detune: 0, volume: -9 },
      envelope: { attack: 0.2, decay: 0.3, sustain: 0.9, release: 0.5 },
      filter: { type: "lowpass", cutoff: 2000, resonance: 0.5 },
      effect: { type: "reverb", wet: 0.3 },
      meta: { bpm: 80, tags: ["organ", "soft", "church"] }
    },
    {
      id: "electric-piano",
      name: "Electric Piano",
      category: "piano",
      oscillator: { type: "triangle", detune: 0, volume: -7 },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.5, release: 0.4 },
      filter: { type: "lowpass", cutoff: 2500, resonance: 1.0 },
      effect: { type: "reverb", wet: 0.2 },
      meta: { bpm: 100, tags: ["piano", "electric", "keys"] }
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
function InstrumentBrowser({ instruments, onPreview, onEdit, onAddToSequencer, onCreateCustom }) {
  const [filter, setFilter] = useState('all');

  const filteredInstruments = filter === 'all' 
    ? instruments 
    : instruments.filter(i => i.category === filter);

  const categories = ['all', ...new Set(instruments.map(i => i.category))];

  return (
    <div className="left-panel">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
        <h2 style={{margin: 0}}>Instruments</h2>
        <button className="btn btn-primary btn-small" onClick={onCreateCustom} title="Create custom instrument">
          🎨 Custom
        </button>
      </div>
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
            <option value="strings">Strings</option>
            <option value="woodwind">Woodwind</option>
            <option value="brass">Brass</option>
            <option value="drums">Drums</option>
            <option value="organ">Organ</option>
            <option value="piano">Piano</option>
            <option value="custom">Custom</option>
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

// Score Editor Component - Music notation sheet
function ScoreEditor({ score, onScoreChange, instruments, onPlay }) {
  const [selectedNote, setSelectedNote] = useState('C4');
  const [selectedDuration, setSelectedDuration] = useState('4n');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [tempo, setTempo] = useState(120);
  const [keySignature, setKeySignature] = useState('C');
  const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]?.id || '');
  const canvasRef = useRef(null);

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const octaves = [2, 3, 4, 5, 6];
  const durations = [
    { value: 'w', label: 'Whole' },
    { value: '2n', label: 'Half' },
    { value: '4n', label: 'Quarter' },
    { value: '8n', label: 'Eighth' },
    { value: '16n', label: 'Sixteenth' }
  ];

  useEffect(() => {
    drawStaff();
  }, [score]);

  const drawStaff = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 200;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
    ctx.lineWidth = 1;

    // Draw staff lines
    const staffTop = 40;
    const lineSpacing = 15;
    for (let i = 0; i < 5; i++) {
      const y = staffTop + i * lineSpacing;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Draw treble clef (simplified)
    ctx.font = '48px serif';
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
    ctx.fillText('𝄞', 30, staffTop + 45);

    // Draw notes
    if (score && score.notes) {
      let xPos = 100;
      score.notes.forEach((note, index) => {
        const noteY = getNotePosition(note.pitch);
        
        // Draw note head
        ctx.beginPath();
        ctx.ellipse(xPos, noteY, 8, 6, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = note.duration === 'w' || note.duration === '2n' 
          ? getComputedStyle(document.documentElement).getPropertyValue('--color-background')
          : getComputedStyle(document.documentElement).getPropertyValue('--color-text');
        ctx.fill();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
        ctx.stroke();

        // Draw stem for non-whole notes
        if (note.duration !== 'w') {
          ctx.beginPath();
          ctx.moveTo(xPos + 7, noteY);
          ctx.lineTo(xPos + 7, noteY - 35);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        xPos += 60;
      });
    }
  };

  const getNotePosition = (noteName) => {
    // Map note names to staff positions
    const noteMap = {
      'C5': 25, 'B4': 32, 'A4': 40, 'G4': 47, 'F4': 55,
      'E4': 62, 'D4': 70, 'C4': 77, 'B3': 85, 'A3': 92,
      'G3': 100, 'F3': 107, 'E3': 115
    };
    return noteMap[noteName] || 77;
  };

  const handleAddNote = () => {
    const newNote = {
      pitch: selectedNote,
      duration: selectedDuration,
      time: score.notes ? score.notes.length * 0.5 : 0
    };
    
    const updatedScore = {
      ...score,
      notes: [...(score.notes || []), newNote],
      tempo: tempo,
      timeSignature: timeSignature,
      keySignature: keySignature,
      instrument: selectedInstrument
    };
    
    onScoreChange(updatedScore);
  };

  const handleRemoveNote = (index) => {
    const updatedScore = {
      ...score,
      notes: score.notes.filter((_, i) => i !== index)
    };
    onScoreChange(updatedScore);
  };

  const handleClearScore = () => {
    const updatedScore = {
      ...score,
      notes: []
    };
    onScoreChange(updatedScore);
  };

  return (
    <div className="score-editor">
      <div className="score-header">
        <h2>🎼 Score Editor</h2>
        <div className="score-controls">
          <div className="control-group">
            <label>Tempo (BPM):</label>
            <input
              type="number"
              min="40"
              max="240"
              value={tempo}
              onChange={(e) => setTempo(parseInt(e.target.value) || 120)}
            />
          </div>
          <div className="control-group">
            <label>Time Signature:</label>
            <select value={timeSignature} onChange={(e) => setTimeSignature(e.target.value)}>
              <option value="4/4">4/4</option>
              <option value="3/4">3/4</option>
              <option value="6/8">6/8</option>
              <option value="2/4">2/4</option>
            </select>
          </div>
          <div className="control-group">
            <label>Key:</label>
            <select value={keySignature} onChange={(e) => setKeySignature(e.target.value)}>
              <option value="C">C Major</option>
              <option value="G">G Major</option>
              <option value="D">D Major</option>
              <option value="F">F Major</option>
              <option value="Am">A Minor</option>
            </select>
          </div>
        </div>
      </div>

      <div className="staff-container">
        <canvas ref={canvasRef} className="music-staff" />
      </div>

      <div className="note-input-panel">
        <h3>Add Notes</h3>
        <div className="note-input-controls">
          <div className="control-group">
            <label>Instrument:</label>
            <select value={selectedInstrument} onChange={(e) => setSelectedInstrument(e.target.value)}>
              {instruments.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Note:</label>
            <select value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)}>
              {octaves.map(octave =>
                notes.map(note => (
                  <option key={`${note}${octave}`} value={`${note}${octave}`}>
                    {note}{octave}
                  </option>
                ))
              ).flat()}
            </select>
          </div>

          <div className="control-group">
            <label>Duration:</label>
            <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              {durations.map(dur => (
                <option key={dur.value} value={dur.value}>{dur.label}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleAddNote}>
            ➕ Add Note
          </button>
          <button className="btn btn-secondary" onClick={handleClearScore}>
            🗑️ Clear
          </button>
          <button className="btn btn-primary" onClick={onPlay}>
            ▶ Play Score
          </button>
        </div>
      </div>

      {score.notes && score.notes.length > 0 && (
        <div className="notes-list">
          <h3>Notes in Score ({score.notes.length})</h3>
          <div className="notes-grid">
            {score.notes.map((note, index) => (
              <div key={index} className="note-item">
                <span>{index + 1}. {note.pitch} ({note.duration})</span>
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={() => handleRemoveNote(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Custom Instrument Maker Modal
function CustomInstrumentMaker({ onSave, onClose, instruments }) {
  const [sampleFile, setSampleFile] = useState(null);
  const [sampleUrl, setSampleUrl] = useState(null);
  const [baseNote, setBaseNote] = useState('C4');
  const [instrumentName, setInstrumentName] = useState('');
  const [category, setCategory] = useState('custom');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [pitchShift, setPitchShift] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const playerRef = useRef(null);

  const noteToFrequency = (note) => {
    const noteMap = {
      'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
      'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
    };
    const octave = parseInt(note.slice(-1));
    const noteName = note.slice(0, -1);
    const semitone = noteMap[noteName] + (octave * 12) - 57; // A4 = 440Hz = 0
    return 440 * Math.pow(2, semitone / 12);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSampleFile(file);
      const url = URL.createObjectURL(file);
      setSampleUrl(url);
      
      // Load audio buffer
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const audioContext = Tone.context.rawContext;
          const arrayBuffer = event.target.result;
          const buffer = await audioContext.decodeAudioData(arrayBuffer);
          setAudioBuffer(buffer);
        } catch (error) {
          console.error('Error decoding audio:', error);
          alert('Error loading audio file. Please try another file.');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setSampleUrl(url);
        
        // Convert to buffer
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioContext = Tone.context.rawContext;
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePreview = async () => {
    if (!audioBuffer) {
      alert('Please upload or record a sample first');
      return;
    }

    await Tone.start();
    
    // Clean up existing player
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    // Create a player with the buffer
    const player = new Tone.Player(audioBuffer).toDestination();
    player.playbackRate = Math.pow(2, pitchShift / 12);
    playerRef.current = player;
    
    player.start();
  };

  const handleSave = () => {
    if (!instrumentName.trim()) {
      alert('Please enter an instrument name');
      return;
    }
    if (!audioBuffer) {
      alert('Please upload or record a sample first');
      return;
    }

    // Create a custom instrument definition
    const customInstrument = {
      id: `custom-${Date.now()}`,
      name: instrumentName,
      category: category,
      isCustom: true,
      baseNote: baseNote,
      sampleUrl: sampleUrl,
      audioBuffer: audioBuffer,
      oscillator: { type: "sine", detune: 0, volume: -6 },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.8, release: 0.5 },
      filter: { type: "lowpass", cutoff: 2000, resonance: 1.0 },
      effect: { type: "none", wet: 0 },
      meta: { bpm: 120, tags: ["custom", "sampled"] }
    };

    // Save to localStorage
    try {
      const customInstruments = JSON.parse(localStorage.getItem('customInstruments') || '[]');
      customInstruments.push({
        ...customInstrument,
        audioBuffer: null, // Can't serialize AudioBuffer
        sampleData: Array.from(audioBuffer.getChannelData(0)).slice(0, 1000) // Store sample for reference
      });
      localStorage.setItem('customInstruments', JSON.stringify(customInstruments));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    onSave(customInstrument);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal custom-instrument-modal" onClick={(e) => e.stopPropagation()}>
        <h2>🎨 Custom Instrument Maker</h2>
        
        <div className="form-group">
          <label>Instrument Name</label>
          <input
            type="text"
            value={instrumentName}
            onChange={(e) => setInstrumentName(e.target.value)}
            placeholder="My Custom Instrument"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="custom">Custom</option>
            <option value="lead">Lead</option>
            <option value="bass">Bass</option>
            <option value="pad">Pad</option>
            <option value="strings">Strings</option>
            <option value="woodwind">Woodwind</option>
            <option value="brass">Brass</option>
            <option value="drums">Drums</option>
          </select>
        </div>

        <div className="section-title">Sample Source</div>
        
        <div className="sample-source-controls">
          <div className="form-group">
            <label>Upload Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={isRecording}
            />
          </div>

          <div className="form-group">
            <label>Or Record Sample</label>
            <div style={{display: 'flex', gap: '8px'}}>
              {!isRecording ? (
                <button className="btn btn-primary" onClick={startRecording}>
                  🎤 Start Recording
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={stopRecording}>
                  ⏹ Stop Recording
                </button>
              )}
            </div>
          </div>
        </div>

        {sampleUrl && (
          <>
            <div className="section-title">Sample Configuration</div>
            
            <div className="form-group">
              <label>Base Note (what note is this sample?)</label>
              <select value={baseNote} onChange={(e) => setBaseNote(e.target.value)}>
                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(note =>
                  [2, 3, 4, 5, 6].map(octave => (
                    <option key={`${note}${octave}`} value={`${note}${octave}`}>
                      {note}{octave}
                    </option>
                  ))
                ).flat()}
              </select>
            </div>

            <div className="form-group">
              <label>Pitch Shift Preview <span className="slider-value">{pitchShift > 0 ? '+' : ''}{pitchShift} semitones</span></label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={pitchShift}
                onChange={(e) => setPitchShift(parseInt(e.target.value))}
              />
            </div>

            <div className="sample-info">
              <p>✓ Sample loaded successfully</p>
              <p>Base note: <strong>{baseNote}</strong> ({Math.round(noteToFrequency(baseNote))} Hz)</p>
              <p>The app will automatically pitch-shift this sample to play other notes</p>
            </div>
          </>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handlePreview} disabled={!audioBuffer}>
            ▶ Preview
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!audioBuffer}>
            💾 Save Instrument
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
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
  const [showCustomInstrumentMaker, setShowCustomInstrumentMaker] = useState(false);
  
  // Score Editor State
  const [currentScore, setCurrentScore] = useState({
    notes: [],
    tempo: 120,
    timeSignature: '4/4',
    keySignature: 'C',
    instrument: 'lead-saw-bright'
  });
  
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

  // Load custom instruments from localStorage on mount
  useEffect(() => {
    try {
      const customInstruments = JSON.parse(localStorage.getItem('customInstruments') || '[]');
      if (customInstruments.length > 0) {
        setInstruments(prev => [...prev, ...customInstruments.map(inst => ({
          ...inst,
          isCustom: true
        }))]);
      }
    } catch (error) {
      console.error('Error loading custom instruments:', error);
    }
  }, []);

  // Keyboard shortcuts - Space bar and Cmd/Ctrl combinations
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Space bar to toggle play/stop (only when not in input fields)
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (activeTab === 'composition') {
          handlePlayStop();
        } else if (activeTab === 'liveCoding') {
          isLivePlaying ? handleLiveStop() : handleLivePlay();
        }
      }
      
      // Cmd/Ctrl based shortcuts
      const isModKey = e.metaKey || e.ctrlKey; // metaKey for Mac, ctrlKey for Windows/Linux
      
      if (isModKey) {
        switch(e.key.toLowerCase()) {
          case 'n':
            // Cmd/Ctrl + N: Create new score
            e.preventDefault();
            const newArrangement = {
              id: `arrangement-${Date.now()}`,
              name: 'New Score',
              bpm: 120,
              tracks: []
            };
            setCurrentArrangement(newArrangement);
            setArrangements([...arrangements, newArrangement]);
            showStatusMessage('New score created!');
            break;
          
          case 's':
            // Cmd/Ctrl + S: Save composition
            e.preventDefault();
            handleExportData();
            break;
          
          case 'p':
            // Cmd/Ctrl + P: Play/Pause
            e.preventDefault();
            if (activeTab === 'composition') {
              handlePlayStop();
            } else if (activeTab === 'liveCoding') {
              isLivePlaying ? handleLiveStop() : handleLivePlay();
            }
            break;
          
          case 'z':
            // Cmd/Ctrl + Z: Undo (basic implementation)
            e.preventDefault();
            // Simple undo: reload from arrangements if available
            if (arrangements.length > 0) {
              setCurrentArrangement(arrangements[0]);
              showStatusMessage('Undo: Reverted to previous state');
            }
            break;
          
          default:
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isLivePlaying, currentArrangement, arrangements, activeTab]);

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

  const handleSaveCustomInstrument = (instrument) => {
    setInstruments([...instruments, instrument]);
    setShowCustomInstrumentMaker(false);
    showStatusMessage(`Custom instrument "${instrument.name}" created!`);
  };

  const handleScoreChange = (updatedScore) => {
    setCurrentScore(updatedScore);
  };

  const handlePlayScore = async () => {
    if (!currentScore.notes || currentScore.notes.length === 0) {
      showStatusMessage('No notes to play');
      return;
    }

    await Tone.start();
    Tone.Transport.bpm.value = currentScore.tempo;

    const instrument = instruments.find(i => i.id === currentScore.instrument);
    if (!instrument) {
      showStatusMessage('Instrument not found');
      return;
    }

    const synthBundle = createSynth(instrument);
    
    // Create a sequence of notes
    const part = new Tone.Part((time, note) => {
      synthBundle.synth.triggerAttackRelease(note.pitch, note.duration, time);
    }, currentScore.notes.map((note, i) => ({
      time: i * 0.5, // Simple timing
      pitch: note.pitch,
      duration: note.duration
    })));

    part.start(0);
    Tone.Transport.start();
    
    showStatusMessage('Playing score...');

    // Stop after playing
    setTimeout(() => {
      Tone.Transport.stop();
      part.dispose();
      synthBundle.synth.dispose();
      synthBundle.filter.dispose();
      if (synthBundle.effect) synthBundle.effect.dispose();
    }, currentScore.notes.length * 500 + 1000);
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
          className={`tab-button ${activeTab === 'scoreEditor' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('scoreEditor');
            if (isPlaying) handlePlayStop();
            if (isLivePlaying) handleLiveStop();
          }}
        >
          📝 Score Editor
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
              onCreateCustom={() => setShowCustomInstrumentMaker(true)}
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

        {activeTab === 'scoreEditor' && (
          <div className="score-editor-container">
            <ScoreEditor
              score={currentScore}
              onScoreChange={handleScoreChange}
              instruments={instruments}
              onPlay={handlePlayScore}
            />
          </div>
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

      {showCustomInstrumentMaker && (
        <CustomInstrumentMaker
          onSave={handleSaveCustomInstrument}
          onClose={() => setShowCustomInstrumentMaker(false)}
          instruments={instruments}
        />
      )}
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);