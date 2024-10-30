import { Component, OnInit } from "@angular/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Swal from "sweetalert2";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFiles: File[] = [];
  uploadedFiles: {
    url: string;
    file_name: string;
    file_size: number;
    file_type: string;
    uniqueId: string;
  }[] = [];
  isUploading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  filesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    console.log(this.selectedFiles);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length > 0) {
      this.isUploading = true;
      let uploadPromises = this.selectedFiles.map((file) => {
        const storage = getStorage();
        const storageRef = ref(storage, file.name);

        return uploadBytes(storageRef, file).then((snapshot) => {
          return getDownloadURL(storageRef).then((url) => {
            const fileData = {
              file_name: file.name,
              file_type: this.getFileType(file),
              file_extension: file.name.split(".").pop() || "",
              file_link: url,
            };

            return this.saveFileToServer(fileData).then((response) => {
              // Save file details with uniqueId
              this.uploadedFiles.push({
                url: url,
                file_name: file.name,
                file_size: Math.round(file.size / 1024),
                file_type: this.getFileType(file),
                uniqueId: response.data.uniqueId, // Store uniqueId
              });
            });
          });
        });
      });

      Promise.all(uploadPromises)
        .then(() => {
          Swal.fire({
            title: "Upload Successful!",
            text: `${this.selectedFiles.length} file(s) uploaded successfully.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
          Swal.fire({
            title: "Upload Failed",
            text: "There was an error uploading your files.",
            icon: "error",
            confirmButtonText: "OK",
          });
        })
        .finally(() => {
          this.isUploading = false; // Reset uploading state
        });
    } else {
      console.log("No files selected");
    }
  }

  // Method to delete a file by uniqueId, with SweetAlert confirmation
  deleteFile(uniqueId: string): void {
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
          .delete(`https://api.astrodata.network/api/delete/file/${uniqueId}`)
          .then((response) => {
            Swal.fire("Deleted!", "The file has been deleted.", "success");
            // Remove the deleted file from the list
            this.uploadedFiles = this.uploadedFiles.filter(
              (file) => file.uniqueId !== uniqueId
            );
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

  getFileType(file: File): string {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const videoTypes = ["video/mp4", "video/avi", "video/mov"];

    if (imageTypes.includes(file.type)) {
      return "image";
    } else if (videoTypes.includes(file.type)) {
      return "video";
    } else {
      return "file";
    }
  }

  saveFileToServer(fileData: any): Promise<any> {
    return axios.post(
      "https://api.astrodata.network/api/post/upload",
      fileData
    );
  }
}
