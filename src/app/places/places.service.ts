import { Injectable } from '@angular/core';
import { Place } from './place';
import { BehaviorSubject, EMPTY, finalize, map, switchMap, tap } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlaceLocation } from './location.model';
import { AuthService } from '../auth/auth.service';
interface PlaceDTO {
  title: string;
  description: string;
  imageURL: string;
  price: number;
  availableFrom: string;
  availableTo: string;
  userId: string;
  placeLocation?: PlaceLocation;
}
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);
  constructor(
    private AuthService: AuthService,
    private httpClient: HttpClient,
    private loadingController: LoadingController
  ) {}

  get places() {
    return this._places.asObservable();
  }

  addPlace(place: Place) {
    this.loadingController
      .create({ message: 'Creating place...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.httpClient
          .post<{ name: string }>(
            environment.firebaseURL + 'offered-places.json',
            place
          )
          .pipe(
            tap((newPlaceId) => {
              place.id = newPlaceId.name;
              this._places.next([...this._places.getValue(), place]);
            }),
            finalize(() => loadingEl.dismiss())
          )
          .subscribe();
      });
  }

  fetchPlaces() {
    this.httpClient
      .get<{ [key: string]: PlaceDTO }>(
        environment.firebaseURL + 'offered-places.json'
      )
      .pipe(
        map((placesObj) => {
          const places: Place[] = [];
          for (const key in placesObj) {
            const placeObj = placesObj[key];
            const place = new Place(
              key,
              placeObj.title,
              placeObj.description,
              placeObj.imageURL,
              placeObj.price,
              new Date(placeObj.availableFrom),
              new Date(placeObj.availableTo),
              placeObj.userId,
              placeObj.placeLocation
            );
            places.push(place);
          }
          return places;
        }),
        tap((places) => this._places.next(places))
      )
      .subscribe();
  }

  getPlace(id: string) {
    return this.httpClient
      .get<PlaceDTO>(`${environment.firebaseURL}offered-places/${id}.json`)
      .pipe(
        map((placeDTO) => {
          const place = new Place(
            id,
            placeDTO.title,
            placeDTO.description,
            placeDTO.imageURL,
            placeDTO.price,
            new Date(placeDTO.availableFrom),
            new Date(placeDTO.availableTo),
            placeDTO.userId,
            placeDTO.placeLocation
          );
          return place;
        })
      );
  }

  updatePlace(place: Place) {
    const places = [...this._places.getValue()];
    const placeIndex = places.findIndex(
      (currentPlace) => currentPlace.id === place.id
    );
    const newPlace = { ...places[placeIndex], ...place, id: null };
    this.loadingController.create({ message: 'Updating...' }).then((el) => {
      el.present();
      this.httpClient
        .put(
          `${environment.firebaseURL}offered-places/${place.id}.json`,
          newPlace
        )
        .pipe(
          switchMap(() => {
            this.fetchPlaces();
            return EMPTY;
          }),
          finalize(() => el.dismiss())
        )
        .subscribe();
    });
  }

  uploadImage(image: Blob) {
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.httpClient.post<{ imageUrl: string; imagePath: string }>(
      'https://us-central1-ng-ionic-app.cloudfunctions.net/storeImage',
      uploadData,
      { headers: { Authorization: `Bearer ${this.AuthService.token}` } }
    );
  }
}
