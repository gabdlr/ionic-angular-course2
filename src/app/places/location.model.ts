export interface PlaceLocation extends Coordinates {
  address: string;
  staticMapImageURL: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
