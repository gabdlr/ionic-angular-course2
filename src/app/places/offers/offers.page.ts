import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, ViewWillEnter {
  constructor(private placesService: PlacesService) {}
  loadedOffers$ = this.placesService.places;

  ngOnInit() {}
  ionViewWillEnter() {
    this.placesService.fetchPlaces();
  }
  onEdit(id: string) {}
}
