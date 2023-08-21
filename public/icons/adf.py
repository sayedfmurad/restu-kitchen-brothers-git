import os
import PIL.Image

def resize_and_save_image(image_path, output_path, name, height, width):
    image = PIL.Image.open(image_path)
    image = image.resize((height, width))
    image.save(os.path.join(output_path, name))

p = {
    "favicon-16x16.png": {"height": 16, "width": 16},
    "apple-icon-144x144.png": {"height": 144, "width": 144},
    "android-icon-192x192.png": {"height": 192, "width": 192},
    "ms-icon-512x512.png": {"height": 512, "width": 512},
    "apple-icon-114x114.png": {"height": 114, "width": 114},
    "ms-icon-310x310.png": {"height": 310, "width": 310},
    "ms-icon-144x144.png": {"height": 144, "width": 144},
    "apple-icon-57x57.png": {"height": 57, "width": 57},
    "apple-icon-152x152.png": {"height": 152, "width": 152},
    "ms-icon-150x150.png": {"height": 150, "width": 150},
    "android-icon-72x72.png": {"height": 72, "width": 72},
    "android-icon-96x96.png": {"height": 96, "width": 96},
    "android-icon-36x36.png": {"height": 36, "width": 36},
    "apple-icon-180x180.png": {"height": 180, "width": 180},
    "favicon-96x96.png": {"height": 96, "width": 96},
    "android-icon-48x48.png": {"height": 48, "width": 48},
    "apple-icon-76x76.png": {"height": 76, "width": 76},
    "apple-icon-60x60.png": {"height": 60, "width": 60},
    "android-icon-144x144.png": {"height": 144, "width": 144},
    "apple-icon-72x72.png": {"height": 72, "width": 72},
    "apple-icon-120x120.png": {"height": 120, "width": 120},
    "favicon-32x32.png": {"height": 32, "width": 32},
    "ms-icon-70x70.png": {"height": 70, "width": 70}}
key="kitchen-brothers"
output_path = "./"+key+"/"
mfile="./t/"+key+".png"

for name, properties in p.items():
    resize_and_save_image(mfile, output_path, name, properties["height"], properties["width"])
