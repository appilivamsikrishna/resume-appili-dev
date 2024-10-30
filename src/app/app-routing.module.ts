import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContactsComponent } from './contacts/contacts.component';
import { DemosComponent } from './demos/demos.component';

import { MembersComponent } from './members/members.component';
import { CsvViewerComponent } from './privacy-policies/csv-viewer/csv-viewer.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { LandingComponent } from './landing/landing.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';

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
    component: TechnologiesComponent,
  },
  {
    path: "status",
    component: MembersComponent,
  },
  {
    path: "home",
    component: LandingComponent,
  },
  {
    path: "contacts",
    component: ContactsComponent,
  },
  {
    path: "demos",
    component: DemosComponent,
  },
  {
    path: "privacy-policies/csv-viewer",
    component: CsvViewerComponent,
  }, // probably TODO disable Security Appili Vamsi Krishna DFS
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
