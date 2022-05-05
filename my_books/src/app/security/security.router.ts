import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SecurityService } from "./security.service";

@Injectable()
export class SecurityRouter implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.securityService.onSession()) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }

}
