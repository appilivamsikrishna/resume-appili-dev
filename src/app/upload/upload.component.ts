import { Component, OnInit } from "@angular/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary storage functions

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null; // To store the selected file
  downloadURL: string; // Store the URL after upload

  constructor() {}

  ngOnInit(): void {}

  // Method to handle file selection
  fileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Store the selected file
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


            console.log("File available at:", this.downloadURL);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  }
}
