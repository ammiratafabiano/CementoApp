import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the Mod3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mod3',
  templateUrl: 'mod3.html',
})
export class Mod3Page {

  variablesForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.variablesForm = this.formBuilder.group({
      var1: [''],
      var2: [''],
      var3: [''],
      var4: [''],
      var5: [''],
      unit: ['c1'],
      mult: ['1']
    });
  }

  popup(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

	floor(num, n) {

		var a = Math.pow(10, n);
		return Math.round(num * a) / a;

	}

  openResultsModal(results){

    let resultsModal = this.modalCtrl.create('ResultsModalPage', { data: results });
    resultsModal.present();

  }

  errorHandler(values){
    return 1;
  }

  reset(){
    this.variablesForm.reset();
    this.variablesForm.get('mult').setValue(1);
  }

  calcola(){

    var values = this.variablesForm.value;

    if (this.errorHandler(values)) {

      var RapS, RapG, roS, roG, Vi, Vs, Vg, Ps, Pg;

      var m = +values.mult;

      RapS = +values.var1;
      RapG = +values.var2;
      roS = +values.var3;
      roG = +values.var4;
      Vi = +values.var5;

      Vs = ((Vi * RapS) / (RapS + RapG)) * m;
      Vg = ((Vi * RapG) / (RapS + RapG)) * m;
      Ps = (Vs * roS) * m;
      Pg = (Vg * roG) * m;

      var results = {
        name: "Mix Design 2",
        variables: [
          {
            name: "Rap(p)S",
            value: RapS,
            unit: "/"
          },
          {
            name: "Rap(p)G",
            value: RapG,
            unit: "/"
          },
          {
            name: "ρS",
            value: roS,
            unit: "Kg/L"
          },
          {
            name: "ρS",
            value: roG,
            unit: "Kg/L"
          },
          {
            name: "Vi",
            value: Vi,
            unit: "L/m³"
          },
          {
            name: "Vs",
            value: this.floor(Vs,4),
            unit: "L/m³"
          },
          {
            name: "Vg",
            value: this.floor(Vg,4),
            unit: "L/m³"
          },
          {
            name: "Ps",
            value: this.floor(Ps,4),
            unit: "Kg/m³"
          },
          {
            name: "Pg",
            value: this.floor(Pg,4),
            unit: "Kg/m³"
          }

        ]
      }

      this.openResultsModal(results);

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mod3Page');
    if (this.navParams.get('params') != undefined) {

      this.variablesForm.get('var5').setValue(this.navParams.get('params').filter(x => x.name == 'Vi')[0].value);

    }
  }

}
