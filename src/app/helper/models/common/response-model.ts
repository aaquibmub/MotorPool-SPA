export class ResponseModel<T> {
  result?: T;
  msg: string = '';
  hasError: boolean = false
}

