import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  userName!: string;
  mostrar: boolean = false;
  url: string = `${baseurl}/video_feed?test=${Date().toString()}`;
  displayModal: boolean = false;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public videoService: VideoServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentPose = this.route.snapshot.paramMap.get('pose') || '';
    this.userName = this.route.snapshot.paramMap.get('name') || '';
    this.videoService
      .startStream(`?userid=${this.userName}&pose=${this.currentPose}`)
      .subscribe(() => {
        this.startPractice();
      });
  }

  startPractice() {
    this.displayModal = false;
    this.mostrar = true;
    this.url = `${baseurl}/video_feed?test=${Date().toString()}`;

    setTimeout(() => {
      this.videoService.stopStream().subscribe((_) => {
        this.mostrar = false;
        this.displayModal = true;
        this.loading = true;

        this.videoService.evaluate().subscribe((resp) => {
          console.log(resp);
          this.loading = false;
        });
      });
    }, 7000);
  }

  returnToSelection() {
    this.displayModal = false;
    this.router.navigateByUrl(`poses`);
  }
}
