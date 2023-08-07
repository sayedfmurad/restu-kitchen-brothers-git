import os
import PIL.Image

def replace_pngs(root_dir, t_file_path):
  """Replaces all PNG files in the root directory with the file at the specified t_file_path."""
  t_image = PIL.Image.open(t_file_path)
  t_height, t_width = t_image.height, t_image.width

  for file_name in os.listdir(root_dir):
    if file_name.endswith('.png'):
      file_path = os.path.join(root_dir, file_name)
      image = PIL.Image.open(file_path)
      if image.height == t_height and image.width == t_width:
        image.close()
        os.remove(file_path)
        shutil.copy(t_file_path, file_path)

def main():
  root_dir = '.'
  t_file_path = './t/3.png'
  replace_pngs(root_dir, t_file_path)

if __name__ == '__main__':
  main()
