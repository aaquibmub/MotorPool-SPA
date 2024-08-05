export class TripStatusModel {
  id?: string;
  tripId: string;
  status: number;
  time?: Date;
  destinationId?: string;
  addressId?: string;
  remarks: string;
}
