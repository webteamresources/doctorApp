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
  public isDoctor: any = false;
  public isPatient: any = false;
  public usName: any = ''
  constructor(private ls: LocalStorageService, private ts: TransferService) { }

  ngOnInit(): void {
    var ans_name = this.ls.getData('username');
    var ans_storage = this.ls.getData('useremail');
    this.isPatient = this.ls.getData('Patient');
    this.isDoctor = this.ls.getData('Doctor');
    if (ans_storage === null) {
      this.loggedStatus = false
      this.usName = ''
    }
    else {
      this.loggedStatus = true;
      this.usName = ans_name;
    }

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
