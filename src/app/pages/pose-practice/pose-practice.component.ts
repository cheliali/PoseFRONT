import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pose-practice',
  templateUrl: './pose-practice.component.html',
  styleUrls: ['./pose-practice.component.scss'],
})
export class PosePracticeComponent implements OnInit {
  currentPose!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentPose = this.route.snapshot.paramMap.get('name') || '';
  }
}
