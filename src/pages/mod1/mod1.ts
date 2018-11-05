import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the Mod1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mod1',
  templateUrl: 'mod1.html',
})
export class Mod1Page {

  variablesForm: FormGroup;
  units: {c1: "cm3", c2:"L"};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.variablesForm = this.formBuilder.group({
      var1: [''],
      var2: [''],
      var3: [''],
      choice1: ['c1'],
      choice2: ['c2'],
      unit: ['c1']
    });
  }

  popup(message, subMessage?) {

    if (subMessage == undefined) {
      subMessage = "";
    }

    let alert = this.alertCtrl.create({
      title: message,
      subTitle: subMessage,
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
    this.variablesForm.get('unit').setValue('c1');
    this.variablesForm.get('choice1').setValue('c1');
    this.variablesForm.get('choice2').setValue('c2');
  }

  calcola(){

    var values = this.variablesForm.value;

    if (this.errorHandler(values)) {

      var GI, Vc, Va, AC, Vtot, Vpi, Vcnr, Vpc, PC;

      GI = +values.var1;

      if (values.choice1 == "c1" && values.choice2 =="c2"){
        Vc = +values.var2;
        Va = +values.var3;
        AC = Va / (Vc * 3.15);
      }
      else if (values.choice1 == "c1" && values.choice2 =="c3") {
        Vc = +values.var2;
        AC = +values.var3;
        Va = AC * Vc * 3.15;
      }
      else if (values.choice1 == "c2" && values.choice2 =="c1") {
        Vc = +values.var3;
        Va = +values.var2;
        AC = Va / (Vc * 3.15);
      }
      else if (values.choice1 == "c1" && values.choice2 =="c3") {
        Va = +values.var2;
        AC = +values.var3;
        Vc = Va / (AC * 3.15);
      }
      else if (values.choice1 == "c3" && values.choice2 =="c1") {
        Vc = +values.var3;
        AC = +values.var2;
        Va = AC * Vc * 3.15;
      }
      else if (values.choice1 == "c3" && values.choice2 =="c2") {
        Va = +values.var3;
        AC = +values.var2;
        Vc = Va / (AC * 3.15);
      }

			Vtot = Va + Vc;
			Vpi = 2.06 * Vc * (GI / 100);
			Vcnr = Vc - (Vc * (GI / 100));
			Vpc = Vtot - Vpi - Vcnr;
			PC = (Vpc / Vtot) * 100;

			var unit = "cm³";
			if (values.unit == "c2") {
			  unit = "L";
			}

      var results = {
        name: "Porosità capillare",
        variables: [
          {
            name: "GI",
            value: GI,
            unit: "%"
          },
          {
            name: "Vc",
            value: Vc,
            unit: unit
          },
          {
            name: "Va",
            value: Va,
            unit: unit
          },
          {
            name: "A/C",
            value: this.floor(AC,4),
            unit: "/"
          },
          {
            name: "Vtot",
            value: this.floor(Vtot,4),
            unit: unit
          },
          {
            name: "Vpi",
            value: this.floor(Vpi,4),
            unit: unit
          },
          {
            name: "Vcnr",
            value: this.floor(Vcnr,4),
            unit: unit
          },
          {
            name: "Vpc",
            value: this.floor(Vpc,4),
            unit: unit
          },
          {
            name: "PC",
            value: this.floor(PC,4),
            unit: "%"
          }

        ]
      }

      this.openResultsModal(results);

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mod1Page');
  }

}
