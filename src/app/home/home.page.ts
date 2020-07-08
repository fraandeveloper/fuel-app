import { Component } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

import { GetPostService } from '../services/get-post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private actionSheetController: ActionSheetController, private getPostService: GetPostService) {}

  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escola a gasolina',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Gasolina comun',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this._getCommonGasolinePrices();
        }
      }, {
        text: 'Gasolina aditivada',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Álcool',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Diesel comum',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  private _getCommonGasolinePrices(): void {
    const request = {
      codTipoCombustivel: '1',
      dias: 3,
      latitude: -9.6432331,
      longitude: -35.7190686,
      raio: 15
    }

    this.getPostService.getFuelStation(request).subscribe(data => console.log('JSON', data));
  }
}
