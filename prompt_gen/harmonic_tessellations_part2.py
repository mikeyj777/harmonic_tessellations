"""
harmonic tesselations - gather responses on conerns from original api response
"""

from data.data import API_KEY

import anthropic
MODEL_NAME = "claude-3-opus-20240229"

client = anthropic.Anthropic(api_key=API_KEY)

def get_completion(prompt: str, system_prompt="", prefill=""):
    message = client.messages.create(
        model=MODEL_NAME,
        max_tokens=2000,
        temperature=0.0,
        system=system_prompt,
        messages=[
          {"role": "user", "content": prompt},
          {"role": "assistant", "content": prefill}
        ]
    )
    return message.content[0].text

######################################## PROMPT ELEMENTS ########################################

##### Prompt element 1: `user` role
# Make sure that your Messages API call always starts with a `user` role in the messages array.
# The get_completion() function as defined above will automatically do this for you.

##### Prompt element 2: Task context
# Establishes expertise in geometric algorithms, music theory, and visualization
TASK_CONTEXT = """You are an expert in computational geometry, music theory, and interactive visualization development.
Your specialized knowledge includes:

- Tessellation algorithms and geometric space-filling patterns
- Musical theory, harmony, and frequency relationships
- Interactive audio-visual system design
- React component development following Alpha Protocol specifications
- Real-time geometric computation and rendering
- Audio-visual synchronization techniques

You excel at:
1. Creating geometric patterns that map to musical structures
2. Building responsive, performance-optimized visualizations
3. Designing intuitive interfaces for complex parameter spaces
4. Implementing real-time audio-visual feedback systems
5. Maintaining clean component architecture within strict constraints
"""

##### Prompt element 3: Tone context
# Balances mathematical precision with musical intuition
TONE_CONTEXT = """Maintain a clear and engaging tone that bridges mathematical and musical concepts:

Technical Precision:
- Use geometric terminology with visual context
- Explain musical concepts through spatial relationships
- Provide clear mathematical foundations for transformations

Artistic Understanding:
- Connect geometric forms to musical harmony
- Explain tonal relationships through visual patterns
- Demonstrate how shape influences sound

Implementation Focus:
- Document performance considerations thoroughly
- Explain architectural decisions clearly
- Provide implementation rationale that meets Alpha Protocol standards

All explanations should demonstrate both the mathematical rigor of geometric algorithms
and the intuitive beauty of musical relationships they generate.
"""

##### Prompt element 4: Input data
# Defines specific requirements for the harmonic tessellation system
with open("harmonic_tessellation.txt", "r") as f:
  INPUT_DATA = f.read()

##### Prompt element 5: Examples
# Demonstrates proper component structure and interaction patterns
EXAMPLES = """Here are examples of properly structured responses:

<example1>
<geometric_principles>
  <theorem>
    <statement>
      Regular tessellations of the Euclidean plane correspond to harmonic frequency ratios
      when mapped to a musical scale.
    </statement>
    <proof>
      <step>1. Regular tessellations occur at angles 2π/n where n is the number of tiles</step>
      <step>2. These angles map to frequency ratios in the harmonic series</step>
      <step>3. The resulting pattern creates both visual and auditory harmony</step>
    </proof>
  </theorem>

  <implementation>
  import React, { useState, useEffect, useCallback } from 'react';

  const COLORS = {
    background: '#f8f8f8',
    primary: '#2c3e50',
    accent: '#e74c3c',
    text: '#333333'
  };

  const SIZES = {
    containerWidth: '320px',
    containerHeight: '480px',
    controlHeight: '60px'
  };

  const HarmonicTessellation = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [complexity, setComplexity] = useState(6);
    
    const containerStyle = {
      width: SIZES.containerWidth,
      height: SIZES.containerHeight,
      backgroundColor: COLORS.background,
      position: 'relative',
      margin: '0 auto',
      overflow: 'hidden'
    };

    const controlStyle = {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: SIZES.controlHeight,
      backgroundColor: COLORS.primary,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    };

    return (
      <div style={containerStyle}>
        <svg 
          width="100%" 
          height={`calc(100% - ${SIZES.controlHeight})`}
          viewBox="0 0 320 420"
        >
          {/* Tessellation patterns */}
        </svg>
        <div style={controlStyle}>
          {/* Control interface */}
        </div>
      </div>
    );
  };

  export default HarmonicTessellation;
  </implementation>
</geometric_principles>

<complexity_analysis>
  <time_complexity>
    O(n²) for tessellation generation where n is the complexity factor
  </time_complexity>
  <space_complexity>
    O(n) for storing pattern vertices
  </space_complexity>
  <optimization_notes>
    - Use memoization for repeated patterns
    - Implement spatial partitioning for hit detection
    - Buffer audio generation for smooth playback
  </optimization_notes>
</complexity_analysis>
</example1>

<example2>
<interdisciplinary_connection>
The relationship between geometric tessellations and musical harmony emerges from 
fundamental mathematical principles. Regular polygons that can tile the plane create
angles that correspond to natural frequency ratios in the harmonic series. When these
geometric patterns are mapped to musical frequencies, they create a natural synthesis
of visual and auditory harmony.

Key relationships:
1. Vertex angles → Frequency ratios
2. Symmetry groups → Harmonic progressions
3. Pattern complexity → Tonal density
4. Spatial transformation → Pitch modulation

This synthesis creates an interactive space where geometric manipulation directly
influences musical output, creating an intuitive interface for exploring both
mathematical and musical principles.
</interdisciplinary_connection>
</example2>
"""

