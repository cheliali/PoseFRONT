import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { DBService } from 'src/app/servicios/database.service';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
import { GradesResponse } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { BodyPart } from '../../types/types';

const baseurl = environment.baseurl;
@Component({
  selector: 'app-pose-practice',
  templateUrl: './pose-practice.component.html',
  styleUrls: ['./pose-practice.component.scss'],
})
export class PosePracticeComponent implements OnInit {
  currentPose!: string;
  userName!: string;
  showVideo: boolean = false;
  showCountDown: boolean = false;
  url: string = ``;
  displayModal: boolean = false;
  loading: boolean = false;
  grade: string = '';
  initialCounter!: number;
  modelPictureURL: string = '';
  observations!: GradesResponse[];

  constructor(
    private route: ActivatedRoute,
    public videoService: VideoServiceService,
    private router: Router,
    private dbService: DBService
  ) {}

  ngOnInit(): void {
    this.initialConfig();
  }

  initialConfig() {
    this.currentPose = this.route.snapshot.paramMap.get('pose') || '';
    this.userName = this.route.snapshot.paramMap.get('name') || '';

    if (!this.dbService.poomsaes || this.dbService.poomsaes.length == 0) {
      this.dbService.getPoomsaes().subscribe((resp) => {
        this.dbService.poomsaes = resp;
        this.start();
      });
    } else {
      this.start();
    }
  }

  start() {
    this.modelPictureURL =
      this.dbService.poomsaes[0].poses.find((pose) => pose.name == this.currentPose)?.picture || '';
    this.startProcess();
  }

  startProcess() {
    this.displayModal = false;
    this.initialCounter = 5;
    this.url = `${baseurl}/video_feed?test=${Date().toString()}`;
    const interval = setInterval(() => {
      this.showVideo = true;
      this.showCountDown = true;
      if (this.initialCounter == 0) {
        this.showCountDown = false;
        clearInterval(interval);
        this.videoService
          .startStream(`?userid=${this.userName}&pose=${this.currentPose}`)
          .subscribe((resp) => {
            if (resp == 'ok') {
              this.startPractice();
            } else {
              window.alert('no se detecta persona');
              this.videoService
                .stopStream()
                .pipe(debounceTime(1000))
                .subscribe(() => {
                  this.router.navigateByUrl('/poses');
                });
            }
          });
      } else {
        this.initialCounter--;
      }
    }, 1000);
  }
  startPractice() {
    setTimeout(() => {
      this.showVideo = false;
      this.videoService
        .stopStream()
        .pipe(debounceTime(1500))
        .subscribe((_) => {
          this.displayModal = true;
          this.loading = true;

          this.videoService.evaluate().subscribe((resp) => {
            console.log(resp);
            this.observations = resp.map((p) => ({
              ...p,
              name: BodyPart[p.name as keyof typeof BodyPart],
            }));
            this.grade =
              resp.length == 0
                ? 'Intente de nuevo'
                : (
                    resp.reduce((prev, cur) => {
                      return prev + Number(cur.grade);
                    }, 0) / resp.length
                  )
                    .toString()
                    .concat('/100');

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
