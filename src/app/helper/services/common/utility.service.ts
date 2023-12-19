import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IntlService } from '@progress/kendo-angular-intl';
import { ZonedDate } from '@progress/kendo-date-math';
import { Howl, Howler } from 'howler';
import { LanguageKeys } from '../../common/language-keys';
import { DriverStatus, Gender, GetDriverStatusForDropdownList, GetGenderForDropdownList, GetOpmForDropdownList, GetTripDestinationForDropdownList, GetTripStatusForDropdownList, GetTripTypeForDropdownList, GetVehicalStatusForDropdownList, OPM, SystemLogType, TripDestination, TripStatus, TripType, VehicalStatus } from '../../common/shared-types';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  language: LanguageKeys = new LanguageKeys();
  dropdownDefaultItem = { text: 'Please select..', value: '' };
  dropdownAllItem = { text: 'All', value: null };

  constructor(
    private router: Router,
    private authService: AuthService,
    private intl: IntlService,
  ) { }

  scrollToFirstInvalidControl(
    element: ElementRef,
    container: string): void {
    let firstInvalidControl: HTMLElement = element.nativeElement.querySelector(
      'form .ng-invalid'
    );
    do {
      const firstInvalidChildControl = firstInvalidControl.querySelector('.ng-invalid');
      if (firstInvalidChildControl) {
        firstInvalidControl = firstInvalidChildControl as HTMLElement;
      } else {
        break;
      }
    } while (1);

    const containerOffset = $(container)?.offset()?.top;
    const top = firstInvalidControl.offsetTop - (containerOffset ?? 0);
    // const top = $('#' + firstInvalidControl.id).scrollTop() - containerOffset;
    $(container).animate({
      scrollTop: top - 100
    }, 1000);

    setTimeout(() => {

      $(firstInvalidControl).parents().map(function () {
        if (this.className === 'panel-content') {
          $('.' + this.className).hide();
          $(this).show();
        }
        return this.tagName;
      });

      firstInvalidControl.focus();
      firstInvalidControl.blur();
      firstInvalidControl.focus();

      const invalidInput = firstInvalidControl.querySelector('input');
      if (invalidInput && invalidInput.tagName === 'INPUT') {
        invalidInput.focus();
        invalidInput.blur();
        invalidInput.focus();
      }

    }, 1000);
  }

  buildFormData<T>(formData: FormData, data: T, parentKey?: string): void {
    if (Array.isArray(data)) {
      data.forEach((el) => {
        this.buildFormData(formData, el, parentKey);
      });
    } else if (typeof data === 'object'
      && !(data instanceof File)
      && !(data === null)
      && !(data instanceof Date)) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          (data as any)[key], parentKey ? `${parentKey}.${key}` : key);
      });

    } else {
      if (!data) {
        return;
      }

      const value = typeof data === 'boolean'
        || typeof data === 'number' ? data.toString() :
        (data instanceof Date ? data.toJSON() : data);

      formData.append(parentKey as string, value as string);
    }
  }

  redirectToUrl(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  matches(el, selector): any {
    return (el.matches || el.msMatchesSelector).call(el, selector);
  }

  getSystemLogTypeLabel(type: SystemLogType): string {
    if (type === SystemLogType.Error) {
      return 'Error';
    }
    if (type === SystemLogType.Exception) {
      return 'Exception';
    }
    if (type === SystemLogType.Success) {
      return 'Success';
    }
    if (type === SystemLogType.Warning) {
      return 'Warning';
    }
    return '';

  }

  getVehicalStatusLabel(value: VehicalStatus): string {
    var statusList = GetVehicalStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getDriverStatusLabel(value: DriverStatus): string {
    var statusList = GetDriverStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getGenderLabel(value: Gender): string {
    var statusList = GetGenderForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getOpmLabel(value: OPM): string {
    var statusList = GetOpmForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripTypeLabel(value: TripType): string {
    var statusList = GetTripTypeForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripDestinationLabel(value: TripDestination): string {
    var statusList = GetTripDestinationForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripStatusLabel(value: TripStatus): string {
    var statusList = GetTripStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  formatDate(value: Date, args?: string): string {
    if (!value || value === null) {
      return '';
    }
    if (args) {
      const user = this.authService.getCurrentUser();
      let tzDate: ZonedDate = null;
      try {
        const dateValue = new Date(value);
        // const zone = zonesPerGroup(user.timeZoneID)[0];
        tzDate = ZonedDate.fromLocalDate(
          dateValue,
          'ar-SA');

      } catch (e) {
        console.log(e);
      }
      if (tzDate) {
        return this.intl.formatDate(tzDate.toUTCDate(), args);
      } else {
        const date = new Date(value);
        const utc = date.getTime() - (date.getTimezoneOffset() * 60000);
        const dateTime = new Date(utc);
        return this.intl.formatDate(dateTime, args);
      }
    }
    return this.intl.formatDate(new Date(value))
  }

  playNotificationSound(): void {
    var sound = new Howl({
      src: ['/assets/notification-sound-1.wav']
    });

    sound.play();

    Howler.volume(1);

  }

}
