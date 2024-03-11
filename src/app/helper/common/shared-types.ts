import { DropdownItem } from '../models/common/dropdown/dropdown-item.model';

export enum DropdownType {
  Gender = 10,
  TripRoute = 20,
  TripStatus = 25,
  TripDestination = 30,
  Opm = 40
}

export enum Gender {
  Male = 10,
  Female = 20
}
export function GetGenderForDropdownList():
  DropdownItem<Gender>[] {
  return [
    {
      value: Gender.Male,
      text: 'Male'
    },
    {
      value: Gender.Female,
      text: 'Female'
    },
  ];
}



export enum OPM {

}

export enum TripType {
  Scheduled = 10,
  StartsNow = 20,
  Refuelling = 30,

  Today = 400,
  Ongoing = 500,
  Upcoming = 600,
  CurrentMonth = 700
}

export function GetTripTypeForDropdownList():
  DropdownItem<TripType>[] {
  return [
    {
      value: TripType.Scheduled,
      text: 'Scheduled'
    },
    {
      value: TripType.StartsNow,
      text: 'New Trip'
    },
    {
      value: TripType.Refuelling,
      text: 'Refuelling'
    },
    {
      value: TripType.Today,
      text: 'Today'
    },
    {
      value: TripType.Ongoing,
      text: 'Ongoing'
    },
  ];
}

export enum TripRoute {
  Oneway = 10,
  RoundTrip = 20,
  Open = 30
}

export function GetTripRouteForDropdownList():
  DropdownItem<TripRoute>[] {
  return [
    {
      value: TripRoute.Oneway,
      text: 'Onway'
    },
    {
      value: TripRoute.RoundTrip,
      text: 'Round Trip'
    },
    {
      value: TripRoute.Open,
      text: 'Open'
    },
  ];
}

export enum TripDestination {
  InDQ = 10,
  OutOfDQ = 20,
  OutOfRiyadh = 30,
  OutOfKingdom = 40
}

export function GetTripDestinationForDropdownList():
  DropdownItem<TripDestination>[] {
  return [
    {
      value: TripDestination.InDQ,
      text: 'In DQ'
    },
    {
      value: TripDestination.OutOfDQ,
      text: 'Out Of DQ'
    },
    {
      value: TripDestination.OutOfRiyadh,
      text: 'Out Of Riyadh'
    },
    {
      value: TripDestination.OutOfKingdom,
      text: 'Out Of Kingdom'
    },
  ];
}

export enum ResponseAction {

}
export enum SystemLogType {
  Error = 10,
  Warning = 20,
  Success = 30,
  Exception = 40
}

export enum UserRoleType {
  All = 0,
  Admin = 5,
  Dispatcher = 10,
  Driver = 20,
  Maintainance = 30
}

export function GetUserRoleListForNotification():
  DropdownItem<UserRoleType>[] {
  return [
    {
      value: UserRoleType.All,
      text: 'All'
    },
    ...GetUserRoleTypeForDropdownList()
  ];
}

export function GetUserRoleTypeForDropdownList():
  DropdownItem<UserRoleType>[] {
  return [
    {
      value: UserRoleType.Admin,
      text: 'Admin'
    },
    {
      value: UserRoleType.Dispatcher,
      text: 'Dispatcher'
    },
    {
      value: UserRoleType.Maintainance,
      text: 'Maintainance'
    },
    {
      value: UserRoleType.Driver,
      text: 'Driver'
    }
  ];
}


export enum NotificationFor {
  All = 0,
  Trips = 100,
  Inspections = 200,
  Settings = 700
}

export function GetNotificationForDropdownList():
  DropdownItem<NotificationFor>[] {
  return [
    {
      value: NotificationFor.All,
      text: 'All'
    },
    {
      value: NotificationFor.Trips,
      text: 'Trips'
    },
    {
      value: NotificationFor.Inspections,
      text: 'Inspections'
    },
    {
      value: NotificationFor.Settings,
      text: 'Settings'
    },
  ];
}

export enum DestinationType {
  Pickup = 10,
  Stop = 20,
  Dropoff = 30,
  Address = 40
}

export function GetDestinationTypeForDropdownList():
  DropdownItem<DestinationType>[] {
  return [
    {
      value: DestinationType.Pickup,
      text: 'Pickup'
    },
    {
      value: DestinationType.Stop,
      text: 'Stop'
    },
    {
      value: DestinationType.Dropoff,
      text: 'Dropoff'
    },
    {
      value: DestinationType.Address,
      text: 'Address'
    },
  ];
}


