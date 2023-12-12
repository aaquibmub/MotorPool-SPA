export class ReportTripPassengerSheetModel {

  passengerName: string;
  totalMilage: number;
  vehicalWiseTrips: ReportTripPassengerSheetVehicalModel[];
}

export class ReportTripPassengerSheetVehicalModel {

  vehicalPlateNumber: string;
  odoMeterAtDeparture: number;
  odoMeterAtReturn: number;
  trips: ReportTripPassengerSheetVehicalTripModel[];
}

export class ReportTripPassengerSheetVehicalTripModel {

  tripId: string;
  departureLocation: string;
  destinations: ReportTripPassengerSheetVehicalTripDestinationModel;
  meterStart: number;
  meterEnd: number;
  passenger: string;
}
export class ReportTripPassengerSheetVehicalTripDestinationModel {

  type: string;
  address: string;
  arrivalTime?: Date;
  pickupTime?: Date;
}

