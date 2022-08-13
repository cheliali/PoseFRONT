import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from 'src/app/servicios/database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, public databaseService: DBService, private router: Router) {}

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
      this.databaseService.createUser({ username, password }).subscribe(() => {
        this.databaseService.username = username;
        localStorage.setItem('username', username);
        this.router.navigateByUrl(`inicio`);
      });
    } else {
      this.databaseService.loginUser({ username, password }).subscribe(() => {
        this.databaseService.username = username;
        localStorage.setItem('username', username);
        this.router.navigateByUrl(`inicio`);
      });
    }
  }
}
