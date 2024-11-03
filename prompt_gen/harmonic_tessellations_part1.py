"""
harmonic tesselations - first pass

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
INPUT_DATA = """<alpha_protocol_constraints>
- Maximum width: 320px
- Maximum height: 480px
- Single file React component
- Inline styles only using style attribute
- No external dependencies
- Built-in state management
- SVG-based visualization
- Touch-optimized controls
- 60 FPS performance target
- 2-second maximum initialization
- 100ms touch response
- 100MB memory limit
</alpha_protocol_constraints>

<interface_requirements>
Core Controls:
- Play/Pause toggle for audio and animation
- Reset button for pattern regeneration
- Settings panel for parameters
- Help system with visual examples
- Parameter adjustment sliders

Parameter Controls:
- Tessellation complexity
- Harmonic scale selection
- Pattern rotation/transformation
- Audio feedback intensity
- Visual feedback sensitivity
</interface_requirements>

<webtastic_scale_targets>
Visual Impact (2W):
- Smooth geometric transitions
- Color harmony with sound mapping
- Responsive layout aesthetics

Interaction Design (2W):
- Intuitive pattern manipulation
- Real-time audio feedback
- Clear parameter relationships

Technical Implementation (1.5W):
- Efficient tessellation generation
- Optimized audio-visual sync
- Smooth mobile performance

Educational Value (1.5W):
- Clear geometric principles
- Obvious musical relationships
- Intuitive parameter effects

Innovation Factor (1W):
- Novel pattern generation
- Creative sound mapping
- Unique interaction methods

Total Target: 8W
</webtastic_scale_targets>
"""

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
TASK_DESCRIPTION = """Create a comprehensive audio-visual system for harmonic tessellations that:

1. Geometric Framework:
   - Generates regular and semi-regular tessellations
   - Maps geometric properties to musical parameters
   - Supports real-time pattern transformation

2. Musical Implementation:
   - Converts geometric properties to frequencies
   - Generates harmonic progressions from patterns
   - Provides real-time audio feedback

3. Visual System:
   - Renders tessellations using SVG
   - Implements smooth transitions
   - Provides interactive manipulation

4. Interface Requirements:
   - Implements all core controls
   - Provides parameter adjustment
   - Includes help system
   - Shows current state clearly

5. Documentation:
   - Explains geometric principles
   - Details musical mappings
   - Provides usage guidelines
   - Includes Webtastic scale assessment

Your implementation must:
- Follow Alpha Protocol constraints strictly
- Meet performance standards
- Achieve minimum 7W rating
- Provide clear educational value
"""

##### Prompt element 7: Immediate task
IMMEDIATE_TASK = """Using the above framework, create a complete implementation of 
a harmonic tessellation system that maps geometric patterns to musical spaces while
strictly adhering to Alpha Protocol specifications and targeting an 8W rating."""

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
OUTPUT_FORMATTING = """Format your response as follows:

<geometric_framework>
  <tessellation_principles>
    Mathematical foundations and pattern generation rules
  </tessellation_principles>
  
  <musical_mapping>
    Frequency relationships and harmonic structures
  </musical_mapping>
  
  <transformation_rules>
    Pattern manipulation and audio effects
  </transformation_rules>
</geometric_framework>

<implementation>
  <component_architecture>
    React component structure and relationships
  </component_architecture>
  
  <visualization_code>
    Complete implementation following Alpha Protocol
  </visualization_code>
  
  <interface_controls>
    Control system implementation
  </interface_controls>
</implementation>

<webtastic_assessment>
  <rating_justification>
    Detailed analysis of implementation against Webtastic criteria
  </rating_justification>
  
  <improvement_recommendations>
    Steps to enhance rating
  </improvement_recommendations>
</webtastic_assessment>

<performance_analysis>
  <optimization_strategies>
    Performance enhancement techniques
  </optimization_strategies>
  
  <limitation_handling>
    Managing technical constraints
  </limitation_handling>
</performance_analysis>
"""

##### Prompt element 10: Prefill
with open("harmonic_tessellation.txt", "r") as f:
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

if IMMEDIATE_TASK:
    PROMPT += f"""\n\n{IMMEDIATE_TASK}"""

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
print(get_completion(PROMPT, prefill=PREFILL))

with open("harmonic_tessellation.txt", "a", encoding="utf-8") as f:
    f.write(get_completion(PROMPT, prefill=PREFILL))