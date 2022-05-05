import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  userStatus: boolean;
  userSubscription: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSubscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status;
    });
  }

  onCloseMenu(){
    this.menuToggle.emit();
  }

  logOutMenu() {
    this.onCloseMenu();
    this.securityService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
