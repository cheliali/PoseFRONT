import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from 'src/app/servicios/database.service';
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
  grade: string = '';
  initialCounter: number = 5;
  modelPictureURL: string = '';

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
    const interval = setInterval(() => {
      this.mostrar = true;
      if (this.initialCounter == 0) {
        clearInterval(interval);
        this.videoService
          .startStream(`?userid=${this.userName}&pose=${this.currentPose}`)
          .subscribe((resp) => {
            if (resp == 'ok') {
              this.startPractice();
            } else {
              window.alert('no se detecta persona');
              this.router.navigateByUrl('/poses');
            }
          });
      } else {
        this.initialCounter--;
      }
    }, 1000);
  }
  startPractice() {
    this.displayModal = false;

    this.url = `${baseurl}/video_feed?test=${Date().toString()}`;

    setTimeout(() => {
      this.videoService.stopStream().subscribe((_) => {
        this.mostrar = false;
        this.displayModal = true;
        this.loading = true;

        this.videoService.evaluate().subscribe((resp) => {
          console.log(resp);
          this.grade =
            resp.length == 0
              ? 'Intente de nuevo'
              : (
                  resp.reduce((prev, cur) => {
                    return prev + Number(cur.calificacion);
                  }, 0) / resp.length
                )
                  .toString()
                  .concat('/100');

          this.loading = false;
        });
      });
    }, 10000);
  }

  returnToSelection() {
    this.displayModal = false;
    this.router.navigateByUrl(`poses`);
  }
}
