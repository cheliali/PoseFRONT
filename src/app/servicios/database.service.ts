import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModHistory, DBHistoryItem, DBPoomsaes } from '../types/types';

const baseurl = environment.baseurl;
const today = new Date();
// const history: DBHistoryItem[] = [
//   {
//     _id: '1',
//     poomsae: 'Poomsae 1',
//     pose: 'Oen Arae Makki',
//     date: Date.now(),
//     picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
//     observations: [
//       { name: 'codo izquierdo', grade: '100', improve: 'Aumentar inclinación' },
//       { name: 'codo derecho', grade: '90', improve: 'Disminuir inclinación' },
//     ],
//   },
//   {
//     _id: '1',
//     poomsae: 'Poomsae 1',
//     pose: 'Oen Arae Makki',
//     date: today.setDate(today.getDate() + 1),
//     picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
//     observations: [
//       { name: 'codo izquierdo', grade: '100', improve: 'Aumentar inclinación' },
//       { name: 'codo derecho', grade: '90', improve: 'Disminuir inclinación' },
//     ],
//   },
//   {
//     _id: '1',
//     poomsae: 'Poomsae 1',
//     pose: 'Oen Arae Makki',
//     date: today.setDate(today.getDate() + 2),
//     picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
//     observations: [
//       { name: 'codo izquierdo', grade: '100', improve: 'Aumentar inclinación' },
//       { name: 'codo derecho', grade: '90', improve: 'Disminuir inclinación' },
//     ],
//   },
// ];

@Injectable({
  providedIn: 'root',
})
export class DBService {
  username: string = '';
  poomsaes!: DBPoomsaes[];

  constructor(private http: HttpClient) {}

  createUser(data: any) {
    return this.http.post(`${baseurl}/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${baseurl}/login`, data);
  }

  getHistory() {
    return this.http.get<DBHistoryItem[]>(`${baseurl}/getHistory?userid=${this.username}`).pipe(
      // return of(history).pipe(
      map((res) => {
        const modifiedHistory: ModHistory = {};
        res.forEach((historyItem) => {
          const currHistoryItem = modifiedHistory[historyItem.pose];
          const newDate = moment(historyItem.date).format('DD MMM YYYY hh:mm a');
          const newBestGrade =
            historyItem.observations.reduce((prev, curr) => {
              return prev + +curr.grade;
            }, 0) / historyItem.observations.length;
          if (currHistoryItem) {
            const lastPractice = moment(newDate).isAfter(currHistoryItem.lastPractice)
              ? newDate
              : currHistoryItem.lastPractice;
            const bestGrade = Number(
              Math.max(currHistoryItem.bestGrade || 0, newBestGrade).toFixed(2)
            );

            modifiedHistory[historyItem.pose] = {
              ...currHistoryItem,
              lastPractice,
              bestGrade,
              rate: Math.round((bestGrade * 5) / 100),
              practices: [...currHistoryItem.practices, { ...historyItem, date: newDate }],
            };
          } else {
            modifiedHistory[historyItem.pose] = {
              poomsae: historyItem.poomsae,
              pose: historyItem.pose,
              lastPractice: newDate,
              bestGrade: Number(newBestGrade.toFixed(2)),
              rate: Math.round((newBestGrade * 5) / 100),
              practices: [{ ...historyItem, date: newDate }],
            };
          }
        });

        return modifiedHistory;
      })
    );
  }

  getPoomsaes() {
    return this.http.get<DBPoomsaes[]>(`${baseurl}/getpoomsaeposes`);
  }
}
