import os
import json
from PIL import Image, ImageFilter
import shutil


def process_image(file_path):
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

    modified_paths = []
    for _path in [file_path, small_file_name, large_file_name]:
        modified_path = os.path.join(*_path.split(os.sep)[1:])
        modified_paths.append(modified_path)
        print(f"modified base path {modified_path}")
    file_path, small_file_name, large_file_name = modified_paths
    return [file_path, small_file_name, large_file_name]


def create_processed_directory(directory):
    if not os.path.exists(directory):
        raise FileNotFoundError(f"Source directory '{directory}' does not exist.")

    # Create the destination directory name
    dst_dir = directory.rstrip("/") + "-processed"

    # Ensure the destination directory does not already exist
    if os.path.exists(dst_dir):
        raise FileExistsError(f"Destination directory '{dst_dir}' already exists.")

    # Copy the contents of the source directory to the destination directory
    shutil.copytree(directory, dst_dir)
    print(f"Copied contents from '{directory}' to '{dst_dir}'.")

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
        result = process_directory(args.path, args.recursive)
    else:
        result = {"": [process_image(args.path)]}

    with open("processed_struct.json", "w") as psfile:
        json.dump(result, psfile, indent=4)

    print("Image processing completed.")
