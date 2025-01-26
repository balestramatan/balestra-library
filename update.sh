#!/bin/bash

# Function to update the version in package.json
update_version() {
    # Extract the current version from package.json
    current_version=$(grep '"version":' package.json | awk -F '"' '{print $4}')
    echo "Current version: $current_version"

    # Prompt user for the version bump type
    echo "Select version bump type:"
    echo "1) Major (X.0.0)"
    echo "2) Minor (0.X.0)"
    echo "3) Patch (0.0.X)"
    read -p "Enter your choice (1/2/3): " choice

    # Split the current version into major, minor, and patch
    IFS='.' read -r major minor patch <<< "$current_version"

    # Increment the appropriate version number
    case $choice in
        1) major=$((major + 1)); minor=0; patch=0 ;;
        2) minor=$((minor + 1)); patch=0 ;;
        3) patch=$((patch + 1)) ;;
        *) echo "Invalid choice. Exiting."; exit 1 ;;
    esac

    new_version="$major.$minor.$patch"

    # Update the version in package.json
    sed -i.bak "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json
    echo "Updated version from $current_version to $new_version in package.json"
}

# Run the update_version function
update_version

# Run update_to_git.sh
if [ -f "./push_to_git.sh" ]; then
    echo "Running update_to_git.sh..."
    ./push_to_git.sh "Updated to version $new_version"
else
    echo "Error: update_to_git.sh not found!"
    exit 1
fi

# Run update_to_npm.sh
if [ -f "./publish_to_npm.sh" ]; then
    echo "Running update_to_npm.sh..."
    ./publish_to_npm.sh
else
    echo "Error: update_to_npm.sh not found!"
    exit 1
fi

echo "Update process completed successfully!"
