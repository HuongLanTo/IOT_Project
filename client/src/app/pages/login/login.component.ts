import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnChanges, OnInit, OnDestroy {
  public username: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
  
  ngOnDestroy() {
  }

  login() {
    var userLogin = {
      username: this.username,
      password: this.password
    }
    this.authService.login(userLogin);
  }

}
