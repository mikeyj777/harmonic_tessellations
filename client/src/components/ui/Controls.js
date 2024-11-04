import React from 'react';
import './Controls.css';

/**
 * Button component for consistent control styling
 * 
 * @param {Object} props - Component properties
 * @param {string} props.label - Button text
 * @param {boolean} props.active - Active state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
const ControlButton = ({ label, active, onClick, className = '' }) => (
  <button
    className={`control-button ${active ? 'active' : ''} ${className}`}
    onClick={onClick}
    aria-pressed={active}
  >
    {label}
  </button>
  
);

/**
 * Slider control for pattern complexity
 * 
 * @param {Object} props - Component properties
 * @param {number} props.value - Current complexity value
 * @param {Function} props.onChange - Change handler
 */
const ComplexitySlider = ({ value, onChange }) => (
  <div className="slider-container">
    <label htmlFor="complexity">Complexity</label>
    <input
      id="complexity"
      type="range"
      min="1"
      max="8"
      step="1"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="complexity-slider"
    />
    <span className="slider-value">{value}</span>
  </div>
);

/**
 * Transformation selector component
 * 
 * @param {Object} props - Component properties
 * @param {string} props.current - Current transformation type
 * @param {Function} props.onChange - Change handler
 */
const TransformationSelector = ({ current, onChange }) => {
  const transformations = ['rotation', 'reflection'];
  
  return (
    <div className="transformation-container">
      <label>Transformation</label>
      <div className="transformation-buttons">
        {transformations.map(type => (
          <ControlButton
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            active={current === type}
            onClick={() => onChange(type)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Main Controls component
 * Orchestrates all user interactions with the system
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.state - Current state values
 * @param {Object} props.handlers - State update handlers
 */
const Controls = ({
  state: {
    isPlaying,
    isMuted,
    complexity,
    transformation
  },
  handlers: {
    onPlayPause,
    onReset,
    onMute,
    onComplexityChange,
    onTransformationChange
  }
}) => {
  
  return (
    <div className="controls-container">
      { console.log("Controls.js") }
      <div className="playback-controls">
      { console.log("playback-controls") }
        <ControlButton
          label={isPlaying ? "Pause" : "Play"}
          active={isPlaying}
          onClick={onPlayPause}
          className="play-button"
        />
        <ControlButton
          label="Reset"
          onClick={onReset}
          className="reset-button"
        />
        <ControlButton
          label={isMuted ? "Unmute" : "Mute"}
          active={isMuted}
          onClick={onMute}
          className="mute-button"
        />
      </div>

      <ComplexitySlider
        value={complexity}
        onChange={onComplexityChange}
      />

      <TransformationSelector
        current={transformation}
        onChange={onTransformationChange}
      />
    </div>
  );
};

// Example usage in parent component:
/*
<Controls
  state={{
    isPlaying: isPlaying,
    isMuted: isMuted,
    complexity: complexity,
    transformation: transformation
  }}
  handlers={{
    onPlayPause: () => setIsPlaying(!isPlaying),
    onReset: handleReset,
    onMute: () => setIsMuted(!isMuted),
    onComplexityChange: setComplexity,
    onTransformationChange: setTransformation
  }}
/>
*/

export default Controls;