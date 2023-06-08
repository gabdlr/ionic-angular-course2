export interface PlaceLocation extends Coordinates {
  address: string;
  staticMapImageURL: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}
