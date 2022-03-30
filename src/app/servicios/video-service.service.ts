import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  nombre: string = 'Estimación de Pose';

  constructor(private http: HttpClient) {}

  /* getUser() {
    this.http.get<User>('https://reqres.in/api/users/2').subscribe((res) => {
      this.nombre = res.data.first_name;
    });
  } */

  startStream() {
    return this.http.get('http://127.0.0.1:5000/iniciar');
  }

  stopStream() {
    return this.http.get('http://127.0.0.1:5000/terminar');
  }
}
