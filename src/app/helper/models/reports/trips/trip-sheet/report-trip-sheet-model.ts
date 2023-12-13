export class ReportTripSheetModel {
  tripId: string;
  departureLocation: string;
  destinations: ReportTripDestinationModel[];
  meterStart: number;
  meterEnd: number;
  passenger: string;
}
export class ReportTripDestinationModel {

  type: string;
  address: string;
  arrivalTime?: Date;
  pickupTime?: Date;
}
