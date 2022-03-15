import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  nombre: string = '';

  constructor(private http: HttpClient) {}

  getUser() {
    this.http.get<User>('https://reqres.in/api/users/2').subscribe((res) => {
      this.nombre = res.data.first_name;
    });
  }
}
