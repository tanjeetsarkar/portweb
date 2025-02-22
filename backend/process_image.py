import os
import json
from PIL import Image
import shutil


def process_image(file_path, dir_name_len=2):
    print(f"processing {file_path}")
    base, ext = os.path.splitext(file_path)
    large_file_name = f"{base}-large{ext}"
    os.rename(file_path, large_file_name)

    with Image.open(large_file_name) as img:
        original_format = img.format
        quality = 95  # Start with high quality

        while True:
            img.save(file_path, format=original_format, quality=quality)
            if os.path.getsize(file_path) <= 1 * 1024 * 1024 or quality <= 20:
                break
            quality -= 5

    small_file_name = f"{base}-small{ext}"
    with Image.open(file_path) as img:
        img_small = img.resize((20, 20))  # Small size to reduce file size
        img_small.save(
            small_file_name, format=original_format, quality=5
        )  # Low quality to minimize size

        # Ensure the size is ~300 bytes
        if os.path.getsize(small_file_name) > 300:
            img_small.save(small_file_name, format=original_format, quality=2)

    modified_path = os.path.join(*file_path.split(os.sep)[1:])
    return modified_path

def remove_spaces(src):
    for root, dirs, files in os.walk(src):
        for name in dirs + files:
            new_name = name.replace(" ", "_")
            os.rename(os.path.join(root, name), os.path.join(root, new_name))

def create_processed_directory(directory):
    if not os.path.exists(directory):
        raise FileNotFoundError(f"Source directory '{directory}' does not exist.")

    # Create the destination directory name
    dst_dir = directory.rstrip("/") + "-processed"

    # Ensure the destination directory does not already exist
    if os.path.exists(dst_dir):
        shutil.rmtree(dst_dir)
        print(f"Deleted existing directory '{dst_dir}'.")

    # Copy the contents of the source directory to the destination directory
    shutil.copytree(directory, dst_dir)
    print(f"Copied contents from '{directory}' to '{dst_dir}'.")
    remove_spaces(dst_dir)
    return dst_dir


def process_directory(directory, recursive):
    p_directory = create_processed_directory(directory)
    result = {}
    for root, dirs, files in os.walk(p_directory):
        if not recursive:
            dirs.clear()  # Do not recurse into subdirectories
        folder_name = os.path.basename(root)
        result[folder_name] = []
        for file in files:
            if file.lower().endswith(".jpeg") or file.lower().endswith(".jpg"):
                file_path = os.path.join(root, file)
                result[folder_name].append(process_image(file_path))
        if not recursive:
            break  # Only process the top directory if not recursive
    return result

def process_structured_directory(directory, recursive):
    p_directory = create_processed_directory(directory)
    result = []
    for root, dirs, files in os.walk(p_directory):
        if not recursive:
            dirs.clear()
        folder_name = os.path.basename(root)
        p_dict1 = {
            "caption": folder_name,
            "photos": []
        }
        if files:
            for file in files:
                if file.lower().endswith(".jpeg") or file.lower().endswith(".jpg"):
                    file_path = os.path.join(root, file)
                    dir_name_len = len(file_path.split(os.sep))
                    p_dict1["photos"].append(process_image(file_path, dir_name_len=dir_name_len))
            
            p_dict1['sourceImg'] = p_dict1["photos"][0]
            result.append(p_dict1)
        
        if not recursive:
            break
    
    return result


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Process JPEG images.")
    parser.add_argument("path", help="Path to the JPEG image or directory.")
    parser.add_argument(
        "-r",
        "--recursive",
        action="store_true",
        help="Recursively process directories.",
    )
    args = parser.parse_args()

    if os.path.isdir(args.path):
        result = process_structured_directory(args.path, args.recursive)
    else:
        result = {"": [process_image(args.path)]}

    with open("processed_struct.json", "w") as psfile:
        json.dump(result, psfile, indent=4)

    print("Image processing completed.")
