import { Component, OnInit } from '@angular/core';
import { DBService } from '../../servicios/database.service';
import { DBPoomsaes, ModHistory } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pose-selection',
  templateUrl: './pose-selection.component.html',
  styleUrls: ['./pose-selection.component.scss'],
})
export class PoseSelectionComponent implements OnInit {
  poomsaes!: DBPoomsaes[];
  history!: ModHistory;

  constructor(private dbService: DBService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getPoomsaes().subscribe((resp) => (this.poomsaes = resp));
    this.dbService.getHistory().subscribe((resp) => (this.history = resp));
  }

  goToPractice(pose: string) {
    this.router.navigateByUrl(`pose/${this.dbService.username}/${pose}`);
  }
}
