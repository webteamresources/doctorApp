import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TransferService } from 'src/services/transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedStatus: Boolean = false;
  public isDoctor: Boolean = false;
  public isPatient: Boolean = false;
  public usName: any = ''
  constructor(private ls: LocalStorageService, private ts: TransferService) { }

  ngOnInit(): void {
    var ans_name = localStorage.getItem('username');
    var ans_storage = localStorage.getItem('useremail');
    var doctorOrPatient: any = localStorage.getItem('doctororpatient');
    if (ans_storage === null) {
      this.loggedStatus = false
      this.usName = ''
    }
    else {
      this.loggedStatus = true;
      this.usName = ans_name;
    }

    if (doctorOrPatient == 'Doctor') {
      this.isPatient = false
      this.isDoctor = true
    } else if (doctorOrPatient == 'Patient') {
      this.isPatient = true
      this.isDoctor = false
    }

    this.ts.obj_userData.subscribe(
      (res: any) => {
        if (res['loginStatus']) {
          this.usName = res['username']
          this.loggedStatus = res['loginStatus']

          if (res['doctororpatient'] == 'Doctor') {
            this.isPatient = false
            this.isDoctor = true
          } else {
            this.isPatient = true
            this.isDoctor = false
          }
        } else {
          this.loggedStatus = false
          this.usName = ''
        }
      },
      (err: any) => { console.log(err) }
    )
  }

}
