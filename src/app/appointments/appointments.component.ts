import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  public appointmentList: any = [];
  public emailLoggedIn: any;
  public bookedSlot: any;

  constructor(private crud: CrudService, private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.emailLoggedIn = this.ls.getData('useremail')
    this.crud.getData(`doctorsInfo?emailid=${this.emailLoggedIn}`).subscribe(
      (res) => {
        this.appointmentList = res;
        if (this.appointmentList.bookedSlot == "") {
          this.bookedSlot = false;
        } else {
          this.bookedSlot = true;
        }
      },
      (err) => { }
    )

  }

}
