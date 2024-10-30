import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app"; // Import Firebase SDK
import "firebase/storage"; // Import Firebase Storage

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  downloadURL: string; // To store the download URL of the uploaded file

  constructor() {}

  ngOnInit(): void {}

  // Method to handle file upload
  uploadFile(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    const storageRef = firebase.storage().ref(); // Reference to Firebase Storage
    const fileRef = storageRef.child(file.name); // Create a reference with the file's name

    // Upload the file
    fileRef.put(file).then(() => {
      // Once the upload is complete, get the download URL
      fileRef.getDownloadURL().then((url) => {
        this.downloadURL = url; // Save the URL to display or use in your app
        console.log("File available at:", this.downloadURL);
      });
    });
  }
}
