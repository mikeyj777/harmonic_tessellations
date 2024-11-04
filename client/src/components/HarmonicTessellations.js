// src/components/HarmonicTessellations.js
//
// Main component for our audio-visual geometric experiment.
// This orchestrates pattern generation, audio synthesis, and user interaction
// to create an exploration of mathematical harmonies.
//
// Note: Optimized for desktop Chrome browser.

import React, { useState, useEffect, useRef } from 'react';

import Controls from './ui/Controls';

import PatternManager from './managers/PatternManager';
import AudioManager from './managers/AudioManager';
import PerformanceManager from './managers/PerformanceManager';
import './HarmonicTessellations.css';

/**
 * Configuration constants for our viewport.
 * These dimensions are optimized for desktop viewing.
 */
const VIEW_CONFIG = {
  width: 800,    // Width that gives us room to breathe
  height: 600,   // Height that maintains good proportions
  padding: 20    // Space around our patterns
};

/**
 * HarmonicTessellations Component
 * 
 * Combines geometric pattern generation with audio synthesis
 * to create an interactive audio-visual experience.
 */
const HarmonicTessellations = () => {
  // --- State Management ---
  const [isPlaying, setIsPlaying] = useState(false);      // Controls playback
  const [isMuted, setIsMuted] = useState(false);          // Controls audio
  const [complexity, setComplexity] = useState(3);        // Pattern complexity (1-8)
  const [transformation, setTransformation] = 
    useState('rotation');                                 // Pattern transformation type
  const [error, setError] = useState(null);               // Error state
  const [vertices, setVertices] = useState([]);           // Current pattern vertices

  // --- Refs ---
  const svgRef = useRef(null);                           // Reference to SVG element
  const animationFrameRef = useRef(null);                // For animation loop
  const managersRef = useRef({                           // Persistent manager instances
    pattern: null,
    audio: null,
    performance: null
  });

  /**
   * Initialize system managers
   */
  useEffect(() => {
    const initializeManagers = async () => {
      try {
        managersRef.current = {
          pattern: new PatternManager(),
          audio: new AudioManager(),
          performance: new PerformanceManager({
            targetFPS: 60,
            minFPS: 30
          })
        };

        // Initialize audio system
        await managersRef.current.audio.initialize();

        console.log('Initialization complete');
      } catch (err) {
        setError('Failed to initialize system components');
        console.error('Initialization error:', err);
      }
    };

    initializeManagers();

    // Cleanup on unmount
    return () => {
      const { pattern, audio, performance } = managersRef.current;
      pattern?.cleanup();
      audio?.cleanup();
      performance?.cleanup();
    };
  }, []);

  /**
   * Handle pattern updates and audio scheduling
   */
  useEffect(() => {
    console.log("useEffect.  isPlaying:", isPlaying, "  complexity:", complexity, "  transformation:", transformation, "  isMuted:", isMuted);
    if (!isPlaying || !managersRef.current.pattern) return;

    const animate = (timestamp) => {
      const { pattern, audio, performance } = managersRef.current;

      if (performance.shouldRenderFrame(timestamp)) {
        // Generate new pattern
        const newVertices = pattern.generatePattern({
          complexity,
          transformation
        });

        setVertices(newVertices);

        // Schedule audio if not muted
        if (!isMuted && audio) {
          audio.scheduleNotes(newVertices);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup animation frame
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, complexity, transformation, isMuted]);

  /**
   * Handle reset action
   */
  const handleReset = () => {
    setIsPlaying(false);
    setVertices([]);
    const { pattern, audio } = managersRef.current;
    pattern?.cleanup();
    audio?.cleanup();
  };

  /**
   * SVG Pattern Renderer Component
   */
  const PatternRenderer = React.memo(({ vertices }) => {
    console.log("PatternRenderer", vertices)
    if (!vertices.length) return null;

    const points = vertices
      .map(([x, y]) => `${x},${y}`)
      .join(' ');

    return (
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_CONFIG.width} ${VIEW_CONFIG.height - 80}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${VIEW_CONFIG.width/2} ${(VIEW_CONFIG.height-80)/2})`}>
          <polygon
            points={points}
            fill="none"
            stroke="#2c3e50"
            strokeWidth="1"
          />
        </g>
      </svg>
    );
  });

  /**
   * Error display render
   */
  if (error) {
    return (
      <div className="harmonic-container">
        <div className="error-container">
        { console.log(error) }
          <h3>Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="error-button"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  /**
   * Main component render
   */
  return (
    <div className="harmonic-container">
      <div className="visualizer">
        { console.log("vertices ", vertices) }
        <PatternRenderer vertices={vertices} />
      </div>
      <Controls
        state={{
          isPlaying,
          isMuted,
          complexity,
          transformation
        }}
        handlers={{
          onPlayPause: () => setIsPlaying(!isPlaying),
          onReset: handleReset,
          onMute: () => setIsMuted(!isMuted),
          onComplexityChange: setComplexity,
          onTransformationChange: setTransformation
        }}
      />
    </div>
  );
};

export default HarmonicTessellations;


// Tom7 Says: "Notice how we're using refs for the managers instead of state. 
// This is because managers are stateful objects that we don't want to 
// re-create on every render. It's like keeping your synthesizer plugged in 
// even when you're not playing it. Also, the cleanup functions are crucial - 
// always clean up your audio contexts, or they'll haunt your browser like 
// friendly but resource-hungry ghosts."

// Would you like me to:
// 1. Explain any particular section in more detail?
// 2. Add more error handling?
// 3. Add performance optimizations?
// 4. Add additional features?

