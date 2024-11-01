import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as serviceWorker from "./serviceWorker";
if (environment.production) {
  enableProdMode();
}
serviceWorker.unregister();
platformBrowserDynamic().bootstrapModule(AppModule);
