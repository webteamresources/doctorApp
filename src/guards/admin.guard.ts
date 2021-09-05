import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private route: Router, private ls: LocalStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ans_storage: any = this.ls.getData('useremail');
    let ans_status: any = this.ls.getData('Patient');
    console.log(ans_status)
    if (ans_storage === null && ans_status === null) {
      this.route.navigate(['/login'])
      return false;
    }
    else {
      if (ans_status == false) {
        return true;
      }
      else {
        this.route.navigate(['/'])
        return false;
      }
    }
  }

}
