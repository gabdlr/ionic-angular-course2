import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../place';
import { AuthService } from '../../auth/auth.service';

@Pipe({
  name: 'placesFilter',
})
export class PlacesFilterPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  transform(
    places: Place[] | null,
    filterBy: 'all' | 'bookable'
  ): Place[] | null {
    if (filterBy === 'bookable') {
      if (!places) return null;
      const filteredByBookable = places.filter(
        (place) => place.userId !== this.authService.userId
      );
      return filteredByBookable;
    }
    return places;
  }
}