export enum TripStatus {
  Created = 10,
  AssignedToDriver = 20,
  TripStarted = 30,
  OdoMeterAtStart = 35,
  VehicalDispatched = 40,
  ArrivedAtPickupLocation = 50,
  WaitingForPassenger = 52,
  PassengerOnboarded = 55,
  ArrivedAtStop = 60,
  WaitingForStopActivity = 62,
  TripResumedAfterStop = 65,
  ArrivedAtAddress = 66,
  WaitingForAddressActivity = 67,
  TripResumedAfterAddress = 68,
  ArrivedAtDropoff = 70,
  OdoMeterAtEnd = 80,
  Completed = 400,
  Cancelled = 500
}


export function GetTripStatusForDropdownList():
  DropdownItem<TripStatus>[] {
  return [
    {
      value: TripStatus.Created,
      text: 'Created'
    },
    {
      value: TripStatus.AssignedToDriver,
      text: 'Assigned To Driver'
    },
    {
      value: TripStatus.TripStarted,
      text: 'Trip Started'
    },
    {
      value: TripStatus.OdoMeterAtStart,
      text: 'ODO Meter At Start'
    },
    {
      value: TripStatus.VehicalDispatched,
      text: 'Vehical Dispatched'
    },
    {
      value: TripStatus.ArrivedAtPickupLocation,
      text: 'Arrived At Pickup Location'
    },
    {
      value: TripStatus.WaitingForPassenger,
      text: 'Waiting For Passenger'
    },
    {
      value: TripStatus.PassengerOnboarded,
      text: 'Passenger Onboarded'
    },
    {
      value: TripStatus.ArrivedAtStop,
      text: 'Arrived At Stop'
    },
    {
      value: TripStatus.WaitingForStopActivity,
      text: 'Waiting For Stop Activity'
    },
    {
      value: TripStatus.TripResumedAfterStop,
      text: 'Trip Resumed After Stop'
    },
    {
      value: TripStatus.ArrivedAtAddress,
      text: 'Arrived At Address'
    },
    {
      value: TripStatus.WaitingForAddressActivity,
      text: 'Waiting For Address Activity'
    },
    {
      value: TripStatus.TripResumedAfterAddress,
      text: 'Trip Resumed After Address'
    },
    {
      value: TripStatus.ArrivedAtDropoff,
      text: 'Arrived At Dropoff'
    },
    {
      value: TripStatus.OdoMeterAtEnd,
      text: 'ODO Meter At End'
    },
    {
      value: TripStatus.Completed,
      text: 'Completed'
    },
    {
      value: TripStatus.Cancelled,
      text: 'Cancelled'
    },
  ];
}

export enum VehicalStatus {
  Active = 10,
  Inactive = 20,
  Maintenance = 30,
  Gripped = 40
}

export function GetVehicalStatusForDropdownList():
  DropdownItem<VehicalStatus>[] {
  return [
    {
      value: VehicalStatus.Active,
      text: 'Active'
    },
    {
      value: VehicalStatus.Inactive,
      text: 'Disabled'
    },
    {
      value: VehicalStatus.Maintenance,
      text: 'Maintenance'
    },
    {
      value: VehicalStatus.Gripped,
      text: 'Gripped'
    },
  ];
}

export function GetBooleanForDropdownList():
  DropdownItem<boolean>[] {
  return [
    {
      value: true,
      text: 'Yes'
    },
    {
      value: false,
      text: 'No'
    },
  ];
}

export function GetBooleanStatusForDropdownList():
  DropdownItem<boolean>[] {
  return [
    {
      value: true,
      text: 'Active'
    },
    {
      value: false,
      text: 'Disabled'
    },
  ];
}

export enum DriverStatus {
  Idle = 10,
  Busy = 20,
  OnDuty = 40,
  OffDuty = 50
}


export function GetDriverStatusForDropdownList():
  DropdownItem<DriverStatus>[] {
  return [
    {
      value: DriverStatus.Idle,
      text: 'Idle'
    },
    {
      value: DriverStatus.Busy,
      text: 'Busy'
    },
    {
      value: DriverStatus.OnDuty,
      text: 'On-Duty'
    },
    {
      value: DriverStatus.OffDuty,
      text: 'Off-Duty'
    },
  ];
}



export enum OPM {
  SaudiSide = 10,
  USSide = 20
}
export function GetOpmForDropdownList():
  DropdownItem<OPM>[] {
  return [
    {
      value: OPM.SaudiSide,
      text: 'Saudi Side'
    },
    {
      value: OPM.USSide,
      text: 'US Side'
    },
  ];
}

export enum DataImportEntity {
  Passenger = 10,
  Address = 20
}

export enum DataImportStatus {
  InProgress = 10,
  Completed = 20,
  Failed = 30
}
