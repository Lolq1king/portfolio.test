export class AudioController {
  constructor() {
    this.isPlaying = false;
    this.audioCtx = null;
    this.btnToggle = document.getElementById('btn-toggle-audio');
    this.audioIcon = document.getElementById('audio-icon');
    this.audioLabel = document.getElementById('audio-label');

    if (this.btnToggle) {
      this.btnToggle.addEventListener('click', () => this.toggleAudio());
    }
  }

  toggleAudio() {
    if (!this.audioCtx) {
      this.initSynthAudio();
    }

    if (this.isPlaying) {
      this.audioCtx.suspend();
      this.isPlaying = false;
      this.audioIcon.textContent = '🔇';
      this.audioLabel.textContent = 'AUDIO: OFF';
    } else {
      this.audioCtx.resume();
      this.isPlaying = true;
      this.audioIcon.textContent = '🔊';
      this.audioLabel.textContent = 'AUDIO: ON';
    }
  }

  initSynthAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // 1. Forest Wind Noise Generator (Pink Noise Filtered)
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // Low ambient volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass Filter for Wind effect
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;

    // LFO for gentle wind swaying
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.value = 0.15; // Slow sway
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 150;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const masterGain = this.audioCtx.createGain();
    masterGain.gain.value = 0.4;

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.audioCtx.destination);

    whiteNoise.start();

    // 2. Retro CRT Hum Oscillator
    const crtOsc = this.audioCtx.createOscillator();
    crtOsc.type = 'sine';
    crtOsc.frequency.value = 60; // 60Hz hum
    const crtGain = this.audioCtx.createGain();
    crtGain.gain.value = 0.02;

    crtOsc.connect(crtGain);
    crtGain.connect(this.audioCtx.destination);
    crtOsc.start();
  }
}
