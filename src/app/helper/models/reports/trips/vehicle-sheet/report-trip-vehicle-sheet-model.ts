export class ReportTripVehicleSheetModel {
  vehicleId: string;
  vehicalPlateNumber: string;
  odoMeterAtDeparture: number;
  odoMeterAtReturn: number;
  fuelAtDeparture: number;
  fuelAtReturn: number;
  vehicalWiseTrips: ReportTripVehicleSheetDriverModel[];
}

export class ReportTripVehicleSheetDriverModel {

  driverId: string;
  driverName: string;
  totalMilage: number;
  trips: ReportTripVehicleSheetDriverTripModel[];
}

export class ReportTripVehicleSheetDriverTripModel {

  tripId: string;
  departureLocation: string;
  destinations: ReportTripVehicleSheetDriverTripDestinationModel;
  meterStart: number;
  meterEnd: number;
  passenger: string;
}
export class ReportTripVehicleSheetDriverTripDestinationModel {

  type: string;
  address: string;
  arrivalTime?: Date;
  pickupTime?: Date;
}

