import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  type: string = 'test';
  isLoggedIn: boolean = false;
  currentUser: object = {};
  session = '';

}
