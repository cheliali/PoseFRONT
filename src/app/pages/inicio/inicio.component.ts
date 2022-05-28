import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(public videoService: VideoServiceService) {}

  ngOnInit(): void {}
}
