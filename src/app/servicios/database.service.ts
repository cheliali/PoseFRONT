import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, of } from 'rxjs';
import { ModHistory, DBHistoryItem, DBPoomsaes } from '../types/types';

const history: DBHistoryItem[] = [
  {
    _id: '1',
    poomsae: 'poomsae 1',
    pose: 'are maki',
    date: Date.now(),
    picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 90, improve: 'Disminuir inclinación' },
    ],
  },
  {
    _id: '2',
    poomsae: 'poomsae 1',
    pose: 'pose 2',
    date: Date.now(),
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 80, improve: 'Disminuir inclinación' },
    ],
  },
  {
    _id: '3',
    poomsae: 'poomsae 1',
    pose: 'pose 3',
    date: Date.now(),
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 80, improve: 'Disminuir inclinación' },
    ],
  },
  {
    _id: '4',
    poomsae: 'poomsae 2',
    pose: 'pose 4',
    date: Date.now(),
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 80, improve: 'Disminuir inclinación' },
    ],
  },
  {
    _id: '5',
    poomsae: 'poomsae 2',
    pose: 'pose 5',
    date: Date.now(),
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 80, improve: 'Disminuir inclinación' },
    ],
  },
  {
    _id: '6',
    poomsae: 'poomsae 2',
    pose: 'pose 3',
    date: Date.now(),
    observations: [
      { name: 'codo izquierdo', grade: 90, improve: 'Aumentar inclinación' },
      { name: 'codo derecho', grade: 80, improve: 'Disminuir inclinación' },
    ],
  },
];

const poomsaes: DBPoomsaes[] = [
  {
    _id: '1',
    name: 'Poomsae 1',
    poses: [
      {
        name: 'are maki',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
      {
        name: 'taegeuk',
        picture: 'https://i.ytimg.com/vi/Q5NNLfoVEGY/mqdefault.jpg',
      },
      {
        name: 'pose 3',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
      {
        name: 'pose 4',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
      {
        name: 'pose 5',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
      {
        name: 'pose 6',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
    ],
  },
  {
    _id: '2',
    name: 'Poomsae 2',
    poses: [
      {
        name: 'pose 1',
        picture: 'https://www.taekwondoalgete.com/files/janmonyopmk.jpg',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor() {}

  getHistory() {
    return of(history).pipe(
      map((res) => {
        const modifiedHistory: ModHistory = {};
        res.forEach((historyItem) => {
          const currHistoryItem = modifiedHistory[historyItem.pose];
          const newDate = moment(historyItem.date).format('DD MMM YYYY hh:mm a');
          const newBestGrade =
            historyItem.observations.reduce((prev, curr) => {
              return prev + curr.grade;
            }, 0) / historyItem.observations.length;
          if (currHistoryItem) {
            const lastPractice = moment(newDate).isAfter(currHistoryItem.lastPractice)
              ? newDate
              : currHistoryItem.lastPractice;
            const bestGrade = Number(Math.max(currHistoryItem.bestGrade, newBestGrade).toFixed(2));

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
              bestGrade: newBestGrade,
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
    return of(poomsaes);
  }
}
