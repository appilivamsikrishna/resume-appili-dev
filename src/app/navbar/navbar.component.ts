import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app.constants';

declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appTitleVersion = AppConstants.APP_TITLE_VERSION;
  authorName = AppConstants.AUTHOR_NAME;

  constructor() { }

  ngOnInit(): void {
  }

  closeSidebarOnMobile(): void {
    if (window.innerWidth >= 768) {
      return;
    }
    const sidebarEl = document.getElementById('sidebarMenu');
    if (!sidebarEl) {
      return;
    }
    const collapse = bootstrap.Collapse.getOrCreateInstance(sidebarEl, { toggle: false });
    collapse.hide();
  }

}
