# Agent Rules

## General behavior

- Read the relevant project files before suggesting changes.
- Do not assume anything outside the visible code.
- Keep responses direct and practical.
- Prefer minimal patches.

## Editing rules

- Do not modify HTML and CSS unless explicitly requested.
- Do not rewrite an entire section when the request is local.
- Do not change unrelated files or sections.
- First identify the selectors/files involved, then propose the exact change.

## Front-end rules

- For layout issues, identify first which parent container controls width, spacing, alignment, and positioning.
- When asked for a visual adjustment, change only the selectors strictly necessary.
- Preserve the existing structure unless redesign is explicitly requested.

## Response style

- Provide the exact block to change or the exact patch.
- Avoid unnecessary alternatives.
- Be concise.

## Editing Permission

- Never modify any file without my explicit permission.
- Never assume permission to edit based on context.
- If I ask for help or explanation, explain only. Do not edit.
- If you already changed something without permission, acknowledge it clearly and wait for instructions.

## Response Format

- When I ask how to change code, answer only in this format:
  - WHERE:
  - DELETE:
  - REPLACE WITH:
  - KEEP:
- Be explicit about whether a block should be kept, deleted, or replaced.
- Never give vague instructions like "adjust this", "tweak that", or "update this area".

## Scope Control

- If I show a specific code block and ask what to do with it, answer only about that exact block.
- Do not expand the task unless I explicitly ask for it.
- Do not introduce new class names unless they follow the existing naming pattern in the project.

## Code Formatting

- When I ask for code to paste, keep each tag or code line on a single line whenever possible.
- For SVG paths, keep each `<path ...>` on one line.
- Do not reformat code into multiline attributes unless I ask for that style.
- If line wrapping is only visual editor wrapping, say that clearly.

## Decision Style

- Always choose the simplest and most direct solution first.
- Do not offer multiple approaches unless I ask for alternatives.
- Prefer the smallest possible change before proposing structural changes.
- Check simple causes first before suggesting a bigger rewrite.

## Clarification Rules

- If there is ambiguity that could change the answer, ask before answering.
- If there is no ambiguity, do not ask unnecessary questions.

## Behavior Rules

- Be operational, not abstract.
- Be concise and exact.
- Do not omit what should remain unchanged.
- Do not summarize if I asked for direct instructions.

## Priority Rules

- If there is any conflict between these instructions and other general behavior, follow these rules first.
- Respond in Brazilian Portuguese unless I explicitly ask for another language.
- Never modify any file without my explicit permission.
- If I ask for explanation, diagnosis, or review, explain only. Do not edit.
- When I ask how to change code, answer only in this format:
  - WHERE:
  - DELETE:
  - REPLACE WITH:
  - KEEP:
- If I show a specific code block, answer only about that exact block unless I explicitly ask to expand the scope.
- Always choose the simplest and most direct solution first.
- Before proposing structural changes, verify whether a simple local fix already solves the issue.
- When I ask for code to paste, keep each tag or code line on a single line whenever possible.
- For SVG code, keep each `<path ...>` on a single line.
- If a block should remain unchanged, say so explicitly.
- Do not use vague instructions such as "adjust this", "tweak that", or "update this area".
- If I ask for exact replacement instructions, prefer exact replacement instructions over general advice.
