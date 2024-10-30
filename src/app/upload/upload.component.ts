import { Component, OnInit } from "@angular/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary storage functions
import { initializeApp } from "firebase/app";
import { environment } from "../../environments/environment"; // Ensure your Firebase config is correct

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  downloadURL: string; // Store the URL after upload

  constructor() {}

  ngOnInit(): void {
    // Initialize Firebase app
    // initializeApp(environment.firebase); // Ensure Firebase is initialized with your configuration
  }

  // Method to handle file upload
  uploadFile(event: any): void {
    const file = event.target.files[0]; // Get the selected file

    // Initialize Firebase Storage and create a reference to the file
    const storage = getStorage(); // Use the new getStorage function
    const storageRef = ref(storage, file.name); // Create a reference to 'file.name'

    // Upload the file
    uploadBytes(storageRef, file)
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
  }
}
