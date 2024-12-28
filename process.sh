#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <your_directory>"
    exit 1
fi

# Set variables
SOURCE_DIR=$1
BACKEND_DIR="backend"
PROCESSED_DIR="${SOURCE_DIR}-processed"
FRONTEND_DIR="frontend"
PROCESSED_STRUCT_FILE="processed_struct.json"

# Step 1: Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' does not exist."
    exit 1
fi

# Copy your organised photos folder into backend directory
cp -r "$SOURCE_DIR" "$BACKEND_DIR/"

# Step 2: Run the Python script to process images
python3 "$BACKEND_DIR/process_image.py" -r "$SOURCE_DIR"
if [ $? -ne 0 ]; then
    echo "Error: Failed to process images with 'process_image.py'."
    exit 1
fi

# Step 3: Check if tts.svg exists
if [ ! -f "$BACKEND_DIR/tts.svg" ]; then
    echo "Error: 'tts.svg' file not found."
    exit 1
fi

# Copy tts.svg to the processed directory
cp "$BACKEND_DIR/tts.svg" "$PROCESSED_DIR/"
if [ $? -ne 0 ]; then
    echo "Error: Failed to copy 'tts.svg' to '$PROCESSED_DIR'."
    exit 1
fi

# Step 4: Copy the processed directory to frontend
cp -r "$PROCESSED_DIR" "$FRONTEND_DIR/"
if [ $? -ne 0 ]; then
    echo "Error: Failed to copy '$PROCESSED_DIR' to '$FRONTEND_DIR'."
    exit 1
fi

# Step 5: Check if processed_struct.json exists
if [ ! -f "$PROCESSED_STRUCT_FILE" ]; then
    echo "Error: '$PROCESSED_STRUCT_FILE' file not found."
    exit 1
fi

# Copy the processed_struct.json to frontend/src/data
mv "$PROCESSED_STRUCT_FILE" "$FRONTEND_DIR/src/data/"
if [ $? -ne 0 ]; then
    echo "Error: Failed to copy '$PROCESSED_STRUCT_FILE' to '$FRONTEND_DIR/src/data'."
    exit 1
fi

# Step 6: Remove the existing frontend/public directory
rm -rf "$FRONTEND_DIR/public"
if [ $? -ne 0 ]; then
    echo "Error: Failed to remove '$FRONTEND_DIR/public'."
    exit 1
fi


# Step 7: Rename the processed directory in frontend to public
mv "$FRONTEND_DIR/$(basename "$PROCESSED_DIR")" "$FRONTEND_DIR/public"
if [ $? -ne 0 ]; then
    echo "Error: Failed to rename "$FRONTEND_DIR/$(basename "$PROCESSED_DIR")" to '$FRONTEND_DIR/public'."
    exit 1
fi

echo "Process completed successfully."