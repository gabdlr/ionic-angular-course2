import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../place';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input({ required: true }) offer!: Place;
  constructor() {}

  ngOnInit() {}
  getDummyDate() {
    return new Date();
  }
}
