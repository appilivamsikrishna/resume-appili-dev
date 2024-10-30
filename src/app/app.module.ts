import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from "../environments/environment";
import { ResolutionService } from './fwk/service/resolution.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMissingTranslationHandler } from './fwk/i18n/i18n.module';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GithubUserProjectsService } from './services/github-user-projects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { LandingComponent } from './landing/landing.component';
import { UploadComponent } from './upload/upload.component';
import { StatusComponent } from './status/status.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';
import { FilesComponent } from './files/files.component';
import * as firebase from 'firebase/app'; // Import Firebase SDK
import 'firebase/storage'; // Import Firebase Storage


// Initialize Firebase
firebase.initializeApp(environment.firebase);


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    NgxSpinnerModule,
  ],
  providers: [
    Title,
    ResolutionService,
    {
      provide: MissingTranslationHandler,
      useClass: AppMissingTranslationHandler
    },
    GithubUserProjectsService,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LandingComponent,
    UploadComponent,
    StatusComponent,
    ImagesComponent,
    VideosComponent,
    FilesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
