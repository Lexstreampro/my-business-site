# Services Layout Fixer

Fix overlapping service card layouts by restructuring into clearly separated stacks (text on top, image below on mobile).

## Problem
Service sections with alternating left/right image placement can appear to overlap or visually stack incorrectly on different breakpoints, making it hard to distinguish where one service ends and another begins.

## Solution
Restructure each service section to:
- Put text content in a top block
- Put images in a separate block below
- Use consistent spacing (`space-y-20 lg:space-y-24`)
- Stack vertically on mobile, full-width on all breakpoints
- No grid alternation (avoids layout confusion)

## Pattern

**Before:**
```html
<div class="mb-16 lg:mb-20">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div class="rounded-lg h-64 lg:h-80">
      <img src="...">
    </div>
    <div>
      <!-- text content -->
    </div>
  </div>
</div>
```

**After:**
```html
<div>
  <!-- Text block -->
  <div>
    <div class="w-14 h-14 rounded flex items-center justify-center mb-6">
      <!-- icon -->
    </div>
    <h2>Service Title</h2>
    <p>Description...</p>
    <ul><!-- items --></ul>
    <a href="..." class="mb-12">CTA Button</a>
  </div>
  
  <!-- Image block (separate, below text) -->
  <div class="rounded-lg overflow-hidden h-64 lg:h-80">
    <img src="..." alt="...">
  </div>
</div>
```

## Key Changes
1. Remove grid structure (no `grid grid-cols-2`)
2. Move text into first div block (full width)
3. Move image into separate div block below
4. Add `mb-12` to CTA button to create vertical spacing
5. Add `mb-8 lg:mb-0` to text block if needed for rhythm
6. Wrap entire service in single outer div

## Spacing
- Parent container: `space-y-20 lg:space-y-24` (for spacing between services)
- CTA button: add `mb-12` to create space before image
- Image container: `h-64 lg:h-80` (consistent heights)

## Verification
After restructuring:
- ✅ Take screenshots at 390px, 768px, 1440px
- ✅ Text and image never overlap
- ✅ Services clearly separated vertically
- ✅ Each service gets exactly 1 image (except special cases like Brakes & Pads)
- ✅ No doubling of images across sections

## When to Use This Skill
- Rebuilding service detail pages
- Adding new service sections
- Fixing layout regression where images appear in multiple places
- Creating service pages for other websites with similar structure

## Special Cases
- **Brakes & Pads (2 images)**: Use a sub-grid after the text block:
  ```html
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    <div class="rounded-lg h-64 lg:h-80"><img src="01-a.png"></div>
    <div class="rounded-lg h-64 lg:h-80"><img src="01-b.jpg"></div>
  </div>
  ```
- All other services: Single image only (no grid)

## Performance Notes
- Ensures clean responsive behavior (no hidden overflow issues)
- Mobile-first layout (single column stacks naturally)
- No negative impacts on performance
