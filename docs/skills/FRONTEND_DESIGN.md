# Frontend Design Skill

## Overview
This skill guides the creation of high-quality frontend designs that are visually cohesive, accessible, and aligned with modern design principles.

## Core Principles

### 1. Visual Hierarchy
- Use size, weight, color, and spacing to establish clear hierarchy
- Primary actions should be most prominent
- Secondary actions and supporting information should be visually subordinate
- Use contrast effectively to draw attention

### 2. Consistency
- Maintain a unified design system across all pages and components
- Use a consistent color palette, typography scale, and spacing rhythm
- Document all tokens (colors, spacing, typography) in a centralized location
- Apply the same patterns for similar interactions

### 3. Spacing & Layout
- Use a consistent spacing scale (e.g., 4px, 8px, 12px, 16px, 24px, 32px)
- Establish clear relationships between elements through proximity
- Create breathing room around content
- Use whitespace strategically to reduce cognitive load

### 4. Typography
- Use 2-3 font families maximum (typically 1 serif + 1 sans-serif)
- Establish a clear type scale with distinct hierarchy levels
- Maintain adequate line-height (1.5-1.6 for body text)
- Use font-weight strategically to create emphasis

### 5. Color
- Build a limited, intentional color palette (typically 5-7 primary colors)
- Use semantic colors (primary, secondary, success, warning, error)
- Ensure sufficient contrast ratios (WCAG AA minimum 4.5:1 for text)
- Test colors for color-blindness accessibility

### 6. Component Design
- Design components at multiple states (default, hover, active, disabled, loading)
- Maintain consistency between similar components
- Create reusable component patterns
- Document component variants and usage

### 7. Responsive Design
- Design mobile-first, then enhance for larger screens
- Use flexible layouts (flexbox, grid) rather than fixed widths
- Test touch targets (minimum 44x44px for interactive elements)
- Optimize readability on all screen sizes

### 8. Accessibility
- Ensure semantic HTML structure
- Provide sufficient color contrast
- Make interactive elements keyboard accessible
- Include focus states and visual feedback
- Test with screen readers and keyboard navigation

### 9. Micro-interactions
- Provide subtle feedback for user actions (hover, click, focus)
- Use transitions to guide attention (keep animations under 300ms typically)
- Ensure animations serve a purpose, not just decoration
- Maintain performance (60fps animations)

### 10. Visual Polish
- Add subtle shadows and depth for hierarchy
- Use consistent border-radius for rounded elements
- Pay attention to details like icon sizing and alignment
- Create a cohesive visual language across all sections

## Implementation Checklist

- [ ] Define color palette with semantic meaning
- [ ] Establish typography scale (H1-H6, body, small)
- [ ] Create spacing scale for consistent margins/padding
- [ ] Design component library with multiple states
- [ ] Implement focus states for accessibility
- [ ] Test contrast ratios for WCAG compliance
- [ ] Create hover and active states for interactive elements
- [ ] Document all design tokens
- [ ] Audit for consistency across all pages
- [ ] Test on multiple screen sizes and devices
- [ ] Validate keyboard navigation
- [ ] Get design feedback from stakeholders

## Design System Tokens

### Colors
- Keep a semantic color system
- Primary, Secondary, Success, Warning, Error, Info
- Neutral grays for text and backgrounds

### Spacing
- Use incremental scale: 4, 8, 12, 16, 24, 32, 48, 64px

### Typography
- H1-H6 for headings with distinct sizes
- Body text at 16px minimum for readability
- Consistent line-height (1.5-1.6)

### Shadows & Depth
- Subtle shadows for elevation
- Consistent z-index structure

## Testing & Validation

- Visual regression testing
- Accessibility audit (WCAG 2.1 AA minimum)
- Cross-browser testing
- Mobile and responsive testing
- Performance optimization (images, animations)
- User testing and feedback
