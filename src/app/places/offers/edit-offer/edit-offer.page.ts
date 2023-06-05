import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { OffersService } from '../offers.service';
import { EMPTY, catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  providers: [OffersService],
})
export class EditOfferPage implements OnInit {
  form;
  place?: Place;
  place$ = of(
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
    private navController: NavController,
    private offersService: OffersService,
    private placesService: PlacesService
  ) {
    this.form = this.offersService.form;
    this.activatedRoute.paramMap.subscribe((paramsMap) => {
      if (!paramsMap.has('offerId')) {
        this.navController.navigateBack(['places', 'offers']);
        return;
      }
      const place = this.placesService.getPlace(paramsMap.get('offerId')!).pipe(
        catchError((err) => {
          this.navController.navigateBack(['places', 'offers']);
          return EMPTY;
        })
      );
      if (place) {
        this.place$ = place;
        this.place$.pipe(take(1)).subscribe({
          next: (place) => {
            this.place = place;
            this.form.patchValue({
              title: place.title,
              description: place.description,
              price: place.price,
              dateFrom: place.availableFrom.toISOString(),
              dateTo: place.availableTo.toISOString(),
            });
          },
        });
      }
    });
  }

  ngOnInit() {}
  onUpdateOffer() {
    if (this.form.invalid) return;
    if (this.place) {
      if (this.form.value.dateFrom) {
        this.place.availableFrom = new Date(this.form.value.dateFrom);
      }
      if (this.form.value.dateTo) {
        this.place.availableTo = new Date(this.form.value.dateTo);
      }
      this.place.title = this.form.value.title ?? this.place.title;
      this.place.description =
        this.form.value.description ?? this.place.description;
      this.place.price = this.form.value.price ?? this.place.price;
      this.placesService.updatePlace(this.place);
      this.navController.navigateBack(['places', 'offers']);
    }
  }
}
