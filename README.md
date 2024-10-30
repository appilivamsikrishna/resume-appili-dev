
# CDN Project

This project is a Content Delivery Network (CDN) interface built with Angular. It enables users to upload, view, and manage files (images, videos, and general files) through an intuitive UI. Uploaded files are stored in Firebase, and their metadata is managed in MongoDB via an Express API backend.

## Table of Contents
- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## Project Overview
The CDN interface is designed to simplify the management of files uploaded to a content delivery network. It allows users to select files, view file details, upload files to Firebase, and manage them through categorized lists for easy access and retrieval.

## Core Features
1. **File Selection and Display**:
   - Allows users to select multiple files at once.
   - Displays selected file details immediately (name, type, size).
   - Dynamically adjusts the button text based on selection (e.g., "Upload File" or "Upload All Files").

2. **File Upload**:
   - Files are uploaded to Firebase, generating public URLs for each.
   - Metadata (file name, type, size, and URL) is stored in MongoDB via the backend API.

3. **File Management**:
   - Categorizes files into images, videos, and general files.
   - Separate Angular components (`ImagesComponent`, `VideosComponent`, `FilesComponent`) manage each file type.
   - Files can be viewed (via Firebase URL) and deleted from the CDN.
   - SweetAlert confirmations provide a user-friendly experience for deletion actions.

## Technologies Used
- **Frontend**: Angular, HTML, CSS
- **Storage**: Firebase Storage for files
- **Backend**: Express API
- **Database**: MongoDB for storing metadata
- **Other Libraries**:
  - Axios for HTTP requests from Angular
  - SweetAlert for enhanced UI alerts and confirmations

## Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   - Angular app dependencies:
     ```bash
     npm install
     ```
   - Backend dependencies (Express, MongoDB):
     ```bash
     npm install axios firebase sweetalert2
     ```

3. **Set up Firebase**:
   - Create a Firebase project and enable Firebase Storage.
   - Add your Firebase configuration in `src/environments/environment.ts`.

4. **Set up MongoDB**:
   - Configure a MongoDB database to store file metadata.
   - Ensure the backend API has access to this database.

## Usage
1. **Run the Angular Application**:
   ```bash
   ng serve
   ```

2. **Run the Backend API**:
   ```bash
   node server.js
   ```

3. **Navigate to** `http://localhost:4200` in your browser.

### File Upload and Management
- Select files to upload; details will be displayed immediately.
- Choose “Upload File” for single file uploads or “Upload All Files” for multiple files.
- View or delete uploaded files from categorized lists in each component (Images, Videos, Files).

## File Structure
- **`/src/app`**: Contains Angular components:
  - `UploadComponent`: Handles file selection and upload.
  - `ImagesComponent`, `VideosComponent`, `FilesComponent`: Categorized file management.
- **`/src/environments/environment.ts`**: Contains Firebase configuration.
- **`/server.js`**: Backend Express API for MongoDB interactions.

## Screenshots
<!-- Include screenshots here if possible -->

## Future Enhancements
- **User Authentication**: Add user login to restrict file management to authorized users.
- **File Categorization Enhancements**: Automate categorization for other file types.
- **Analytics**: Add analytics to track upload/download activity.
- **Enhanced File Previews**: Provide previews for image and video files directly in the app.

---

This CDN project provides a comprehensive interface for managing files in a content delivery network, supporting real-time uploads, dynamic file handling, and a smooth user experience.
