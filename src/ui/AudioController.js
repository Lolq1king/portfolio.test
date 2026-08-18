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
      if (this.btnToggle) this.btnToggle.classList.remove('highlight');
      if (this.audioIcon) this.audioIcon.textContent = '🔇';
      if (this.audioLabel) this.audioLabel.textContent = 'AUDIO: OFF';
    } else {
      this.audioCtx.resume();
      this.isPlaying = true;
      if (this.btnToggle) this.btnToggle.classList.add('highlight');
      if (this.audioIcon) this.audioIcon.textContent = '🔥';
      if (this.audioLabel) this.audioLabel.textContent = 'AUDIO: OGNISKO & LAS';
    }
  }

  initSynthAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    const masterGain = this.audioCtx.createGain();
    masterGain.gain.value = 0.55;
    masterGain.connect(this.audioCtx.destination);

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
      output[i] *= 0.035; // Low ambient wind volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass Filter for Wind effect
    const windFilter = this.audioCtx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 350;

    // LFO for gentle wind swaying
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 150;
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    whiteNoise.connect(windFilter);
    windFilter.connect(masterGain);
    whiteNoise.start();

    // 2. Campfire Crackling & Popping Embers Synthesizer 🔥
    // A. Flame Roar / Warm Low Flicker Noise
    const flameBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const flameData = flameBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      flameData[i] = (Math.random() * 2 - 1) * 0.05;
    }
    const flameNoise = this.audioCtx.createBufferSource();
    flameNoise.buffer = flameBuffer;
    flameNoise.loop = true;

    const flameFilter = this.audioCtx.createBiquadFilter();
    flameFilter.type = 'bandpass';
    flameFilter.frequency.value = 180;
    flameFilter.Q.value = 1.2;

    const flameGain = this.audioCtx.createGain();
    flameGain.gain.value = 0.25;

    flameNoise.connect(flameFilter);
    flameFilter.connect(flameGain);
    flameGain.connect(masterGain);
    flameNoise.start();

    // Flame Flicker Modulation
    const flameLfo = this.audioCtx.createOscillator();
    flameLfo.frequency.value = 3.5; // Flame flickering rate
    const flameLfoGain = this.audioCtx.createGain();
    flameLfoGain.gain.value = 0.08;
    flameLfo.connect(flameLfoGain);
    flameLfoGain.connect(flameGain.gain);
    flameLfo.start();

    // B. Wood Crackles & Pop Clicks Generator
    const triggerCracklePop = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const popOsc = this.audioCtx.createBufferSource();
      const popLen = Math.floor(this.audioCtx.sampleRate * (0.005 + Math.random() * 0.015)); // Short 5-20ms pop
      const popBuf = this.audioCtx.createBuffer(1, popLen, this.audioCtx.sampleRate);
      const pData = popBuf.getChannelData(0);
      for (let i = 0; i < popLen; i++) {
        pData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (popLen * 0.3)); // Exponential decay click
      }
      popOsc.buffer = popBuf;

      const popFilter = this.audioCtx.createBiquadFilter();
      popFilter.type = 'bandpass';
      popFilter.frequency.value = 1500 + Math.random() * 3000; // Wood crackle frequency variation
      popFilter.Q.value = 4.0;

      const popGain = this.audioCtx.createGain();
      popGain.gain.value = 0.15 + Math.random() * 0.25;

      popOsc.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(masterGain);
      popOsc.start();
    };

    // Schedule random campfire crackles continuously
    const scheduleNextCrackle = () => {
      if (this.isPlaying) {
        triggerCracklePop();
      }
      const nextTime = 40 + Math.random() * 180; // 40ms - 220ms random interval between crackles
      setTimeout(scheduleNextCrackle, nextTime);
    };
    scheduleNextCrackle();

    // 3. Retro CRT Hum Oscillator
    const crtOsc = this.audioCtx.createOscillator();
    crtOsc.type = 'sine';
    crtOsc.frequency.value = 60; // 60Hz hum
    const crtGain = this.audioCtx.createGain();
    crtGain.gain.value = 0.02;

    crtOsc.connect(crtGain);
    crtGain.connect(masterGain);
    crtOsc.start();
  }
}
