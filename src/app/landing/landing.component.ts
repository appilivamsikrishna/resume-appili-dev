import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Method to navigate to the upload component
  navigateToUpload(): void {
    this.router.navigate(["/upload"]); // Adjust '/upload' based on your routing path
  }
}
