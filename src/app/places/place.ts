import { PlaceLocation } from './location.model';

export class Place {
  constructor(
    public id: string | null,
    public title: string,
    public description: string,
    public imageURL: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date,
    public userId: string,
    public placeLocation: PlaceLocation | null = null
  ) {}
}
