# How to Add Your Profile Image

## Steps to Add Your Profile Image:

1. **Save Your Image**:
   - Save your professional profile photo as `profile.jpg` in the `assets/images/` directory
   - The image should be in JPG or PNG format (JPG recommended for smaller file size)

2. **Image Requirements**:
   - **Resolution**: Minimum 800x800 pixels for best quality
   - **Aspect Ratio**: Square (1:1) or portrait (3:4) works best
   - **File Size**: Keep under 500KB for fast loading
   - **Format**: JPG (recommended) or PNG

3. **Image Optimization Tips**:
   - Use professional, high-quality photo
   - Ensure good lighting and clear facial features
   - Business casual or professional attire
   - Clean, neutral background preferred
   - Face should be centered and clearly visible

4. **Technical Details**:
   - The hero section displays the image in a 400px circular container (250px on mobile)
   - The about section displays the image in a 300x400px rounded rectangle (200x250px on mobile)
   - Images are automatically cropped to fit using CSS `object-fit: cover`
   - Lazy loading is enabled for better performance

5. **Fallback**:
   - If the image fails to load, a placeholder icon will be shown automatically
   - The website will still function perfectly without the image

## File Structure:
```
assets/
  images/
    profile.jpg  ← Your profile image goes here
    README.md    ← This instruction file
```

## Current Implementation:
- ✅ Hero section with circular profile image
- ✅ About section with rectangular profile image  
- ✅ Hover effects and animations
- ✅ Responsive design for mobile devices
- ✅ Fallback placeholder if image not found
- ✅ Optimized loading with lazy loading
- ✅ Professional styling with gradients and shadows

Simply replace the placeholder by saving your profile image as `profile.jpg` in the `assets/images/` directory!
