import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ResultsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results-modal',
  templateUrl: 'results-modal.html',
})
export class ResultsModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {

  }

  goTo(page) {
    this.view.dismiss({"page": page, "params": this.navParams.get('data').variables});
  }

  closeModal() {
    this.view.dismiss();
  }

  openIn() {
    this.socialSharing.share(this.navParams.get('data'));
  }

}
