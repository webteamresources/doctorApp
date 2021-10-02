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
  public bookingList: any = [];
  public msg: any = '';
  public bookForm: any;
  public bookedDocName: any = [];

  constructor(private crud: CrudService, private ls: LocalStorageService, private fb: FormBuilder) { }


  bookingForm = this.fb.group({
    patientName: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    selectDoctor: ['', Validators.required],
    slotDate: ['', Validators.required],
    slotTime: ['', Validators.required]
  });


  loadDocotrs() {
    this.crud.getData('doctorsInfo.json').subscribe(
      (res: any) => {
        var data: any = Object.values(res);
        data.forEach((item: any, i: number) => {
          item.id = i;
        });
        let obj: any = data.find((x: any) => x.fullName);
        this.doctorList.push({ id: obj.id, fullName: obj.fullName });
      },
      (err) => { }
    );
  }

  fetchBooking() {
    var userEmail: any = this.ls.getData('useremail');
    //bookedUserEmail
    this.crud.getData(`bookingInfo.json`).subscribe(
      (res) => {
        var data: any = Object.values(res);
        let obj = data.find((x: any) => x.bookedUserEmail === userEmail);
        if (res > 0) {
          this.bookForm = true
        }
        else {
          this.bookingList.push({ mobile: obj.mobile, patientName: obj.patientName, slotDate: obj.slotDate, slotTime: obj.slotTime });
          this.bookForm = false;
        }
      },
      (err) => { }
    )
    // this.crud.getData(`bookingInfo?bookedUserEmail=${userEmail}`).subscribe(
    //   (res) => {
    //     if (res > 0) {
    //       this.bookForm = true
    //     } else {
    //       this.bookingList = res;
    //       this.bookForm = false;
    //     }
    //   },
    //   (err) => { }
    // )
  }
  newBooking() {
    this.bookForm = true;
  }

  bookNow(e: any, patientName: any, mobile: any, selectDoctor: any, slotDate: any, slotTime: any) {
    e.preventDefault();
    var emailid = this.ls.getData('useremail');
    var obj: any = { patientName: patientName, mobile: mobile, docId: selectDoctor, slotDate: slotDate, slotTime: slotTime, bookedUserEmail: emailid };

    if (patientName === '' || mobile === '' || selectDoctor === '' || slotDate === '' || slotTime === '') {
      console.log(obj)
    } else {
      //bookingInfo?=docId=1&slotDate=2021-09-30&slotTime=10:00 AM to 11:00 AM
      this.crud.getData(`bookingInfo.json`).subscribe(
        (res: any) => {
          //?docId=${obj.docId}&slotDate=${obj.slotDate}&slotTime=${obj.slotTime}
          var data: any = Object.values(res);
          if (obj.selectDoctor === data.docId && obj.slotDate === data.slotDate && obj.slotTime === data.slotTime) {
            this.msg = 'Please select another booking date and time'
          } else {
            this.crud.postData('bookingInfo.json', obj).subscribe(
              (res: any) => {
                this.bookingForm.reset();
                this.bookForm = false;
                this.msg = `Your Booking Date is ${obj.slotDate} and Time is ${obj.slotTime}`
                console.log(res)
              },
              (err: any) => {
                this.msg = err
              }
            );
          }
        });
      // this.crud.getData(`bookingInfo?docId=${obj.docId}&slotDate=${obj.slotDate}&slotTime=${obj.slotTime}`).subscribe(
      //   (res: any) => {
      //     if (res.length > 0) {
      //       this.msg = 'Please select another booking date and time'
      //     } else {
      //       this.crud.postData('bookingInfo', obj).subscribe(
      //         (res: any) => {
      //           console.log(res)
      //         },
      //         (err: any) => {
      //           console.log(err)
      //         }
      //       );
      //       this.bookingForm.reset();
      //       this.bookForm = false
      //       this.msg = `Your Booking Date is ${obj.slotDate} and Time is ${obj.slotTime}`
      //     }
      //   },
      //   (err) => {
      //     this.msg = err
      //   }
      // )
    }
  }

  ngOnInit(): void {
    this.loadDocotrs();
    this.fetchBooking();
  }

}
