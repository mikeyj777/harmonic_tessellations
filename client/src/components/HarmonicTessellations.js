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
  width: 1200,    // Width that gives us room to breathe
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
  console.log("Animation useEffect triggered:", { 
    isPlaying, 
    complexity, 
    transformation, 
    isMuted,
    hasPattern: !!managersRef.current.pattern
  });

  if (!isPlaying || !managersRef.current.pattern) {
    console.log("Animation not starting - conditions not met");
    return;
  }

  let frameCount = 0;
  let lastRender = window.performance.now();

  const animate = (timestamp) => {
    frameCount++;
    const deltaTime = timestamp - lastRender;
    
    console.log(`Animation frame ${frameCount}:`, {
      timestamp,
      deltaTime,
      fps: 1000 / deltaTime
    });

    const { pattern, audio, performance } = managersRef.current;
    
    if (performance.shouldRenderFrame(timestamp)) {
      console.log("Generating new pattern");
      
      // Track pattern generation time
      const startGeneration = window.performance.now();
      const newVertices = pattern.generatePattern({
        complexity,
        transformation
      });
      const generationTime = window.performance.now() - startGeneration;
      
      console.log("Pattern generated:", {
        vertexCount: newVertices.length,
        generationTime
      });

      setVertices(newVertices);

      if (!isMuted && audio) {
        console.log("Scheduling audio");
        audio.scheduleNotes(newVertices);
      }
    }

    lastRender = timestamp;
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  console.log("Starting animation loop");
  animationFrameRef.current = requestAnimationFrame(animate);

  return () => {
    console.log("Cleaning up animation:", {
      frameCount,
      lastRender,
      hasAnimationFrame: !!animationFrameRef.current
    });
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
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
    console.log("PatternRenderer render with vertices:", vertices);
  
    if (!vertices.length) {
      console.log("No vertices to render");
      return null;
    }
  
    // Calculate bounds with padding
    const padding = 50;  // Increased padding for visibility
    const xs = vertices.map(([x]) => x);
    const ys = vertices.map(([, y]) => y);
    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;
    const width = maxX - minX;
    const height = maxY - minY;
  
    const viewBox = `${minX} ${minY} ${width} ${height}`;
    console.log("Calculated viewBox:", { viewBox, bounds: { minX, maxX, minY, maxY, width, height }});
  
    return (
      <svg
        className="pattern-svg"
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Debug grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ccc" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
  
        {/* Debug axes */}
        <line x1={minX} y1="0" x2={maxX} y2="0" stroke="red" strokeWidth="1" />
        <line x1="0" y1={minY} x2="0" y2={maxY} stroke="blue" strokeWidth="1" />
  
        {/* Debug origin marker */}
        <circle cx="0" cy="0" r="5" fill="purple" />
  
        {/* Pattern */}
        <g className="pattern-group">
          <polygon
            className="pattern-polygon"
            points={vertices.map(([x, y]) => `${x},${y}`).join(' ')}
          />
  
          {/* Debug vertex points */}
          {vertices.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              className="vertex-point"
            />
          ))}
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

