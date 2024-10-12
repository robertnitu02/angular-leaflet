import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import { Marker, markers} from "./markers.model";
import {marker} from "leaflet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  map: any;
  inCreatorMode = false;

  constructor() {
  }

  public ngAfterViewInit(): void {
    this.initMap();
    this.initMarkers();

    this.map.on("click", (e: any) => {
      console.log(e.latlng); // get the coordinates
      if (!this.inCreatorMode) return
      const markerData =  {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        iconUrl: 'https://i.imgur.com/OC9J7iM.png',
        bindPopup: 'Added Marker',
      };
      this.createMarker(markerData, true);
    });
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
      maxZoom: 7,
      minZoom: 3,
      tileSize: 256,
    });

    tiles.addTo(this.map);
  }

  private initMarkers() {
    if (this.map === undefined) return;
    markers.forEach(marker => {
      this.createMarker(marker);
    });
  }

  private createIcon(iconUrl: string): any {
    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });
  }

  private createMarker(marker: Marker, isNew = false) {
    L.marker([marker.lat, marker.lng], {
      icon: this.createIcon(marker.iconUrl),
    }).addTo(this.map).bindPopup(marker.bindPopup);

    if (!isNew) return;
    this.map.setView([marker.lat, marker.lng], 10);
    this.markers.push(marker);
  }

  toggleCreatorMode() {
    this.inCreatorMode = !this.inCreatorMode;
  }

  protected readonly markers = markers;
  protected readonly JSON = JSON;
}
