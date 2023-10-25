import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageKeys } from '../../common/language-keys';
import { SystemLogType } from '../../common/shared-types';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  language: LanguageKeys = new LanguageKeys();
  dropdownDefaultItem = { text: 'Please select..', value: '' };

  constructor(
    private router: Router,) { }

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

}
