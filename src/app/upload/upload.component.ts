import { Component, OnInit } from "@angular/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import axios from "axios"; // Import Axios

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFiles: File[] = []; // Array to store selected files
  downloadURLs: string[] = []; // Array to store download URLs for multiple files

  constructor() {}

  ngOnInit(): void {}

  // Method to handle file selection
  filesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files); // Store the selected files in an array
    console.log(this.selectedFiles);
  }

  // Method to categorize and upload files one by one
  uploadFiles(): void {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        const storage = getStorage(); // Use the new getStorage function
        const storageRef = ref(storage, file.name); // Create a reference to 'file.name'

        // Upload the file
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            console.log(`Uploaded file: ${file.name}`);

            // Get the download URL
            getDownloadURL(storageRef).then((url) => {
              this.downloadURLs.push(url); // Store the download URL in the array

              // Prepare the data to send to the server
              const fileData = {
                file_name: file.name, // Full file name
                file_type: this.getFileType(file), // Categorize the file based on MIME type
                file_extension: file.name.split(".").pop() || "", // Extract the file extension
                file_link: url, // Firebase download URL
              };

              console.log("File available at:", url);
              console.log("File data to send to server:", fileData);

              // Here you would send 'fileData' to your Express backend using Axios
              this.saveFileToServer(fileData);
            });
          })
          .catch((error) => {
            console.error(`Error uploading file ${file.name}:`, error);
          });
      });
    } else {
      console.log("No files selected");
    }
  }

  // Helper method to determine file type (image, video, or file)
  getFileType(file: File): string {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const videoTypes = ["video/mp4", "video/avi", "video/mov"];

    if (imageTypes.includes(file.type)) {
      return "image";
    } else if (videoTypes.includes(file.type)) {
      return "video";
    } else {
      return "file"; // Default to 'file' for non-image and non-video types
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
