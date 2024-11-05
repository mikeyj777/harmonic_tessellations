/**
 * PerformanceManager.js
 * 
 * Handles performance monitoring and frame rate control.
 * Ensures smooth animation by tracking FPS and managing frame rendering.
 */
class PerformanceManager {
  constructor(config = {}) {
    this.config = {
      targetFPS: 60,
      minFPS: 30,
      ...config
    };
    
    this.lastFrameTime = window.performance.now();  // Initialize with current time
    this.frameCount = 0;
    this.fps = 60;
    this.isActive = true;  // Track if manager is active
  }

  /**
   * Check if we should render the current frame
   * Calculate FPS based on time delta between frames
   * 
   * @param {number} timestamp - Current timestamp from requestAnimationFrame
   * @returns {boolean} Whether to render this frame
   */
  shouldRenderFrame = (timestamp) => {
    if (!this.isActive) return false;

    // Calculate time since last frame
    const deltaTime = timestamp - this.lastFrameTime;
    
    // Only update FPS if we have a valid deltaTime
    if (deltaTime > 0) {
      this.fps = 1000 / deltaTime;  // Convert to FPS (1000ms / deltaTime)
      
      // Debug logging
      console.log("shouldRenderFrame.", {
        timestamp,
        lastFrameTime: this.lastFrameTime,
        deltaTime,
        fps: this.fps,
        minFPS: this.config.minFPS
      });
    }
    // console.log("shouldRenderFrame.  FPS:", this.fps, "  minFPS:", this.config.minFPS, "  isActive:", this.isActive, "  frameCount:", this.frameCount);
    // Update lastFrameTime for next frame
    this.lastFrameTime = timestamp;
    this.frameCount++;

    // Return true if FPS is above minimum threshold
    return this.fps >= this.config.minFPS;
  };

  /**
   * Get current performance metrics
   * 
   * @returns {Object} Current performance metrics
   */
  getMetrics = () => ({
    fps: Math.round(this.fps),
    frameCount: this.frameCount,
    isActive: this.isActive
  });

  /**
   * Reset performance metrics
   */
  reset = () => {
    this.lastFrameTime = window.performance.now();
    this.frameCount = 0;
    this.fps = 60;
  };

  /**
   * Clean up manager resources
   * Reset metrics and mark as inactive
   */
  cleanup = () => {
    this.isActive = false;
    this.reset();
    console.log("PerformanceManager cleaned up");
  };
}

export default PerformanceManager;