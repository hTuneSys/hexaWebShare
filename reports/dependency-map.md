<!--
SPDX-FileCopyrightText: 2025 hexaTune LLC
SPDX-License-Identifier: MIT
-->

# hexaWebShare - Component Dependency Map

**Session:** 01  
**Generated:** 2026-02-01  
**Status:** Partial analysis complete (36/117 components)

---

## Dependency Analysis Methodology

Components are classified into levels based on their dependencies:

- **Level 0 (Primitives):** No library component dependencies (only raw HTML + DaisyUI)
- **Level 1 (Basic Composites):** Depend only on Level 0 components
- **Level 2+ (Complex Composites):** Depend on Level 1+ components

---

## Expected Primitive Components (Level 0)

According to AGENTS.md:206-216, these should be Level 0:

### core/buttons/
- Button.svelte
- IconButton.svelte

### core/forms/
- Input.svelte
- Checkbox.svelte
- Select.svelte
- Textarea.svelte
- Toggle.svelte
- Switch.svelte
- Slider.svelte
- RadioGroup.svelte

### core/typography/
- Text.svelte
- Heading.svelte
- Paragraph.svelte
- Lead.svelte
- Link.svelte
- MutedText.svelte

### core/media/
- Icon.svelte
- Badge.svelte
- Avatar.svelte
- Chip.svelte
- Tag.svelte
- Pill.svelte
- Tooltip.svelte

---

## Expected Composite Components (Level 1+)

According to AGENTS.md:206-216, these should use library components:

### core/layout/
- All components (Card, Container, Grid, Row, Col, etc.)

### core/overlay-navigation/
- All components (Menu, Modal, Drawer, Sidebar, etc.)

### core/data-display/
- All components (List, Table, EmptyState, etc.)

### core/feedback/
- All components (Alert, Toast, Notification, etc.)

### admin/* (all categories)
- All admin components must be composite

---

## Actual Dependency Tree

### Level 0 (Primitives - No Dependencies) ✅

**Clean Primitive Components (11 total):**

#### core/buttons/
1. **Button.svelte** - No library imports ✅

#### core/forms/
2. **Form.svelte** - No library imports ✅

#### core/typography/
3. **Heading.svelte** - No library imports ✅
4. **Lead.svelte** - No library imports ✅
5. **MutedText.svelte** - No library imports ✅
6. **Paragraph.svelte** - No library imports ✅
7. **Text.svelte** - No library imports ✅

#### core/media/
8. **Badge.svelte** - No library imports ✅
9. **Icon.svelte** - No library imports ✅
10. **Pill.svelte** - No library imports ✅
11. **Tooltip.svelte** - No library imports ✅

---

### Level 1 (Basic Composites) ✅

**Components correctly using ONE library component:**

#### core/buttons/
1. **IconButton.svelte** - Imports: Spinner ⚠️ MISCLASSIFIED (should be primitive)
2. **ButtonGroup.svelte** - No imports (structural container)
3. **SegmentedControl.svelte** - Imports: Button ✅ CORRECT
4. **ToggleButton.svelte** - Imports: Button ✅ CORRECT

#### core/typography/
5. **Link.svelte** - Imports: Icon ⚠️ MISCLASSIFIED (should be primitive)

#### core/media/
6. **Avatar.svelte** - Imports: Text ⚠️ MISCLASSIFIED (should be primitive)
7. **Chip.svelte** - Imports: IconButton ⚠️ MISCLASSIFIED (should be primitive)

---

### Level 2+ (Complex Composites) ⚠️

**Components with multiple library dependencies:**

#### core/forms/ (ALL MISCLASSIFIED - should be primitives)
1. **Input.svelte** - Imports: Label, Spinner, Text
2. **Checkbox.svelte** - Imports: Text
3. **Select.svelte** - Imports: Label, Text, Spinner
4. **Textarea.svelte** - Imports: Label, Text
5. **Toggle.svelte** - Imports: Label, Text
6. **Switch.svelte** - Imports: Label, Text
7. **RadioGroup.svelte** - Imports: Label, Text
8. **Slider.svelte** - Imports: Label, Text
9. **RangeSlider.svelte** - Imports: Label, Text
10. **DatePicker.svelte** - Imports: Label, Input, Text
11. **DateRangePicker.svelte** - Imports: Label, Input, Text
12. **TimePicker.svelte** - Imports: Label, Input, Text
13. **FileUpload.svelte** - Imports: Label, Text, Button
14. **MultiSelect.svelte** - Imports: Label, Text, Badge
15. **NumberInput.svelte** - Imports: Label, Input, Text
16. **SearchInput.svelte** - Imports: Label, Input, Text
17. **FormWrapper.svelte** - Imports: Label, Text

#### core/media/
18. **Tag.svelte** - Imports: IconButton, Spinner ⚠️ MISCLASSIFIED

---

### Remaining Categories (Not Yet Analyzed)
- core/layout/ (11) - Expected to be Level 1+ composites
- core/data-display/ (13) - Expected to be Level 1+ composites
- core/feedback/ (8) - Expected to be Level 1+ composites
- core/overlay-navigation/ (15) - Expected to be Level 2+ composites
- admin/* (29) - Expected to be Level 2+ composites

---

## Circular Dependency Warnings

⚠️ **Potential Circular Dependency Risks Identified:**

1. **forms → typography → media → buttons → feedback → forms**
   - Input imports Text
   - Link imports Icon  
   - Chip/Tag import IconButton
   - IconButton imports Spinner
   - Risk: If Spinner ever imports form components, circular dependency

2. **Cross-Primitive Dependencies**
   - Typography (Link) → Media (Icon)
   - Media (Avatar, Chip, Tag) → Typography (Text) and Buttons (IconButton)
   - Forms → Typography (Text, Label), Feedback (Spinner), Media (Badge)
   
   **Impact:** Changes in one primitive category ripple across others.

**Status:** No actual circular dependencies detected yet, but architecture creates risk.

---

## Misclassified Components

Components that are in the wrong category based on their dependencies:

### ⚠️ Critical Misclassifications (21 components)

All these components are located in "primitive" categories (buttons/, forms/, typography/, media/) but import library components, violating AGENTS.md:206-216.

#### Primitive Categories Importing Library Components:

**core/buttons/** (1/5)
1. **IconButton.svelte** - Should be primitive, imports Spinner

**core/forms/** (17/18) - SYSTEMIC ISSUE
2. Input.svelte
3. Checkbox.svelte
4. Select.svelte
5. Textarea.svelte
6. Toggle.svelte
7. Switch.svelte
8. RadioGroup.svelte
9. Slider.svelte
10. RangeSlider.svelte
11. DatePicker.svelte
12. DateRangePicker.svelte
13. TimePicker.svelte
14. FileUpload.svelte
15. MultiSelect.svelte
16. NumberInput.svelte
17. SearchInput.svelte
18. FormWrapper.svelte

**core/typography/** (1/6)
19. **Link.svelte** - Should be primitive, imports Icon

**core/media/** (3/7)
20. **Avatar.svelte** - Should be primitive, imports Text
21. **Chip.svelte** - Should be primitive, imports IconButton
22. **Tag.svelte** - Should be primitive, imports IconButton + Spinner

### Analysis
**58% of analyzed primitive components** are misclassified. This is not an implementation bug but an architectural mismatch between AGENTS.md rules and practical component design needs.

**Recommendation:** See session-01-findings.md for detailed recommendations.

---

**Status:** Dependency analysis will be updated as each component is processed.
