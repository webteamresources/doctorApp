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
  public isDoctor: any;
  public isPatient: any;
  public usName: any = ''
  constructor(private ls: LocalStorageService, private ts: TransferService) { }

  ngOnInit(): void {
    var ans_name = this.ls.getData('username');
    var ans_storage = this.ls.getData('useremail');
    var patient: any = this.ls.getData('Patient');
    if (ans_storage === null) {
      this.loggedStatus = false
      this.usName = ''
    }
    else {
      this.loggedStatus = true;
      this.usName = ans_name;
    }
    if (patient) {
      this.isPatient = true
      this.isDoctor = false
    } else {
      this.isPatient = false
      this.isDoctor = true
    }
    console.log(patient)
    console.log(this.isPatient)
    console.log(this.isDoctor)

    this.ts.obj_userData.subscribe(
      (res: any) => {
        if (res['loginStatus']) {
          this.usName = res['username']
          this.loggedStatus = res['loginStatus']
          this.isPatient = res['patientStatus']
          this.isDoctor = !res['patientStatus']
        } else {
          this.loggedStatus = false
          this.usName = ''
        }
      },
      (err: any) => { console.log(err) }
    )
  }

}
