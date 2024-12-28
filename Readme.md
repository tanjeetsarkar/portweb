# Trip The Shutter

This project is a portfolio website that showcases organized photos. The photos are processed and displayed in different sections such as birds, products, street, wild_life, and misc.

## Organizing Photos

To organize your photos, create a directory structure similar to the following:
photos/ birds/ IMG-20230720-WA0005.jpg IMG-20230720-WA0006.jpg ... products/ _DSC0041.jpg signal-2024-09-20-17-02-58-118.jpg ... street/ _DSC4740.jpg _DSC5495(1).jpg ... wild_life/ IMG-20230720-WA0017.jpg IMG-20230813-WA0002.jpg ... misc/ _DSC4484.jpeg _DSC4483.jpeg ...


## Processing Photos

To process the photos and prepare them for the frontend, use the `process.sh` script. This script will:

1. Check if the source directory exists.
2. Copy the organized photos folder into the backend directory.
3. Run the Python script to process images.
4. Check if `tts.svg` exists and copy it to the processed directory.
5. Copy the processed directory to the frontend.
6. Check if `processed_struct.json` exists and move it to the frontend's `src/data` directory.
7. Remove the existing `frontend/public` directory.
8. Rename the processed directory in the frontend to `public`.

### Usage

Run the `process.sh` script with the path to your organized photos directory:

```sh
./process.sh photos
```

## Pushing to Git and Creating a Pull Request

After processing the photos, you can push the changes to your Git repository and create a pull request. Follow these steps:
1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/tanjeetsarkar/portweb.git
    ```

2. Navigate to your project directory:
    ```sh
    cd /home/voldemort/work/portweb
    ```

3. Create a new branch for your changes:
    ```sh
    git checkout -b <new-branch-name>
    ```

4. Add the changes to the staging area:
    ```sh
    git add .
    ```

5. Commit the changes with a descriptive message:
    ```sh
    git commit -m "Processed photos and updated frontend"
    ```

6. Push the changes to your remote repository:
    ```sh
    git push origin <new-branch-name>
    ```

7. Create a pull request on GitHub by navigating to your repository and following these steps:
    - Go to the "Pull requests" tab.
    - Click on the "New pull request" button.
    - Select the branch you pushed your changes to and compare it with the base branch.
    - Add a title and description for your pull request.
    - Click on the "Create pull request" button.

Make sure to review the changes and request reviews from your team members before merging the pull request.
