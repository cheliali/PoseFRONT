import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DBService } from '../../servicios/database.service';
import { ModHistory, HistoryItem } from '../../types/types';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class InicioComponent implements OnInit {
  history!: HistoryItem[];

  constructor(private dbService: DBService) {}

  ngOnInit(): void {
    this.dbService.getHistory().subscribe((res) => {
      this.history = Object.values(res);
    });
  }
}
