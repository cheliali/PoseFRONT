import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-poomsae1',
  templateUrl: './poomsae1.component.html',
  styleUrls: ['./poomsae1.component.scss'],
})
export class Poomsae1Component implements OnInit {
  constructor(public videoService: VideoServiceService) {}

  ngOnInit(): void {}
}
