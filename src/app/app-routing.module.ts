import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { LandingComponent } from './landing/landing.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';
import { StatusComponent } from './status/status.component';



// removing code is our last step

const routes: Routes = [
  {
    path: "images",
    component: ImagesComponent,
  },
  {
    path: "videos",
    component: VideosComponent,
  },
  {
    path: "files",
    component: FilesComponent,
  },
  {
    path: "status",
    component: StatusComponent,
  },
  {
    path: "home",
    component: LandingComponent,
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "**",
    component: LandingComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
