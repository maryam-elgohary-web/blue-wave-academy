---
name: Aquatic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#414751'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ab'
  primary: '#005396'
  on-primary: '#ffffff'
  primary-container: '#0f6cbd'
  on-primary-container: '#e3ecff'
  inverse-primary: '#a3c9ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#40c2fd'
  on-secondary-container: '#004d6a'
  tertiary: '#00587c'
  on-tertiary: '#ffffff'
  tertiary-container: '#00729e'
  on-tertiary-container: '#daefff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e3ff'
  primary-fixed-dim: '#a3c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#c6e7ff'
  tertiary-fixed-dim: '#82cfff'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6b'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style
The design system is anchored in high-end athleticism and technical mastery. It targets an affluent demographic seeking professional-grade instruction within a serene, high-performance environment. 

The aesthetic is **Refined Minimalism with Glassmorphic accents**, drawing inspiration from the precision of modern productivity tools and the airy clarity of premium consumer electronics. The UI should evoke a sense of calm authority, utilizing expansive white space to suggest the openness of water and the focus of a private lane. Visual elements are reduced to their core utility to maintain a clutter-free, luxurious experience that feels both breathable and technologically advanced.

## Colors
The palette leverages a monochromatic blue spectrum to reinforce brand identity while maintaining a professional "cold" aesthetic.

- **Primary Blue (#0F6CBD):** Used for primary actions, navigation headers, and authoritative text elements. It represents the depth and discipline of the academy.
- **Secondary/Accent Blues (#38BDF8, #00AEEF):** Reserved for interactive feedback, progress indicators, and subtle gradients. These hues inject a "fresh water" vitality into the interface.
- **Surface Palette:** The background is a crisp ice-blue (#F8FBFE) to provide more depth than pure white, while surfaces (#FFFFFF) use subtle elevation to separate content.
- **Typography:** Deep charcoal (#1F2937) is used instead of pure black to maintain a softer, high-end editorial feel.

## Typography
This design system utilizes **Inter** exclusively to ensure a systematic, utilitarian, yet modern appearance. 

- **Hierarchy:** Dramatic scale shifts between display headers and body text create a rhythmic, editorial flow. 
- **Tracking:** Headings use slight negative letter-spacing (-0.01em to -0.02em) to appear tighter and more "designed." Labels use increased tracking for legibility at small sizes.
- **Readability:** Body text is set with generous line heights (1.5x - 1.6x) to facilitate scanning and emphasize the premium, spacious feel.

## Layout & Spacing
The spacing philosophy follows a strict **8px grid system** to ensure mathematical harmony. 

- **Desktop Layout:** A 12-column fluid grid within a 1200px max-width container. Large vertical sections are separated by `xl` (80px) spacing to prevent visual crowding.
- **Mobile Layout:** A 4-column grid with 20px side margins. Horizontal padding on components is prioritized to create a "card-inset" look.
- **Density:** The system prioritizes "Low Density." Elements are given significant breathing room to reflect the premium nature of the academy. No two sections should feel "cramped."

## Elevation & Depth
Depth is communicated through a combination of **Ambient Shadows** and **Glassmorphic Overlays**.

- **Surface Tiers:** Background (#F8FBFE) is the lowest level. Primary cards (#FFFFFF) sit on top with a subtle 1px border (#E5E7EB) and a soft, highly diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
- **Glassmorphism:** Modal overlays and navigation bars use a backdrop blur (12px to 20px) with a semi-transparent white fill (rgba(255, 255, 255, 0.8)). This maintains context and adds a layer of "digital luxury."
- **Interactive Depth:** On hover, cards should lift slightly with a more pronounced shadow (0px 10px 30px rgba(15, 108, 189, 0.08)), shifting the tint toward the primary blue.

## Shapes
The shape language is modern and approachable without being juvenile. 

- **Corner Radius:** Standard components (buttons, inputs) utilize a **12px** (rounded-md) radius. Larger containers like cards and image blocks utilize a **16px to 24px** (rounded-lg/xl) radius.
- **Icons:** Use thin-stroke (1.5pt) outlined icons. Avoid filled icons unless used as an active state. 
- **Dividers:** When necessary, use 1px hairlines with a very low-contrast tint of the primary blue (rgba(15, 108, 189, 0.1)).

## Components

- **Buttons:** 
  - *Primary:* Soft linear gradient from #0F6CBD to #00AEEF. White text. Subtle inner glow on top edge.
  - *Secondary:* Ghost style with a 1px border (#0F6CBD) and transparent background.
- **Input Fields:** 
  - Background: #FFFFFF. 
  - Border: 1.5px solid #E5E7EB. 
  - Focus state: Border transitions to #38BDF8 with a 4px soft glow (outer shadow).
- **Chips/Badges:** 
  - Used for "Level" or "Class Type." 
  - Design: Semi-transparent background of the primary color (10% opacity) with high-contrast text. Pill-shaped.
- **Cards:** 
  - Feature a "Glass" header if they contain imagery. 
  - 16px corner radius. 
  - Transition: 300ms ease-out on all hover states.
- **Lists:** 
  - High-padding items (16px vertical). 
  - Separated by soft hairlines. 
  - Chevron-right icons for navigability are mandatory for list items.
- **Navigation:** 
  - Fixed top bar with `backdrop-filter: blur(20px)`. 
  - Understated links that use a 2px bottom border on active/hover states.