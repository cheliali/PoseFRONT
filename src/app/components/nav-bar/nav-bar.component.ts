import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Historial',
        icon: 'pi pi-history',
        command: () => {
          this.router.navigateByUrl('/inicio');
        },
      },
      {
        label: 'Practicar',
        icon: 'fa-solid fa-user-ninja',
        command: () => {
          this.router.navigateByUrl('/poses');
        },
      },
    ];
  }
}
