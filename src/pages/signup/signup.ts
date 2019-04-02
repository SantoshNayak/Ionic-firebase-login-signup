import { myUsers } from './../../module/myusers';
import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { MyArray } from './../../module/myArray'
import { ToastController } from "ionic-angular";
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BoundDirectivePropertyAst } from '@angular/compiler';
declare var TweenMax:any;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController,public fb:AngularFireDatabase) {
    this.signupObj = new MyArray().getUsers();
  }


  //toast messge 1
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Please fix above Errors',
      showCloseButton: true,
      position: 'buttom',
      closeButtonText: 'Done',
      duration:60
    });
    toast.present();
  }

//toast message 2
  async registeredToast() {
    const toast = await this.toastController.create({
      message: 'Registration Sucessful',
      showCloseButton: true,
      position: 'buttom',
      closeButtonText: 'Done',
     
    });
    toast.present();
  }




  signupObj: any = {};

  myobj = new myUsers();
  isEmailOk = 0;
  isPasswordOk = 0;
  isConfirmPasswordOk = 0;
  isaliasTrue = 0;

  // @ViewChild('regemail')regemail;
  // @ViewChild('regpassword')regpassword;




  emailCheck(email) {
    
    if (email.split('@').length == 2) {
      this.isEmailOk = 1;

    }
    else {
      this.isEmailOk = 2;
    }

  }

  passwordCheck(password) {
    let x = password;
    if (password.length >= 8) {
      this.isPasswordOk = 1;
    }
    else {
      this.isPasswordOk = 2;
    }
  }
  confirmpasswordCheck(confirmpw) {

    if (confirmpw == this.myobj.password) {
      this.isConfirmPasswordOk = 1;

    }
    else {
      this.isConfirmPasswordOk = 2;
    }

  }
  aliasCheck(alias) {

    if (alias != '') {
      this.isaliasTrue = 1;
    }
    else {
      this.isaliasTrue = 2;
    }
  }



  // form control below to fetch data from the form by form control and form group
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordNext: new FormControl(''),
    alias: new FormControl(''),
  });

  //using form builder



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    TweenMax.from(".hi",0.1,{y:80,ease:BoundDirectivePropertyAst.easeOut});
    TweenMax.staggerFrom(".animate",0.2,{opacity:0,x:100,delay:0.1},0.2);
  }

  gotoLogin() {
    this.navCtrl.setRoot(LoginPage);

  }
  mynewArray = new MyArray();


  // signmeUp(){
  //   console.log("signup clicked");
  //   console.log("below is signup form.value");
  //  console.log(this.signupForm.value)



  //  console.log("below is value fetched from myArray.ts");
  //   console.log(this.signupObj);

  //   console.log(this.signupObj.length);



  //   console.log(this.myobj);
  //   console.log(this.myobj.email);

  // }


  signmeUp() {
    //  console.warn(this.signupForm.value);

    var rref =this.fb.list('User')



    if (this.isEmailOk == 1 && this.isPasswordOk == 1 && this.isConfirmPasswordOk == 1 && this.isaliasTrue == 1) {
     
      rref.push(this.myobj)
    
      this.mynewArray.setUsers(this.signupForm.value);
      console.log(this.mynewArray.getUsers());
      this.registeredToast()

      setTimeout(() =>{
        this.navCtrl.setRoot(LoginPage); 
      },2000
      );

    }

    else {

      this.presentToastWithOptions() ;
      console.log("can't call signmeUp function")
    }





  }
}
