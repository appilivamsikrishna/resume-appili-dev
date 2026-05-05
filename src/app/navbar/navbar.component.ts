import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app.constants';

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
    try {
      if (window.innerWidth >= 768) {
        return;
      }
      const sidebarEl = document.getElementById('sidebarMenu');
      if (sidebarEl) {
        sidebarEl.classList.remove('show');
      }
    } catch (e) {
      console.warn('closeSidebarOnMobile error', e);
    }
  }

}
