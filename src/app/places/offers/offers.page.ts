import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  constructor(private placesService: PlacesService) {}
  loadedOffers = this.placesService.places;
  ngOnInit() {}
}
