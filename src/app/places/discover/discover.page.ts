import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces$: Observable<Place[]>;
  filterPlacesBy: 'all' | 'bookable' = 'all';
  constructor(private placesService: PlacesService) {
    this.loadedPlaces$ = this.placesService.places;
  }
  ionViewWillEnter() {
    this.placesService.fetchPlaces();
  }
  ngOnInit() {}

  onFilterUpdate(event: Event) {
    const castedEvent = <CustomEvent<SegmentChangeEventDetail>>event;
    const selectedFilter = castedEvent.detail.value as 'all' | 'bookable';
    this.filterPlacesBy = selectedFilter;
  }
}
