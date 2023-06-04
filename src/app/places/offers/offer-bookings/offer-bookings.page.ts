import { Component, OnInit } from '@angular/core';
import { Place } from '../../place';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place$: Observable<Place> = of(
    new Place(
      '',
      '',
      '',
      '',
      0,
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
      ''
    )
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('offerId')) {
        this.navController.navigateBack(['places', 'offers']);
        return;
      }
      const place = this.placesService.getPlace(paramMap.get('offerId')!);
      if (place) {
        this.place$ = <Observable<Place>>place;
      } else {
        this.navController.navigateBack(['places', 'offers']);
        return;
      }
    });
  }
}
