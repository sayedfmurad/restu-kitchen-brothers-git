import os
from PIL import Image

# Directory containing the images
directory = "./public/Images/sections"

# Output directory for resized images
output_directory = "./public/Images/sectionss"

# Create the output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Loop through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
        # Open the image file
        image_path = os.path.join(directory, filename)
        image = Image.open(image_path)

        # Get the original dimensions
        width, height = image.size

        # Calculate the new dimensions (50% reduction)
        new_width = int(width * 0.8)
        new_height = int(height * 0.8)

        # Resize the image
        resized_image = image.resize((new_width, new_height))

        # Save the resized image to the output directory
        output_path = os.path.join(output_directory, "resized_" + filename)
        resized_image.save(output_path)
