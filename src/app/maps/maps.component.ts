import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Mapboxgl from 'mapbox-gl';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit {
  public map: Mapboxgl.Map;

  constructor(public router: ActivatedRoute) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.getParams(), 0);
  }

  public getParams(): void {
    this.router.queryParams.subscribe(params => {
      const { latitude, longitude } = params;
      this.initMap(longitude, latitude);
    });
  }

  public initMap(lng: number, lat: number) {
    Mapboxgl.accessToken = environment.mapBox;

    this.map = new Mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
      center: [lng, lat], // starting position
      zoom: 16.8
    });

    this._marker(lng, lat);
  }

  private _marker(lng: number, lat: number): void {
    const marker = new Mapboxgl.Marker({ draggable: true })
    .setLngLat([lng, lat])
    .addTo(this.map);
  }
}
