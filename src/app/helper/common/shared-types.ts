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
  StartsNow = 20
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
