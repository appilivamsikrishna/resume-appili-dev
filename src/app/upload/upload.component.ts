import { Component, OnInit } from "@angular/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import axios from "axios"; // Import Axios

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null; // To store the selected file
  downloadURL: string; // Store the URL after upload
  fileType: string = ""; // To store file type (image, video, file)
  fileExtension: string = ""; // To store file extension

  constructor() {}

  ngOnInit(): void {}

  // Method to handle file selection
  fileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Store the selected file
    if (this.selectedFile) {
      this.categorizeFile(this.selectedFile); // Categorize the selected file
    }
  }

  // Method to categorize the file based on MIME type or extension
  categorizeFile(file: File): void {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const videoTypes = ["video/mp4", "video/avi", "video/mov"];

    // Get MIME type of the file
    const mimeType = file.type;

    if (imageTypes.includes(mimeType)) {
      this.fileType = "image";
    } else if (videoTypes.includes(mimeType)) {
      this.fileType = "video";
    } else {
      this.fileType = "file"; // Default to 'file' for non-image and non-video types
    }

    // Get the file extension
    this.fileExtension = file.name.split(".").pop() || ""; // Extract the file extension
    console.log(
      `File categorized as: ${this.fileType}, with extension: ${this.fileExtension}`
    );
  }

  // Method to handle file upload
  uploadFile(): void {
    if (this.selectedFile) {
      const storage = getStorage(); // Use the new getStorage function
      const storageRef = ref(storage, this.selectedFile.name); // Create a reference to 'file.name'

      // Upload the file
      uploadBytes(storageRef, this.selectedFile)
        .then((snapshot) => {
          console.log("Uploaded a file!");

          // Get the download URL
          getDownloadURL(storageRef).then((url) => {
            this.downloadURL = url; // Store and use this URL to display or link to the file

            // Prepare the data to send to the server
            const fileData = {
              file_type: this.fileType,
              file_extension: this.fileExtension,
              file_link: this.downloadURL,
            };

            console.log("File available at:", this.downloadURL);
            console.log("File data to send to server:", fileData);

            // Here you would send 'fileData' to your Express backend using Axios
            this.saveFileToServer(fileData);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  }

  // Method to send file data to your backend using Axios
  saveFileToServer(fileData: any): void {
    axios
      .post("https://api.astrodata.network/api/post/upload", fileData)
      .then((response) => {
        console.log("File data saved to server:", response);
      })
      .catch((error) => {
        console.error("Error saving file data:", error);
      });
  }
}
