import { DashboardPage } from './../pages/dashboard/dashboard';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './../pages/login/login';
import { FormBuilder } from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database'
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
// import { from } from 'rxjs';



var config = {
  apiKey: "AIzaSyA794d6_ps4wauEV_-vvTZhWspRL3OTk9E",
  authDomain: "ionic2-3b361.firebaseapp.com",
  databaseURL: "https://ionic2-3b361.firebaseio.com",
  projectId: "ionic2-3b361",
  storageBucket: "ionic2-3b361.appspot.com",
  messagingSenderId: "391837715463"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
