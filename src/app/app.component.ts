import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  map: any;

  constructor() {
  }

  public ngAfterViewInit(): void {
    this.initMap();
    this.initMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      center: [-42.0, 35.0],
      zoom: 3,
    });

    const tiles = L.tileLayer('https://gta5-map.github.io/tiles/road/{z}-{x}_{y}.png?{foo}', {
      // @ts-ignore
      foo: 'bar',
      attribution: 'B-Zone V MLOS Map',
      maxZoom:7,
      minZoom: 3,
      tileSize: 256,
    });

    tiles.addTo(this.map);
  }

  private initMarkers() {
    if (this.map === undefined) return;

    const marker = L.marker(this.map.getCenter(), {
      // icon: new L.Icon({
      //   iconUrl: `https://i.imgur.com/OC9J7iM.png`,
      //   iconSize:     [20, 20],
      //   iconAnchor:   [20, 20],
      //   popupAnchor:  [-10, -27]
      // }),
      icon: new L.DivIcon({
        html: `<img src='https://i.imgur.com/OC9J7iM.png' style="width: 100%; height: 100%"/> <span>Test</span>`
      }),
      title: 'test',
      alt: 'alt',
      keyboard: true,
    }).addTo(this.map);
  }
}
