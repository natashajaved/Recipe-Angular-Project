import { AuthResponseDate, AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false
  isLoading = false
  error = ''
  constructor(private authService: AuthService, private router:Router) { }


  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return

    }
    let authObs: Observable<AuthResponseDate>
    this.isLoading = true
    const data = { email: form.value.email, password: form.value.password }
    if (this.isLoginMode) {
      authObs = this.authService.login(data)
    } else {
      authObs = this.authService.signup(data)


    }
    authObs.subscribe((data) => {
      console.log({ data })
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, error => {
      console.log({ error: error.message })
      this.isLoading = false
      this.error = error
    })



    form.reset()
  }
}
