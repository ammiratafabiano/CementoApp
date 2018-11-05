import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Mod1Page } from '../pages/mod1/mod1';
import { Mod2Page } from '../pages/mod2/mod2';
import { Mod3Page } from '../pages/mod3/mod3';
import { Mod3PageModule } from '../pages/mod3/mod3.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Mod1Page,
    Mod2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Mod3PageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Mod1Page,
    Mod2Page,
    Mod3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
