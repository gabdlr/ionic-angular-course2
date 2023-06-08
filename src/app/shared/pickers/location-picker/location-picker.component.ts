import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { finalize, map, of, switchMap } from 'rxjs';
import { GeocodeResponse } from '../../models/GeocodeResponse';
import { PlaceLocation } from '../../../places/location.model';
@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  isLoading = false;
  selectedLocationImage?: string;
  constructor(
    private httpClient: HttpClient,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  onPickLocation() {
    this.modalController.create({ component: MapModalComponent }).then((el) => {
      el.present();
      el.onDidDismiss().then(
        (value: {
          data?: { lat: number; lng: number } | null;
          role?: string;
        }) => {
          if (value.role && value.role === 'selection') {
            this.isLoading = true;
            if (value.data) {
              const pickedLocation: PlaceLocation = {
                address: '',
                lat: value.data.lat ?? 0,
                lng: value.data.lng ?? 0,
                staticMapImageURL: '',
              };
              this.getAddress(value.data.lat, value.data.lng)
                .pipe(
                  switchMap((address) => {
                    pickedLocation.address = address ?? '';
                    return of(
                      this.getMapImage(pickedLocation.lat, pickedLocation.lng)
                    );
                  }),
                  finalize(() => (this.isLoading = false))
                )
                .subscribe((staticMapImageURL) => {
                  pickedLocation.staticMapImageURL = staticMapImageURL;
                  this.selectedLocationImage = staticMapImageURL;
                });
            }
          }
        }
      );
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
}
