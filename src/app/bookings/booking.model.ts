export class Booking {
  constructor(
    public guestNumber: number,
    public id: string,
    public placeId: string,
    public placeTitle: string,
    public userId: string
  ) {}
}
