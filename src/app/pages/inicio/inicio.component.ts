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

  ngOnInit(): void {}
  cambiar() {
    if (!this.mostrar) {
      this.videoService.startStream().subscribe((_) => {
        console.log('start');
        this.mostrar = true;
      });
    } else {
      this.videoService.stopStream().subscribe((_) => {
        console.log('stop');
        this.mostrar = false;
      });
    }
  }
}
