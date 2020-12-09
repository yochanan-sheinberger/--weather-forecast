import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean;

  ourForm: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.ourForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  hasError(conrtrolName: string, errorName: string): any {
    return this.ourForm.controls[conrtrolName].hasError(errorName);
  }

  submit(form: NgForm): void {
    this.auth.authenticate(form.value.username, form.value.password)
    .then((res: any) => {
      console.log(res);
      this.auth.setUserInfo({ user: res.user });
      this.router.navigate(['']);
    }).catch(err => {
      console.log(err);
    });
  }

}
