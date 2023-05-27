import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  constructor(private placesService: PlacesService) {
    this.loadedPlaces = this.placesService.places;
  }
  ngOnInit() {}
  onFilterUpdate(event: Event) {
    const castedEvent = <CustomEvent<SegmentChangeEventDetail>>event;
  }
}
