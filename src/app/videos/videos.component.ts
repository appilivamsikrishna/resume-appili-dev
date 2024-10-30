import { Component, OnInit } from "@angular/core";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"],
})
export class VideosComponent implements OnInit {
  videos: any[] = []; // Array to store the fetched video data

  constructor() {}

  ngOnInit(): void {
    this.fetchVideos(); // Fetch videos when the component initializes
  }

  // Method to fetch videos from the backend API
  fetchVideos(): void {
    axios
      .get("https://api.astrodata.network/api/get/files?type=video") // Replace with your actual API URL
      .then((response) => {
        this.videos = response.data; // Store the fetched videos in the array
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }

  // Method to delete a video by unique_id, with SweetAlert confirmation
  deleteVideo(unique_id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "This video will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://api.astrodata.network/api/delete/file/${unique_id}`)
          .then((response) => {
            Swal.fire("Deleted!", "The video has been deleted.", "success");

            // Remove the deleted video from the local videos array
            this.videos = this.videos.filter(
              (video) => video.unique_id !== unique_id
            );

            this.fetchVideos(); // Optionally re-fetch
          })
          .catch((error) => {
            console.error("Error deleting video:", error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the video.",
              "error"
            );
          });
      }
    });
  }
}
