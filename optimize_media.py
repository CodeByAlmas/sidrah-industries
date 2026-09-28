import os
from PIL import Image

PUBLIC_DIR = "public"

def optimize_images():
    print("Starting image optimization...")
    total_saved = 0
    count = 0

    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                img_path = os.path.join(root, file)
                original_size = os.path.getsize(img_path)
                
                try:
                    img = Image.open(img_path)
                    
                    # Convert RGBA/P to RGB if saving as JPEG, but keep PNG transparency if needed
                    if file.lower().endswith(('.jpg', '.jpeg')) and img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    
                    # Resize very large images if width exceeds 1920px to save massive bandwidth
                    max_width = 1920
                    if img.width > max_width:
                        ratio = max_width / float(img.width)
                        new_height = int(float(img.height) * float(ratio))
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

                    # Save with optimization and reduced quality
                    if file.lower().endswith('.png'):
                        img.save(img_path, optimize=True, quality=80)
                    else:
                        img.save(img_path, "JPEG", optimize=True, quality=80)

                    new_size = os.path.getsize(img_path)
                    saved = original_size - new_size
                    if saved > 0:
                        total_saved += saved
                        count += 1
                        print(f"Optimized: {file} (Saved {saved / 1024:.1f} KB)")
                except Exception as e:
                    print(f"Failed to optimize {file}: {e}")

    print(f"\nSuccessfully optimized {count} images! Total space saved: {total_saved / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    optimize_images()