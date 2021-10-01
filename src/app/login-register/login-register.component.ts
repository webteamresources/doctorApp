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
  public jsonData = '';
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


  public txtMail = this.loginForm.value.userName;
  public txtPassword = this.loginForm.value.password;


  // loginUser(para:any){
  // }
  loginAction() {

    this.crud.getData('usersInfo.json').subscribe(
      (res: any) => {
        var data: any = Object.values(res);
        let obj = data.find((x: any) => {
          x.emailid === this.txtMail
          x.password === this.txtPassword
        });
        if (obj == undefined || obj == null) {
          this.crud.getData('doctorsInfo.json').subscribe(
            (res: any) => {
              var data: any = Object.values(res);
              let obj = data.find((x: any) => {
                x.emailid === this.txtMail
                x.password === this.txtPassword
              });
              if (obj == undefined || obj == null) {
                this.errMsgLogin = "Invalid User";
              }
              else {
                console.log("I am a doctor")
              }
            });
        }
        else {
          console.log("I am a Patient")
        }
      });
  }

  // loginAction() {
  //   var txtMail = this.loginForm.value.userName;
  //   var txtPassword = this.loginForm.value.password;
  //   this.crud.getData(`usersInfo?emailid=${txtMail}&password=${txtPassword}`).subscribe(
  //     (res: any) => {
  //       if (res.length > 0) {
  //         this.errMsgLogin = "User Logged In";
  //         this.ls.storeData('username', res[0].fullName);
  //         this.ls.storeData('useremail', res[0].emailid);
  //         this.ls.storeData('userid', res[0].id);
  //         if (res[0].doctororpatient === 'Patient') {
  //           this.ls.storeData('Patient', true);
  //           this.ts.userDataToTransfer({ loginStatus: true, patientStatus: true, username: res[0].fullName })
  //         }
  //         else if (res[0].doctororpatient === 'Doctor') {
  //           this.ls.storeData('Doctor', true);
  //           this.ts.userDataToTransfer({ loginStatus: true, patientStatus: false, username: res[0].fullName })
  //         }

  //         this.router.navigate(['/']);
  //       }
  //       else {
  //         this.errMsgLogin = "Invalid User";
  //       }
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   )
  // }
  findUser(para: any) {
    this.crud.getData(para).subscribe(
      (res: any) => {
        var data: any = Object.values(res);
        let obj = data.find((x: any) => x.emailid === this.registerForm.value.emailid);
        if (obj == undefined || obj == null) {
          this.crud.postData(para, this.registerForm.value).subscribe(
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
          this.errMsgRegister = "User already registered"
          this.registerForm.reset();
        }
      });
  }
  registerAction() {
    if (this.registerForm.value.doctororpatient == 'Patient') {
      this.jsonData = 'usersInfo.json';
      this.findUser(this.jsonData);
    } else {
      this.jsonData = 'doctorsInfo.json';
      this.findUser(this.jsonData);
    }
  }

  ngOnInit(): void {
  }

}
