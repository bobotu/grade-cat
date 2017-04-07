import { Injectable, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { environment } from "../../environments/environment";

const API_URL = !environment.production ? "http://127.0.0.1:5000" : "";
const TOKEN_KEY = "TOKEN";

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http) {
    this.getToken();
  }

  login(username, password: string): Observable<boolean> {
    let auth = {
      username: username,
      password: password
    };

    return this.http.post(`${API_URL}/api/login`, auth)
      .map(resp => resp.json())
      .map(json => {
        if (json["data"]) {
          this.saveToken(json["data"]["jwt"]);
          return true;
        } else {
          return false;
        }
      })
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, this.token);
  }

  getToken(): string {
    return this.token = localStorage.getItem(TOKEN_KEY)
  }

  clearToken() {
    this.token = "";
    localStorage.removeItem(TOKEN_KEY)
  }
}
