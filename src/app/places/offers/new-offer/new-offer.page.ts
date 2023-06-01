import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
  providers: [OffersService],
})
export class NewOfferPage implements OnInit {
  currentDate = new Date().toISOString();
  form;
  constructor(private offersService: OffersService) {
    this.form = this.offersService.form;
  }

  ngOnInit() {}

  onCreateOffer() {
    console.log(this.form);
  }
}
