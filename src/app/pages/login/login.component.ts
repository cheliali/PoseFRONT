import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from 'src/app/servicios/database.service';

interface DrawingPosition {
  start: [number, number];
  middle: [number, number];
  end: [number, number];
  colors: [string, string];
}

interface Extremities {
  leftArm: DrawingPosition;
  rightArm: DrawingPosition;
  rightLeg: DrawingPosition;
  leftLeg: DrawingPosition;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registroForm!: FormGroup;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  headCenterX = 300;
  headCenterY = 100;
  headRadius = 30;
  trunkLength = 140;
  articulationRadius = 5;

  drawingPositions: Extremities = {
    leftArm: {
      start: [this.headCenterX, this.headCenterY + this.trunkLength / 3],
      middle: [this.headCenterX - this.trunkLength / 3, this.headCenterY + this.trunkLength / 1.5],
      end: [this.headCenterX + this.headRadius, this.headCenterY + this.trunkLength / 1.5],
      colors: ['black', 'black'],
    },
    rightArm: {
      start: [this.headCenterX, this.headCenterY + this.trunkLength / 3],
      middle: [this.headCenterX + this.trunkLength / 3.5, this.headCenterY + this.trunkLength / 3],
      end: [this.headCenterX + this.headRadius * 2.5, this.headCenterY],
      colors: ['black', 'black'],
    },
    rightLeg: {
      start: [this.headCenterX, this.headCenterY + this.trunkLength],
      middle: [
        this.headCenterX + this.trunkLength / 2.5,
        this.headCenterY + this.trunkLength / 1.4,
      ],
      end: [this.headCenterX + this.trunkLength / 1.2, this.headCenterY + this.trunkLength / 1.9],
      colors: ['black', 'black'],
    },
    leftLeg: {
      start: [this.headCenterX, this.headCenterY + this.trunkLength],
      middle: [this.headCenterX - this.trunkLength / 3, this.headCenterY + this.trunkLength * 1.2],
      end: [this.headCenterX - this.trunkLength / 1.7, this.headCenterY + this.trunkLength * 1.6],
      colors: ['black', 'black'],
    },
  };

  constructor(private fb: FormBuilder, public databaseService: DBService, private router: Router) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.drawperson();

    setTimeout(() => {
      this.drawingPositions.leftArm.colors[0] = 'red';
      this.drawperson();
    }, 2000);
  }

  drawSection(start: [number, number], end: [number, number], color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(...start);
    this.ctx.lineTo(...end);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawCircle(center: [number, number], radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(...center, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawExtremity(positions: DrawingPosition, articulationRadius: number) {
    //sección final
    this.drawSection(positions.middle, positions.end, positions.colors[1]);
    //sección inicial
    this.drawSection(positions.start, positions.middle, positions.colors[0]);
    //articulación
    this.drawCircle(positions.middle, articulationRadius);
  }

  drawperson() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = 'black';

    //CABEZA
    this.drawCircle([this.headCenterX, this.headCenterY], this.headRadius);

    this.ctx.lineWidth = 12;
    //TRONCO
    this.drawSection(
      [this.headCenterX, this.headCenterY],
      [this.headCenterX, this.headCenterY + this.trunkLength],
      'black'
    );

    this.drawExtremity(this.drawingPositions.leftArm, this.articulationRadius);
    this.drawExtremity(this.drawingPositions.rightArm, this.articulationRadius);
    this.drawExtremity(this.drawingPositions.leftLeg, this.articulationRadius);
    this.drawExtremity(this.drawingPositions.rightLeg, this.articulationRadius);
  }

  loginYcrearUsuario(accion: string) {
    if (this.registroForm.invalid) {
      return;
    }
    const { username, password } = this.registroForm.value;
    if (accion == 'register') {
      this.databaseService.createUser({ username, password }).subscribe(() => {
        this.databaseService.username = username;
        this.router.navigateByUrl(`inicio`);
      });
    } else {
      this.databaseService.loginUser({ username, password }).subscribe(() => {
        this.databaseService.username = username;
        this.router.navigateByUrl(`inicio`);
      });
    }
  }
}
