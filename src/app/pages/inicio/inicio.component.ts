import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/servicios/video-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  mostrar: boolean = false;
  url: string = 'http://127.0.0.1:5000/video_feed';
  constructor(public videoService: VideoServiceService) {}

  ngOnInit(): void {
    this.videoService.getUser();
  }
  cambiar() {
    this.mostrar = !this.mostrar;
  }
}
