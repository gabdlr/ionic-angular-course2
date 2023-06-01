import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  providers: [OffersService],
})
export class EditOfferPage implements OnInit {
  form;
  place: Place = new Place(
    '',
    '',
    '',
    '',
    0,
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1))
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
      const place = this.placesService.getPlace(paramsMap.get('offerId')!);
      if (place) {
        this.place = place;
        this.form.patchValue({
          title: this.place.title,
          description: this.place.description,
          price: this.place.price,
        });
      } else {
        this.navController.navigateBack(['places', 'offers']);
      }
    });
  }

  ngOnInit() {}
  onUpdateOffer() {
    if (this.form.invalid) return;
    console.log(this.form);
  }
}
