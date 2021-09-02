import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/services/crud.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TransferService } from 'src/services/transfer.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  public errMsgLogin = '';
  public errMsgRegister = '';

  constructor(private fb: FormBuilder, private crud: CrudService, private ls: LocalStorageService, private router: Router, private ts: TransferService) { }

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
  });
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    emailid: ['', [Validators.required, Validators.email]],
    doctororpatient: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]// 
  });

  loginAction() {
    this.crud.getData(`usersInfo?emailid=${this.loginForm.value.userName}` || `doctorsInfo?emailid=${this.loginForm.value.userName}`).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.errMsgLogin = "User Logged In";
          console.log(res)
          this.ls.storeData('username', res[0].fullName);
          this.ls.storeData('useremail', res[0].emailid);
          this.ts.userDataToTransfer({ loginStatus: true, username: res[0].fullName })
          this.router.navigate(['/']);
        }
        else {
          this.errMsgLogin = "Invalid User";
        }
      }
    )

  }
  registerAction() {
    this.crud.getData(`usersInfo?emailid=${this.registerForm.value.emailid}` || `doctorsInfo?emailid=${this.registerForm.value.emailid}`).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.errMsgRegister = "User already registered"
          this.registerForm.reset();
        }
        else {
          if (this.registerForm.value.doctororpatient == 'Doctor') {
            console.log("Dcotor")
            this.crud.postData('doctorsInfo', this.registerForm.value).subscribe(
              (res: any) => {
                console.log(res);
                this.errMsgRegister = "User added"
                this.registerForm.reset();
              },
              (err: any) => {
                this.errMsgRegister = err;
              }
            )
          }
          else {
            console.log("Patient")
            this.crud.postData('usersInfo', this.registerForm.value).subscribe(
              (res: any) => {
                console.log(res);
                this.errMsgRegister = "User added"
                this.registerForm.reset();
              },
              (err: any) => {
                this.errMsgRegister = err;
              }
            )
          }
        }
      },
      (error) => { }
    )



  }

  ngOnInit(): void {
  }

}
