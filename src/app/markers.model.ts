export interface Marker {
  lat: number;
  lng: number;
  iconUrl: string;
  bindPopup: string;
}

export const markers: Marker[] = [
  {
    lat: 0,
    lng: 0,
    iconUrl: `https://i.imgur.com/OC9J7iM.png`,
    bindPopup: 'alt',
  }
];
