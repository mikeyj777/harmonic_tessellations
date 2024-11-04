// src/managers/AudioManager.js
/**
 * Handles audio generation and playback.
 * The musical soul of our geometric system.
 */
class AudioManager {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.oscillators = new Map();
    this.initialized = false;
  }

  /**
   * Initialize audio context and master gain
   */
  initialize = async () => {
    if (this.initialized) return;
    
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.context.destination);
    this.initialized = true;
  };

  /**
   * Schedule notes based on pattern vertices
   */
  scheduleNotes = (vertices) => {
    if (!this.initialized) return;
    
    // Clear previous oscillators
    this.oscillators.forEach(osc => {
      osc.stop();
      osc.disconnect();
    });
    this.oscillators.clear();

    // Create new oscillators for each vertex
    vertices.forEach((vertex, i) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      
      // Map vertex position to frequency
      const frequency = this.mapToFrequency(vertex, i);
      oscillator.frequency.value = frequency;
      
      // Connect oscillator
      oscillator.connect(gain);
      gain.connect(this.masterGain);
      
      // Schedule envelope
      const startTime = this.context.currentTime;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
      
      // Start oscillator
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
      
      this.oscillators.set(i, oscillator);
    });
  };

  /**
   * Map vertex position to frequency
   * @private
   */
  mapToFrequency = ([x, y], index) => {
    // Use simple pentatonic mapping
    const baseFrequency = 220;  // A3
    const ratios = [1, 1.125, 1.25, 1.5, 1.667];
    return baseFrequency * ratios[index % ratios.length];
  };

  cleanup = () => {
    this.oscillators.forEach(osc => {
      osc.stop();
      osc.disconnect();
    });
    this.oscillators.clear();
    if (this.context) {
      this.context.close();
    }
  };
}

export default AudioManager;