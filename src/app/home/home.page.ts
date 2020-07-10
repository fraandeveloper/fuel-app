import { Component } from '@angular/core';

import { ActionSheetController, NavController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GetPostService } from '../services/get-post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public fuelStation = [];

  public rage: number;
  public latitude: number;
  public longitude: number;
  public chooseGasoline: number;

  constructor(
    private actionSheetController: ActionSheetController,
    private getPostService: GetPostService,
    private geolocation: Geolocation,
    public navCtrl: NavController) {
      this._getLocation();
    }

  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Tipo do combustível',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Gasolina Comun',
        role: 'destructive',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(1);
        }
      }, {
        text: 'Gasolina Aditivada',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(2);
        }
      }, {
        text: 'Álcool',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(3);
        }
      }, {
        text: 'Diesel Comum',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(4);
        }
      }, {
        text: 'Diesel Aditivado',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(5);
        }
      }, {
        text: 'Gás Natural (GNV)',
        icon: 'water-outline',
        handler: () => {
          this._getCommonGasolinePrices(6);
        }
      }]
    });
    await actionSheet.present();
  }

  public doRefresh(event) {
    this._getCommonGasolinePrices(this.chooseGasoline);
    setTimeout(() => {
      if (this.fuelStation.length > 0) {
        event.target.complete();
      }
    }, 2000);
  }

  private _range(event: any): void {
    this.rage = (typeof event === 'undefined') ? 1 : event;
  }

  private _getLocation(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      const { coords: { latitude, longitude } } = resp;
      this.latitude = latitude;
      this.longitude = longitude;
    }).catch((error) => console.log('Error getting location', error));
  }

  private _getCommonGasolinePrices(type: number = 1): void {
    this.chooseGasoline = type;
    this.fuelStation = [];

    const request = {
      codTipoCombustivel: `${type}`,
      dias: 5,
      latitude: this.latitude,
      longitude: this.longitude,
      raio: (this.rage === undefined) ? 1 : this.rage
    };

    this.getPostService.getFuelStation(request)
    .then(data => {
      data.map(strutucte => this.fuelStation.push(strutucte));
    })
    .catch(error => console.error(error));
  }

  public goToPageMaps(data?): void {
    const { numLongitude, numLatitude } = data;
    console.log('Item clicado ==>', data);

    const coords = {
      queryParams: {
        latitude: numLatitude,
        longitude: numLongitude,
      }
    };

    this.navCtrl.navigateForward(['/maps'], coords);
  }
}
