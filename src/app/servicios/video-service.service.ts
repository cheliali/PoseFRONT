import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

const baseurl = environment.baseurl;
@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  nombre: string = 'Poomsae Practice';

  constructor(private http: HttpClient) {}

  /* getUser() {
    this.http.get<User>('https://reqres.in/api/users/2').subscribe((res) => {
      this.nombre = res.data.first_name;
    });
  } */

  startStream() {
    return this.http.get(`${baseurl}/iniciar`);
  }

  stopStream() {
    return this.http.get(`${baseurl}/terminar`);
  }

  createUser(data: any) {
    return this.http.post(`${baseurl}/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${baseurl}/login`, data);
  }
}
