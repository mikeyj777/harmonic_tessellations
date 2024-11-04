class PerformanceManager {
  constructor(config = {}) {
    this.config = {
      targetFPS: 60,
      minFPS: 30,
      ...config
    };
    
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.fps = 60;
  }

  /**
   * Check if we should render the current frame
   */
  shouldRenderFrame = (timestamp) => {
    const deltaTime = timestamp - this.lastFrameTime;
    this.fps = 1000 / deltaTime;

    // Skip frame if we're below target FPS
    if (this.fps < this.config.minFPS) {
      return false;
    }

    this.lastFrameTime = timestamp;
    this.frameCount++;
    return true;
  };

  /**
   * Get current performance metrics
   */
  getMetrics = () => ({
    fps: Math.round(this.fps),
    frameCount: this.frameCount
  });

  cleanup = () => {
    this.frameCount = 0;
    this.lastFrameTime = 0;
  };
}

export default PerformanceManager;