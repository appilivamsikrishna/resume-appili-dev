import { Component, OnInit } from "@angular/core";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"],
})
export class FilesComponent implements OnInit {
  files: any[] = []; // Array to store the fetched file data

  constructor() {}

  ngOnInit(): void {
    this.fetchFiles(); // Fetch files when the component initializes
  }

  // Method to fetch files from the backend API
  fetchFiles(): void {
    axios
      .get("https://api.astrodata.network/api/get/files?type=file") // Replace with your actual API URL
      .then((response) => {
        this.files = response.data; // Store the fetched files in the array
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
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
        axios
          .delete(`https://api.astrodata.network/api/delete/file/${unique_id}`)
          .then((response) => {
            Swal.fire("Deleted!", "The file has been deleted.", "success");

            // Remove the deleted file from the local files array
            this.files = this.files.filter(
              (file) => file.unique_id !== unique_id
            );

            this.fetchFiles(); // Optionally re-fetch
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