##### Prompt element 6: Task description
TASK_DESCRIPTION = f"""

Here is the previous response:
{INPUT_DATA}

Here are the issues that need to be addressed:

<implementation_gaps>
  <audio_system>
    - WebAudio API integration is missing
    - No frequency calculation logic
    - Lacking buffer management
    - Missing audio-visual sync
    - No audio error handling
  </audio_system>

  <geometric_engine>
    - Vertex calculation algorithms undefined
    - Missing transformation matrices
    - Pattern generation logic incomplete
    - No coordinate system management
    - Intersection handling absent
  </geometric_engine>

  <performance_optimization>
    - requestAnimationFrame implementation missing
    - No memory management strategy
    - SVG optimization undefined
    - Frame rate control absent
    - Performance monitoring lacking
  </performance_optimization>

  <state_management>
    - Audio state incomplete (AudioContext, oscillators, gains)
    - Geometric state missing (vertices, matrices, patterns)
    - Performance metrics absent
    - Error states undefined
    - Loading states not handled
  </state_management>

  <error_handling>
    - No error boundaries defined
    - Missing audio error recovery
    - Geometric calculation validation absent
    - Performance degradation handling missing
    - User feedback system incomplete
  </error_handling>

  <component_implementation>
    - TessellationRenderer component undefined
    - PlaybackControls missing
    - Gesture handling incomplete
    - Accessibility features absent
    - Keyboard shortcuts missing
  </component_implementation>
</implementation_gaps>

<specific_questions>
  <audio>
    - How is WebAudio initialized and managed?
    - What is the frequency calculation methodology?
    - How are audio buffers handled and scheduled?
    - What ensures audio-visual synchronization?
    - How are audio resources cleaned up?
  </audio>

  <geometry>
    - How are vertices calculated for each pattern type?
    - What is the matrix transformation process?
    - How are pattern intersections managed?
    - What coordinate system is used for SVG?
    - How is pattern complexity scaled?
  </geometry>

  <performance>
    - How is frame rate maintained at 60 FPS?
    - What memory management strategy is used?
    - How are SVG updates optimized?
    - What triggers garbage collection?
    - How is touch response kept under 100ms?
  </performance>
</specific_questions>

"""

##### Prompt element 7: Immediate task

##### Prompt element 8: Precognition
PRECOGNITION = """Before providing your response, please:

1. Geometric Analysis:
   - Identify suitable tessellation patterns
   - Define transformation rules
   - Plan pattern generation algorithm

2. Musical Mapping:
   - Define frequency relationship rules
   - Plan harmonic progression system
   - Design audio feedback mechanism

3. Technical Planning:
   - Verify Alpha Protocol compliance
   - Plan performance optimizations
   - Design component architecture

4. Interface Design:
   - Layout control arrangement
   - Define parameter ranges
   - Plan help system content

5. Webtastic Assessment:
   - Evaluate implementation against criteria
   - Identify rating improvements
   - Document assessment rationale

Only then proceed with your response."""

##### Prompt element 9: Output formatting
OUTPUT_FORMATTING = """

Please provide a complete implementation addressing these issues in the following XML format:

<complete_implementation>
  <audio_system>
    [Complete WebAudio implementation]
  </audio_system>

  <geometric_engine>
    [Complete geometric calculation system]
  </geometric_engine>

  <performance_optimization>
    [Complete optimization implementation]
  </performance_optimization>

  <state_management>
    [Complete state management system]
  </state_management>

  <error_handling>
    [Complete error handling system]
  </error_handling>

  <component_implementation>
    [Complete React component hierarchy]
  </component_implementation>
</complete_implementation>

"""

with open("harmonic_tessellations_output_take_2.txt", "r") as f:
    PREFILL = f.read()

######################################## COMBINE ELEMENTS ########################################

PROMPT = ""

if TASK_CONTEXT:
    PROMPT += f"""{TASK_CONTEXT}"""

if TONE_CONTEXT:
    PROMPT += f"""\n\n{TONE_CONTEXT}"""

if INPUT_DATA:
    PROMPT += f"""\n\n{INPUT_DATA}"""

if EXAMPLES:
    PROMPT += f"""\n\n{EXAMPLES}"""

if TASK_DESCRIPTION:
    PROMPT += f"""\n\n{TASK_DESCRIPTION}"""

if PRECOGNITION:
    PROMPT += f"""\n\n{PRECOGNITION}"""

if OUTPUT_FORMATTING:
    PROMPT += f"""\n\n{OUTPUT_FORMATTING}"""

# Print full prompt
print("--------------------------- Full prompt with variable substitutions ---------------------------")
print("USER TURN")
print(PROMPT)
print("\nASSISTANT TURN")
print(PREFILL)
print("\n------------------------------------- Claude's response -------------------------------------")
comp = get_completion(PROMPT, prefill=PREFILL)

with open("harmonic_tessellation_refined.txt", "a", encoding="utf-8") as f:
    f.write(comp)