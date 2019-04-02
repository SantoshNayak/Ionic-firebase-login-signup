import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString('#0c7a88');

  }

}
