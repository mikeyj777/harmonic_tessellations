/**
* AudioManager.js
* 
* Handles audio generation and playback for the Harmonic Tessellations.
* Manages Web Audio API context and oscillators.
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
    
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.context.destination);
      this.initialized = true;
      console.log("AudioManager initialized");
    } catch (err) {
      console.error("Failed to initialize AudioManager:", err);
      throw err;
    }
  };
 
  /**
   * Schedule notes based on pattern vertices
   */
  scheduleNotes = (vertices) => {
    if (!this.initialized || !this.context) {
      console.warn("AudioManager not initialized");
      return;
    }
    
    // Clear previous oscillators
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (err) {
        console.warn("Error cleaning up oscillator:", err);
      }
    });
    this.oscillators.clear();
 
    // Create new oscillators for each vertex
    vertices.forEach((vertex, i) => {
      try {
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
      } catch (err) {
        console.warn("Error scheduling note:", err);
      }
    });
  };
 
  /**
   * Map vertex position to frequency using simple pentatonic scale
   */
  mapToFrequency = ([x, y], index) => {
    const baseFrequency = 220;  // A3
    const ratios = [1, 1.125, 1.25, 1.5, 1.667];
    return baseFrequency * ratios[index % ratios.length];
  };
 
  /**
   * Get current audio context state
   */
  getState = () => ({
    initialized: this.initialized,
    contextState: this.context?.state || 'closed',
    activeOscillators: this.oscillators.size
  });
 
  /**
   * Suspend audio context
   */
  suspend = async () => {
    if (this.context && this.context.state === 'running') {
      try {
        await this.context.suspend();
        console.log("Audio context suspended");
      } catch (err) {
        console.warn("Error suspending audio context:", err);
      }
    }
  };
 
  /**
   * Resume audio context
   */
  resume = async () => {
    if (this.context && this.context.state === 'suspended') {
      try {
        await this.context.resume();
        console.log("Audio context resumed");
      } catch (err) {
        console.warn("Error resuming audio context:", err);
      }
    }
  };
 
  /**
   * Clean up manager resources
   */
  cleanup = () => {
    console.log("AudioManager cleanup started");
    
    // Clean up oscillators
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (err) {
        console.warn("Error cleaning up oscillator:", err);
      }
    });
    this.oscillators.clear();
    
    // Clean up audio context
    if (this.context && this.context.state !== 'closed') {
      try {
        this.context.close();
        console.log("Audio context closed");
      } catch (err) {
        console.warn("Error closing audio context:", err);
      }
    }
    
    // Reset properties
    this.context = null;
    this.masterGain = null;
    this.initialized = false;
    
    console.log("AudioManager cleanup completed");
  };
 }
 
 export default AudioManager;