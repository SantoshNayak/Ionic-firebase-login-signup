import { ToastController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { myUsers } from '../../module/myusers';
import firebase from 'firebase';
declare var TweenMax: any;
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  key: any;


  mydb = new myUsers();



  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Updated!!',
      showCloseButton: true,
      position: 'buttom',
      closeButtonText: 'Done',

    });
    toast.present();
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: AngularFireDatabase, public toastController: ToastController, ) {
    this.key = navParams.get('item');
    console.log(this.key);
    console.log(this.key.alias);

   
    this.mydb = this.key;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    TweenMax.staggerFrom(".animateme", 0.5, { opacity: 0, x: 100, delay: 0.5 }, 0.2);
  }

  UpdateMe() {

    this.mydb.confirmpassword=this.mydb.password;
    // //sign-in check using query
    let query = firebase.database().ref("/User/").orderByChild("email").equalTo(this.mydb.email);
    query.once("child_added", (snapshot) => {
    
      
      snapshot.ref.update(this.mydb)

    });
    this.presentToastWithOptions();

    // this.fb.list('/User').snapshotChanges().subscribe(data => {
    //   let User: Array<any> = data;
    //   var reef = firebase.database().ref("/User/" + User[1].key);
    //   reef.update(this.mydb);
    //   console.log(data)
    //   console.log(User)
    //   console.log();
    // })

  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}
