import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.css"],
})
export class ImagesComponent implements OnInit {
  images: any[] = []; // Array to store the fetched image data

  constructor() {}

  ngOnInit(): void {
    this.fetchImages(); // Fetch images when the component initializes
  }

  // Method to fetch images from the backend API
  fetchImages(): void {
    axios
      .get("https://api.astrodata.network/api/get/files?type=image") // Replace with your actual API URL
      .then((response) => {
        this.images = response.data; // Store the fetched images in the array
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }

  // Method to delete a file by unique_id
  deleteFile(unique_id: string): void {
    if (confirm("Are you sure you want to delete this file?")) {
      axios
        .delete(`https://api.astrodata.network/api/delete/file/${unique_id}`) // Replace with your actual API URL
        .then((response) => {
          console.log("File deleted:", response.data);
          this.fetchImages(); // Re-fetch the images after deletion to update the list
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    }
  }
}
