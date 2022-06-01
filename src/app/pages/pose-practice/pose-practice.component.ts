import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
import { environment } from 'src/environments/environment';

const baseurl = environment.baseurl;
@Component({
  selector: 'app-pose-practice',
  templateUrl: './pose-practice.component.html',
  styleUrls: ['./pose-practice.component.scss'],
})
export class PosePracticeComponent implements OnInit {
  currentPose!: string;
  mostrar: boolean = false;
  url: string = `${baseurl}/video_feed`;
  constructor(private route: ActivatedRoute, public videoService: VideoServiceService) {}

  ngOnInit(): void {
    this.currentPose = this.route.snapshot.paramMap.get('name') || '';
  }
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
