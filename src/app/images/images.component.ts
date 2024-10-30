import { Component, OnInit } from "@angular/core";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

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

  // Method to delete a file by unique_id, with SweetAlert confirmation
  deleteFile(unique_id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "This file will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with file deletion
        axios
          .delete(`https://api.astrodata.network/api/delete/file/${unique_id}`) // Replace with your actual API URL
          .then((response) => {
            Swal.fire("Deleted!", "The file has been deleted.", "success");
            this.fetchImages(); // Re-fetch the images after deletion to update the list
          })
          .catch((error) => {
            console.error("Error deleting file:", error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the file.",
              "error"
            );
          });
      }
    });
  }
}
