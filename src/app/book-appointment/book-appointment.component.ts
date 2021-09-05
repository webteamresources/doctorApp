import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/services/crud.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  public doctorList: any = [];
  public msg: any = '';
  public bookForm: any = true;

  constructor(private crud: CrudService, private ls: LocalStorageService, private fb: FormBuilder) { }


  bookingForm = this.fb.group({
    patientName: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    selectDoctor: ['', Validators.required],
    slotDate: ['', Validators.required],
    slotTime: ['', Validators.required]
  });


  loadDocotrs() {
    this.crud.getData('usersInfo?doctororpatient=Doctor').subscribe(
      (res: any) => {
        this.doctorList = res
      },
      (err) => { }
    );
  }

  bookNow(e: any, patientName: any, mobile: any, selectDoctor: any, slotDate: any, slotTime: any) {
    e.preventDefault();
    var obj: any = { patientName: patientName, mobile: mobile, docId: selectDoctor, slotDate: slotDate, slotTime: slotTime, };

    if (patientName === '' || mobile === '' || selectDoctor === '' || slotDate === '' || slotTime === '') {
      console.log(obj)
    } else {
      //bookingInfo?=docId=1&slotDate=2021-09-30&slotTime=10:00 AM to 11:00 AM

      this.crud.getData(`bookingInfo?docId=${obj.docId}&slotDate=${obj.slotDate}&slotTime=${obj.slotTime}`).subscribe(
        (res: any) => {
          if (res.length > 0) {
            this.msg = 'Please select another booking date and time'
          } else {
            this.crud.postData('bookingInfo', obj).subscribe(
              (res: any) => {
                console.log(res)
              },
              (err: any) => {
                console.log(err)
              }
            );
            this.bookingForm.reset();
            this.msg = `Your Booking Date is ${obj.slotDate} and Time is ${obj.slotTime}`
          }
        },
        (err) => {
          this.msg = err
        }
      )
    }
  }

  ngOnInit(): void {
    this.loadDocotrs();
  }

}
