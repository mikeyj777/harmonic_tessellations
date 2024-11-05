class PatternManager {
  constructor(config = {}) {
    this.config = {
      maxVertices: 1000,
      minVertices: 100,
      baseSize: 100,  // Base size for initial triangle
      ...config
    };
    
    this.cache = new Map();
    console.log("PatternManager initialized with config:", this.config);
  }

  generatePattern = ({ complexity, transformation }) => {
    console.log("generatePattern called with:", { complexity, transformation });
    
    const cacheKey = `${complexity}-${transformation}`;
    if (this.cache.has(cacheKey)) {
      console.log("Cache hit for:", cacheKey);
      return this.cache.get(cacheKey);
    }

    // Generate base triangle with larger size
    const vertices = this.generateTriangle(this.config.baseSize);
    console.log("Base triangle vertices:", vertices);

    // Add complexity through subdivision
    const subdivided = this.subdividePattern(vertices, complexity);
    console.log("Subdivided vertices:", subdivided);

    // Apply transformation
    const transformed = this.applyTransformation(subdivided, transformation);
    console.log("Transformed vertices:", transformed);

    this.cache.set(cacheKey, transformed);
    return transformed;
  };

  generateTriangle = (size) => {
    const height = size * Math.sqrt(3) / 2;
    const vertices = [
      [0, -height/2],           // Top
      [-size/2, height/2],      // Bottom left
      [size/2, height/2]        // Bottom right
    ];
    console.log("Generated base triangle:", { size, height, vertices });
    return vertices;
  };

  subdividePattern = (vertices, complexity) => {
    console.log("Starting subdivision, complexity:", complexity);
    let result = [...vertices];
    
    for (let i = 1; i < complexity; i++) {
      result = this.subdivideOnce(result);
      console.log(`Subdivision level ${i}, vertices:`, result.length);
    }
    
    return result;
  };

  subdivideOnce = (vertices) => {
    const newVertices = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const triangle = vertices.slice(i, i + 3);
      const subdivided = this.subdivideTriangle(triangle);
      newVertices.push(...subdivided);
    }
    return newVertices;
  };

  subdivideTriangle = (triangle) => {
    const [p1, p2, p3] = triangle;
    const m1 = this.midpoint(p1, p2);
    const m2 = this.midpoint(p2, p3);
    const m3 = this.midpoint(p3, p1);
    
    return [
      p1, m1, m3,    // First sub-triangle
      m1, p2, m2,    // Second sub-triangle
      m3, m2, p3,    // Third sub-triangle
      m1, m2, m3     // Center triangle
    ];
  };

  midpoint = (p1, p2) => [
    (p1[0] + p2[0]) / 2,
    (p1[1] + p2[1]) / 2
  ];

  applyTransformation = (vertices, type) => {
    console.log("Applying transformation:", type);
    const angle = Date.now() * 0.001;  // Time-based rotation
    
    return vertices.map(([x, y]) => {
      if (type === 'rotation') {
        const rotated = [
          x * Math.cos(angle) - y * Math.sin(angle),
          x * Math.sin(angle) + y * Math.cos(angle)
        ];
        return rotated;
      } else {  // reflection
        return [-x, y];
      }
    });
  };

  cleanup = () => {
    console.log("PatternManager cleanup");
    this.cache.clear();
  };
}

export default PatternManager;