import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { PlacesService } from '../../places.service';
import { Place } from '../../place';
import { AuthService } from '../../../auth/auth.service';
import { NavController } from '@ionic/angular';
const imageURL =
  'https://www.parisperfect.com/blog/wp-content/uploads/2016/02/The-6-Most-Romantic-Paris-Apartments-for-Lovebirds-by-Paris-Perfect1.jpg';
@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
  providers: [OffersService],
})
export class NewOfferPage implements OnInit {
  currentDate = new Date().toISOString();
  form;
  constructor(
    private authService: AuthService,
    private offersService: OffersService,
    private placesService: PlacesService,
    private navController: NavController
  ) {
    this.form = this.offersService.form;
  }

  ngOnInit() {}

  onCreateOffer() {
    const place = new Place(
      null,
      this.form.value.title ?? '',
      this.form.value.description ?? '',
      imageURL,
      this.form.value.price ?? 0,
      new Date(this.form.value.dateFrom ?? new Date().toString()),
      new Date(this.form.value.dateTo ?? new Date().toString()),
      this.authService.userId,
      this.form.value.location
    );
    this.placesService.addPlace(place);
    this.navController.pop();
  }
}
