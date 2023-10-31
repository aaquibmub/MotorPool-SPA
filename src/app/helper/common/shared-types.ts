import { DropdownItem } from '../models/common/dropdown/dropdown-item.model';

export enum DropdownType {
  Gender = 10,
  TripRoute = 20,
  TripDestination = 30
}

export enum Gender {
  Male = 10,
  Female = 20
}


export enum OPM {

}

export enum TripType {
  Scheduled = 10,
  StartsNow = 20,
  Refuelling = 30,

  Today = 400,
  Ongoing = 500
}

export enum TripRoute {

}

export enum TripDestination {

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
  Dropoff = 30
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
  ArrivedAtDropoff = 70,
  OdoMeterAtEnd = 80,
  Completed = 400,
  Cancelled = 500
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
      text: 'Inactive'
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
