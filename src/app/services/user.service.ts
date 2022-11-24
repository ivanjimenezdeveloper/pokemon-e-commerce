import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  checkLogIn(username: string, password: string): Observable<boolean> {
    if (username === 'ivan' && password === 'sarandonga') {
      return of(true);
    }
    return of(false);
  }
}
