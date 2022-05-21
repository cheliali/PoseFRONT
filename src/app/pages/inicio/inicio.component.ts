import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
import { environment } from 'src/environments/environment';

const baseurl = environment.baseurl;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  mostrar: boolean = false;
  url: string = `${baseurl}/video_feed`;
  constructor(public videoService: VideoServiceService) {}

  ngOnInit(): void {}
  cambiar() {
    if (!this.mostrar) {
      this.videoService.startStream().subscribe((_) => {
        this.mostrar = true;
      });
    } else {
      this.videoService.stopStream().subscribe((_) => {
        this.mostrar = false;
      });
    }
  }
}
