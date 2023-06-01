import { Injectable } from '@angular/core';
import { Place } from './place';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      '1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://www.dirt.com/wp-content/uploads/2022/03/albemarlebklyn_FI.jpg',
      400,
      new Date('2023-06-01'),
      new Date('2023-12-31')
    ),
    new Place(
      '2',
      "L'Amour Toujours",
      'Romantic place in Paris',
      'https://www.parisperfect.com/blog/wp-content/uploads/2016/02/The-6-Most-Romantic-Paris-Apartments-for-Lovebirds-by-Paris-Perfect1.jpg',
      189.99,
      new Date('2023-06-01'),
      new Date('2023-12-31')
    ),
    new Place(
      '3',
      'The Foggy Palace',
      'Not your average city trip',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      125.55,
      new Date('2023-06-01'),
      new Date('2023-12-31')
    ),
  ];
  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    const place = this._places.find((place) => place.id === id);
    if (place) {
      return { ...place };
    }
    return undefined;
  }
}
