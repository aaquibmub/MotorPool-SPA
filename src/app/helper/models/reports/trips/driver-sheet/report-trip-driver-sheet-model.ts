export class ReportTripDriverSheetModel {

  driverId: string;
  driverName: string;
  totalMilage: number;
  vehicalWiseTrips: ReportTripDriverSheetVehicalModel[];
}

export class ReportTripDriverSheetVehicalModel {

  vehicalPlateNumber: string;
  odoMeterAtDeparture: number;
  odoMeterAtReturn: number;
  fuelAtDeparture: number;
  fuelAtReturn: number;
  trips: ReportTripDriverSheetVehicalTripModel[];
}

export class ReportTripDriverSheetVehicalTripModel {

  tripId: string;
  departureLocation: string;
  destinations: ReportTripDriverSheetVehicalTripDestinationModel;
  meterStart: number;
  meterEnd: number;
  passenger: string;
}
export class ReportTripDriverSheetVehicalTripDestinationModel {

  type: string;
  address: string;
  arrivalTime?: Date;
  pickupTime?: Date;
}
