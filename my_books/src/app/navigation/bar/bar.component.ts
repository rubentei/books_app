import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();
  userStatus: boolean;
  userSubscription: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSubscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status;
    })
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logOut(): void {
    this.securityService.logout();
  }
}
