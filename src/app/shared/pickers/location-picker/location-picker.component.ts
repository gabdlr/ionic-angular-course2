import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { finalize, map, of, switchMap } from 'rxjs';
import { GeocodeResponse } from '../../models/GeocodeResponse';
import { Coordinates, PlaceLocation } from '../../../places/location.model';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  isLoading = false;
  selectedLocationImage?: string;
  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  onPickLocation() {
    this.actionSheetController
      .create({
        header: 'Please choose',
        buttons: [
          { text: 'Auto-Locate', handler: () => this.locateUser() },
          { text: 'Pick on map', handler: () => this.openMap() },
          { text: 'Cancel', role: 'cancel' },
        ],
      })
      .then((el) => {
        el.present();
      });
  }

  private createAddress(coordinates: Coordinates) {
    this.isLoading = true;
    const pickedLocation: PlaceLocation = {
      address: '',
      lat: coordinates.lat ?? 0,
      lng: coordinates.lng ?? 0,
      staticMapImageURL: '',
    };
    this.getAddress(coordinates.lat, coordinates.lng)
      .pipe(
        switchMap((address) => {
          pickedLocation.address = address ?? '';
          return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng));
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((staticMapImageURL) => {
        pickedLocation.staticMapImageURL = staticMapImageURL;
        this.selectedLocationImage = staticMapImageURL;
        this.locationPick.emit(pickedLocation);
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.httpClient
      .get<GeocodeResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsAPIKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:PlaceC%7C${lat},${lng}
    &key=${environment.mapsAPIKey}`;
  }

  private async locateUser() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const coordinates: Coordinates = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      this.createAddress(coordinates);
    } catch (error) {
      this.alertController
        .create({
          header: 'Could not fetch location',
          message: 'Please use the map to pick a location',
          buttons: [{ text: 'OK', handler: () => this.openMap() }],
        })
        .then((el) => el.present());
    }
  }

  private openMap() {
    this.modalController.create({ component: MapModalComponent }).then((el) => {
      el.present();
      el.onDidDismiss().then(
        (value: { data?: Coordinates | null; role?: string }) => {
          if (value.role && value.role === 'selection') {
            if (value.data) {
              this.createAddress({
                lat: value.data.lat ?? 0,
                lng: value.data.lng ?? 0,
              });
            }
          }
        }
      );
    });
  }
}
