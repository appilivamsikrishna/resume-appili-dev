import { VERSION } from '@angular/core';
import { BUILD_INFO } from '../environments/build-info';

declare const bootstrap: any; // global reference

/**
 * Application constants
 */
export class AppConstants {

  public static DATE = BUILD_INFO.date;
  public static APP_TITLE = 'Krishna';
  public static AUTHOR_NAME = 'Appili Vamsi Krishna';
  public static APP_TITLE_VERSION: string = AppConstants.APP_TITLE + ' - ' + AppConstants.DATE;

  public static ANGULAR_VERSION = 'Ng ' + VERSION.full;
  public static BOOTSTRAP_VERSION = bootstrap.Tooltip.VERSION;

}
