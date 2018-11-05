import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the Mod2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mod2',
  templateUrl: 'mod2.html',
})
export class Mod2Page {

  variablesForm: FormGroup;
  units: {c1: "cm3", c2:"l"};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.variablesForm = this.formBuilder.group({
      var1: [''],
      var2: [''],
      var3: [''],
      var4: [''],
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

    resultsModal.onDidDismiss((out)=>{
      if (out != undefined) {
        this.navCtrl.push(out.page, {params: out.params} );
      }
    });

  }

  errorHandler(values){
    return 1;
  }

  reset(){
    this.variablesForm.reset();
    this.variablesForm.get('unit').setValue('c1');
    this.variablesForm.get('mult').setValue(1);
  }

  calcola(){

    var values = this.variablesForm.value;

    if (this.errorHandler(values)) {

      var a, ac, a2, roi, c, Va, Vc, Va2, Vi, Pi, Pcls;

      var m = +values.mult;

      a = +values.var1;
      ac = +values.var2;
      a2 = +values.var3;
      roi = +values.var4;

      c = (a / ac) * m;
      Va = a * m;
      Vc = (c / 3.15) * m;
      Va2 = (10 * a2) * m;
      Vi = (1000 - Va - Vc - Va2) * m;

      var results = {
        name: "Mix Design",
        variables: [
          {
            name: "a",
            value: a,
            unit: "Kg/m³"
          },
          {
            name: "a/c",
            value: ac,
            unit: "/"
          },
          {
            name: "a'",
            value: a2,
            unit: "%"
          },
          {
            name: "c",
            value: this.floor(c,4),
            unit: "Kg/m³"
          },
          {
            name: "Va",
            value: this.floor(Va,4),
            unit: "L/m³"
          },
          {
            name: "Vc",
            value: this.floor(Vc,4),
            unit: "L/m³"
          },
          {
            name: "Va'",
            value: this.floor(Va2,4),
            unit: "L/m³"
          },
          {
            name: "Vi",
            value: this.floor(Vi,4),
            unit: "L/m³"
          }
        ],
        share: 1
      }

      if (roi != ""){
        Pi = (Vi * roi) * m;
        Pcls = (Pi + a + c) * m;

        results.variables.push({
                                  name: "ρi(media)",
                                  value: roi,
                                  unit: "/"
                                });
        results.variables.push({
                                  name: "Pi",
                                  value: this.floor(Pi,4),
                                  unit: "Kg/m³"
                                });
        results.variables.push({
                                  name: "Pcls",
                                  value: this.floor(Pcls,4),
                                  unit: "Kg/m³"
                                });
      }

      this.openResultsModal(results);

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mod2Page');
  }

}
