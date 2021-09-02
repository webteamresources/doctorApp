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
    localStorage.removeItem('username');
    localStorage.removeItem('useremail');
    localStorage.removeItem('doctororpatient');
    this.ts.userDataToTransfer({ loginStatus: false, username: '' })
    this.router.navigate(['/']);
  }

}
