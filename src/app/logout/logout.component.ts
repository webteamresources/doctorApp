import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TransferService } from 'src/services/transfer.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private ls: LocalStorageService, private ts: TransferService) { }

  ngOnInit(): void {
    // localStorage.clear();
    this.ls.removeData('username');
    this.ls.removeData('useremail');
    this.ls.removeData('Patient');
    this.ts.userDataToTransfer({ loginStatus: false, username: '' })
    this.router.navigate(['/']);
  }

}
