import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { GradesResponse } from '../types/types';

const baseurl = environment.baseurl;
@Injectable({
  providedIn: 'root',
})
export class VideoServiceService {
  constructor(private http: HttpClient) {}

  startStream(datos: string) {
    return this.http.get(`${baseurl}/iniciar${datos}`);
  }

  stopStream() {
    return this.http.get(`${baseurl}/terminar`);
  }

  evaluate() {
    return this.http.get<GradesResponse[]>(`${baseurl}/evaluate`);
  }
}
