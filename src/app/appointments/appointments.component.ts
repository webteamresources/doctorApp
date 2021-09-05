import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  public appointmentList: any;
  public userid: any;
  public bookedSlot: any;

  constructor(private crud: CrudService, private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.userid = this.ls.getData('userid')
    this.crud.getData(`bookingInfo?docId=${this.userid}`).subscribe(
      (res) => {
        if (res > 0) {
          this.bookedSlot = false
        } else {
          this.appointmentList = res;
          this.bookedSlot = true
        }
      },
      (err) => { }
    )

  }

}
