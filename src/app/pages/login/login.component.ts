import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VideoServiceService } from 'src/app/servicios/video-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public videoService: VideoServiceService
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginYcrearUsuario(accion: string) {
    if (this.registroForm.invalid) {
      return;
    }
    const { username, password } = this.registroForm.value;
    if (accion == 'register') {
      this.videoService.createUser({ username, password }).subscribe();
    } else {
      this.videoService.loginUser({ username, password }).subscribe();
    }
  }
}
