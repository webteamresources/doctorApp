import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  public doctorList: any = [];
  public patientList: any = [];

  constructor(private crud: CrudService, private ls: LocalStorageService) { }
  loadDocotrs() {
    this.crud.getData('bookingInfo').subscribe(
      (res: any) => {
        this.doctorList = res
      },
      (err) => { }
    );
  }

  bookNow(id: any, slotDate: any, slotTime: any) {
    var patientName = this.ls.getData('username')
    var patientEmail = this.ls.getData('useremail')
    var obj: any = { docId: id, slotDate: slotDate, slotTime: slotTime, patientName: patientName, patientEmail: patientEmail };
    this.crud.postData(`bookingInfo`, obj).subscribe(
      (res: any) => {
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
    this.loadDocotrs();
  }

}
