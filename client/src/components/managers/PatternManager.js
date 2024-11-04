// src/managers/PatternManager.js
/**
 * Handles pattern generation and geometric transformations.
 * This is the mathematical brain of our operation.
 */

class PatternManager {
  constructor(config = {}) {
    this.cache = new Map();  // Store generated patterns
    this.config = {
      maxVertices: 1000,     // Maximum vertices allowed
      minVertices: 100,      // Minimum vertices required
      ...config
    };
  }

  /**
   * Generate vertices for a triangular pattern
   * @param {number} complexity - Pattern complexity (1-8)
   * @returns {Array} Array of [x,y] coordinates
   */
  generatePattern = ({ complexity, transformation }) => {
    const cacheKey = `${complexity}-${transformation}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const vertices = this.generateTriangle(complexity);
    const transformedVertices = this.applyTransformation(vertices, transformation);
    
    this.cache.set(cacheKey, transformedVertices);
    return transformedVertices;
  };

  /**
   * Generate base triangle vertices
   * @private
   */
  generateTriangle = (complexity) => {
    const vertices = [];
    const size = 0.8;  // Base size of triangle
    
    // Base triangle
    vertices.push(
      [0, -size * Math.sqrt(3) / 3],             // Top
      [-size/2, size * Math.sqrt(3) / 6],        // Bottom left
      [size/2, size * Math.sqrt(3) / 6]          // Bottom right
    );

    // Add complexity by subdivision
    for (let i = 1; i < complexity; i++) {
      this.subdivide(vertices);
    }

    return vertices;
  };

  /**
   * Subdivide triangle vertices for increased complexity
   * @private
   */
  subdivide = (vertices) => {
    const newVertices = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const p1 = vertices[i];
      const p2 = vertices[i + 1];
      const p3 = vertices[i + 2];

      // Calculate midpoints
      const m1 = this.midpoint(p1, p2);
      const m2 = this.midpoint(p2, p3);
      const m3 = this.midpoint(p3, p1);

      newVertices.push(
        p1, m1, m3,     // First sub-triangle
        m1, p2, m2,     // Second sub-triangle
        m3, m2, p3,     // Third sub-triangle
        m1, m2, m3      // Center triangle
      );
    }
    vertices.push(...newVertices);
  };

  /**
   * Calculate midpoint between two points
   * @private
   */
  midpoint = (p1, p2) => [
    (p1[0] + p2[0]) / 2,
    (p1[1] + p2[1]) / 2
  ];

  /**
   * Apply transformation to vertices
   * @private
   */
  applyTransformation = (vertices, type) => {
    if (type === 'rotation') {
      const angle = Date.now() * 0.001;  // Time-based rotation
      return vertices.map(([x, y]) => [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle)
      ]);
    } else {  // reflection
      return vertices.map(([x, y]) => [-x, y]);
    }
  };

  cleanup = () => {
    this.cache.clear();
  };
}

export default PatternManager;