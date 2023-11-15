export class TripCountModel {

  todayTrips: number;
  todayOngoing: number;
  todayInQueue: number;

  ongoingTrips: number;
  ongoingInDq: number;
  ongoingOutDq: number;

  activeVehicles: number;
  allocatedVehicles: number;
  unallocatedVehicles: number;

  activeDrivers: number;
  busyDrivers: number;
  idleDrivers: number;
}
