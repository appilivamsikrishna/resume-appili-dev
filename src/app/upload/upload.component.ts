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
      this.isUploading = true; // Start uploading
      let uploadPromises = this.selectedFiles.map((file) => {
        const storage = getStorage();
        const storageRef = ref(storage, file.name);

        return uploadBytes(storageRef, file).then((snapshot) => {
          return getDownloadURL(storageRef).then((url) => {
            this.uploadedFiles.push({
              url: url,
              file_name: file.name,
              file_size: Math.round(file.size / 1024), // Convert size to KB
              file_type: this.getFileType(file),
            });

            const fileData = {
              file_name: file.name,
              file_type: this.getFileType(file),
              file_extension: file.name.split(".").pop() || "",
              file_link: url,
            };

            return this.saveFileToServer(fileData);
          });
        });
      });

      // Wait for all uploads to finish
      Promise.all(uploadPromises)
        .then(() => {
          console.log("All files uploaded successfully.");
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
