import { Injectable } from '@angular/core';
import { Place } from './place';
import { BehaviorSubject, map, take } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      '1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://www.dirt.com/wp-content/uploads/2022/03/albemarlebklyn_FI.jpg',
      400,
      new Date('2023-06-02'),
      new Date('2023-12-31'),
      'usr007'
    ),
    new Place(
      '2',
      "L'Amour Toujours",
      'Romantic place in Paris',
      'https://www.parisperfect.com/blog/wp-content/uploads/2016/02/The-6-Most-Romantic-Paris-Apartments-for-Lovebirds-by-Paris-Perfect1.jpg',
      189.99,
      new Date('2023-06-01'),
      new Date('2023-12-31'),
      'usr007'
    ),
    new Place(
      '3',
      'The Foggy Palace',
      'Not your average city trip',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      125.55,
      new Date('2023-06-01'),
      new Date('2023-12-31'),
      'usr005'
    ),
  ]);
  constructor(private loadingController: LoadingController) {}

  get places() {
    return this._places.asObservable();
  }

  addPlace(place: Place) {
    this.loadingController
      .create({ message: 'Creating place...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this._places.next([...this._places.getValue(), place]);
          loadingEl.dismiss();
        }, 1000);
      });
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => places.find((place) => place.id === id))
    );
  }

  updatePlace(place: Place) {
    const places = [...this._places.getValue()];
    const placeIndex = places.findIndex((place) => place.id === place.id);
    const newPlace = { ...places[placeIndex], ...place };
    places[placeIndex] = newPlace;
    this._places.next(places);
  }
}
