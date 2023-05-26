import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place = new Place('', '', '', '', 0);
  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) {
    this.activatedRoute.paramMap.subscribe((paramsMap) => {
      if (!paramsMap.has('offerId')) {
        this.navController.navigateBack(['places', 'offers']);
        return;
      }
      const place = this.placesService.getPlace(paramsMap.get('offerId')!);
      if (place) {
        this.place = place;
      } else {
        this.navController.navigateBack(['places', 'offers']);
      }
    });
  }

  ngOnInit() {}
}
