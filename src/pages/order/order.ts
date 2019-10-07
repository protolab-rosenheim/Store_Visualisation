import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private emailComposer: EmailComposer, private formBuilder: FormBuilder,
    private toastCtrl: ToastController) {

    this.form = this.formBuilder.group({
      material: ['', Validators.required],
      length: ['', Validators.min(1)],
      width: ['', Validators.min(1)],
      count: ['', Validators.min(1)],
      costunit: [''],
      additionalInfo: [''],
    });


    if (Object.keys(this.navParams.data).length !== 0 || this.navParams.data.constructor !== Object) {
      let boardToOrder: Board = this.navParams.data;
      this.form.controls['material'].setValue(boardToOrder.Material);
      this.form.controls['length'].setValue(boardToOrder.Laenge / 10);
      this.form.controls['width'].setValue(boardToOrder.Breite / 10);
    }
  }

  ionViewDidLoad() {

  }

  order() {

    if (this.form.valid) {
      let message = this.buildEmail(this.form.value.material,
        this.form.value.length,
        this.form.value.width,
        this.form.value.count,
        this.form.value.costunit,
        this.form.value.additionalInfo);

      let email = {
        to: 'martin.neumayer@fh-rosenheim.de',
        subject: 'Plattenbestellung Lager',
        body: message,
        isHtml: true
      };

      this.emailComposer.isAvailable().then((available: boolean) => {
        this.emailComposer.open(email).then(() => {
          //Email opened
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        let toast = this.toastCtrl.create({
          message: 'Kein Email-Client verfügbar',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });

    } else {
      let toast = this.toastCtrl.create({
        message: 'Nicht alle Pflichtfelder ausgefüllt',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  buildEmail(material: string, length: number, width: number, count: number, costunit: string, additionalInfo: string): string {
    return 'Sehr geehrter Herr Hörfurter,\n'
      + 'ich würde gerne folgende Platten bestellen: \n'
      + 'Materialbezeichnung: ' + material + '\n'
      + 'Abmessungen: ' + length + 'x' + width + '\n'
      + 'Menge: ' + count + '\n'
      + 'Kostenstelle: ' + costunit + '\n'
      + 'Weitere Informationen: ' + additionalInfo + '\n';
  }

}
