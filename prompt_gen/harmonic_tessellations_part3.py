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
with open("data/harmonic_tessellations_need_modularized_components.md", "r") as f:
  INPUT_DATA = f.read()

##### Prompt element 5: Examples
# Demonstrates proper component structure and interaction patterns
EXAMPLES = ""

##### Prompt element 6: Task description
TASK_DESCRIPTION = f"""

Here is the chat history for developing react projects and components based on some specification documents.
{INPUT_DATA}
from this chat history, we are looking to generate the remaining component files for the harmonic tessellation system.  This includes managers.js and controls.js

"""

##### Prompt element 7: Immediate task

##### Prompt element 8: Precognition
PRECOGNITION = """Before providing your response, please:

1.  Relevant quotes:
  - Review the chat history line by line and store in xml tags all of the data related to harmonic tessellelation 
  - ensure that it exhaustively determines the requirements of the remaining components.

Only then proceed with your response."""

##### Prompt element 9: Output formatting
OUTPUT_FORMATTING = """

Please provide a complete implementation of the remaining two components in react js:



"""
PREFILL = ""
# with open("harmonic_tessellations_output_take_2.txt", "r") as f:
#     PREFILL = f.read()

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
print(comp)
with open("harmonic_tessellation_ui_components_and_managers.txt", "a", encoding="utf-8") as f:
    f.write(comp)