import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  public doctorList: any = [];
  public patientList: any = [];

  constructor(private crud: CrudService) { }
  loadDocotrs() {
    this.crud.getData('doctorsInfo').subscribe(
      (res: any) => {
        this.doctorList = res
      },
      (err) => { }
    );
  }

  bookNow(id: any, slotDate: any) {
    var patientName = localStorage.getItem('username')
    var patientEmail = localStorage.getItem('useremail')
    console.log(id, slotDate, patientName)
    var obj: any = { docId: id, bookedSlot: slotDate, patientName: patientName, patientEmail: patientEmail };
    // this.crud.updateData(path, obj).subscribe(
    //   (res: any) => {
    //     console.log(res)
    //   },
    //   (err: any) => {
    //     console.log(err)
    //   }
    // );
    this.crud.postData('bookinginfo', obj).subscribe(
      (res: any) => {
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    );

  }

  ngOnInit(): void {
    this.loadDocotrs()
  }

}
