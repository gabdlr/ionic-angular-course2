import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
interface GoogleModule extends Window {
  google?: any;
}
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() center = { lat: -34.610446, lng: -58.380541 };
  @Input() closeButtonText = 'Cancel';
  @Input() selectable = true;
  @Input() title = 'Pick location';
  clickListener: any;
  googleMaps: any;
  @ViewChild('map') mapElementRef?: ElementRef<HTMLDivElement>;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalController: ModalController,
    private renderer2: Renderer2,
    private window: Window
  ) {}
  ngAfterViewInit(): void {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googleMaps = googleMaps;
        const mapElement = this.mapElementRef?.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: this.center,
          zoom: 16,
        });

        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer2.addClass(mapElement, 'visible');
        });

        if (this.selectable) {
          this.clickListener = map.addListener('click', (event: any) => {
            const selectedCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            this.modalController.dismiss(selectedCoords, 'selection');
          });
        } else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map: map,
            title: 'Location',
          });
          marker.setMap(map);
        }
      })
      .catch();
  }

  ngOnInit() {}
  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  private getGoogleMaps() {
    const window = <GoogleModule>this.window;
    if (window.google && window.google.maps) {
      return Promise.resolve(window.google.maps);
    } else {
      return new Promise((res, rej) => {
        const script = this.document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapsAPIKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        this.document.body.appendChild(script);
        script.onload = (e) => {
          if (window.google && window.google.maps) {
            res(window.google.maps);
          } else {
            rej('Google maps SDK not available');
          }
        };
      });
    }
  }

  ngOnDestroy() {
    if (this.googleMaps && this.clickListener) {
      this.googleMaps.event.removeListener(this.clickListener);
    }
  }
}
