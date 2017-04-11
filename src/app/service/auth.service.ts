import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

const TOKEN_KEY = 'TOKEN';

@Injectable()
export class AuthService {
  token: string;

  onReset = new Subject<boolean>();

  constructor(private http: Http) {
    this.getToken();
  }

  login(username, password: string): Observable<boolean> {
    const auth = {
      username: username,
      password: password
    };

    return this.http.post(`${environment.API_URL}/api/login`, auth)
      .map(resp => resp.json())
      .map(json => {
        if (json['data']) {
          this.saveToken(json['data']['jwt']);
          return true;
        } else {
          return false;
        }
      });
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, this.token);
  }

  getToken(): string {
    return this.token = localStorage.getItem(TOKEN_KEY);
  }

  reset() {
    this.token = '';
    localStorage.removeItem(TOKEN_KEY);
    this.onReset.next(true);
  }
}
