import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  loading = false;
  error = false;
  done = false;

  email: string;
  description: string;
  imgs: File[] = [];
  imgUrls: string[] = [];

  constructor(private _auth: AuthService,
              private http: Http,
              private _location: Location) { }

  submit(fbForm: FormControl) {
    if (fbForm.invalid) {
      return;
    }
    const form = new FormData();
    form.append('jwt', this._auth.token);
    form.append('description', this.description);
    form.append('email', this.email);
    this.imgs.forEach(img => form.append('imgs', img));

    this.loading = true;
    this.done = false;
    this.error = false;

    this.http.post(`${environment.API_URL}/api/feedback`, form)
      .subscribe(
        ok => {
          this.loading = false;
          this.done = true;
        },
        err => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  addImg(list: FileList) {
    const last = list[list.length - 1];
    this.imgs.push(last);
    this.imgUrls.push(URL.createObjectURL(last));
  }

  close() {
    this.imgUrls.forEach(url => URL.revokeObjectURL(url));
    this.imgs = [];
    this.imgUrls = [];
    this.email = '';
    this.description = '';
    this.loading = false;
    this.error = false;
    this.done = false;
    this._location.back();
  }

  track(_: number, url: string) {
    return url;
  }
}
