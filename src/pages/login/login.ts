import { StatusBar } from '@ionic-native/status-bar';
import { SignupPage } from './../signup/signup';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIEventManager } from 'ionic-angular/umd/gestures/ui-event-manager';
import { MyArray } from './../../module/myArray'
import { myUsers } from '../../module/myusers';
import { DashboardPage } from '../dashboard/dashboard';
import { ToastController } from "ionic-angular";
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';
import { BoundDirectivePropertyAst } from '@angular/compiler';

declare var TweenMax: any;


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @ViewChild('email') email;
//  @ViewChild('password')password;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  flag = 0;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    TweenMax.from(".avtar", 0.5, { opacity: 0, scale: 0, ease: BoundDirectivePropertyAst.easeOut });
    TweenMax.from(".top-icon", 1, { x: 400, ease: BoundDirectivePropertyAst.easeOut });
    TweenMax.staggerFrom(".animate", 0.4, { opacity: 0, y: 100, delay: 0.1 }, 0.2);
  }


  userObj: any = {}

  loginobj = new myUsers();


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController, public fb: AngularFireDatabase, private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString('#126a75');

    this.userObj = new MyArray().getUsers();


  }


  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'invalid credentials!!',
      showCloseButton: true,
      position: 'buttom',
      closeButtonText: 'Done',

    });
    toast.present();
  }



  public gotoSignup() {
    this.navCtrl.setRoot(SignupPage);
  }






  signIn() {
    //sign-in check using query
    // let rref=firebase.database().ref("/User/");
    // rref.orderByChild("email").equalTo(this.loginobj.email).on('child_added',(snapshot) =>{
    //   var va= snapshot.val()
    //   //console.log
    //   this.navCtrl.push(DashboardPage,{key:va})
    // })
    //fire base data check snapshotChanges
    this.fb.list('/User').valueChanges()
      .subscribe(data => {
        let User: Array<any> = data;
        console.log("before for loop flag is ", this.flag);
        for (var j = 0; j < data.length; j++) {
          if (User[j].email.toUpperCase() == this.loginobj.email.toUpperCase() && User[j].password == this.loginobj.password) {
            this.flag = 1;
            console.log("Valid user");
            this.navCtrl.setRoot(DashboardPage, { item: User[j] });
          }

        }
        if (this.flag == 0) {
          this.presentToastWithOptions()
        }



        console.log("after for loop flag is ", this.flag);
      })
    //array authentication

    // for (var i = 0; i < this.userObj.length; i++) {


    //   if (this.userObj[i].email == this.loginobj.email && this.userObj[i].password == this.loginobj.password) {


    //     //  console.log(this.password.value);
    //     this.navCtrl.push(DashboardPage, { item: this.userObj[i].alias });
    //     console.log(this.userObj[i].alias);
    //   }
    //   else {

    //     this.presentToastWithOptions()

    //   }
    // }



  }


}