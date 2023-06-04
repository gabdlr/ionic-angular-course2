export class Booking {
  constructor(
    public bookedFrom: Date,
    public bookedTo: Date,
    public firstName: string,
    public guestNumber: number,
    public id: string,
    public lastName: string,
    public placeId: string,
    public placeImage: string,
    public placeTitle: string,
    public userId: string
  ) {}
}
