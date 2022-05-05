import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openMenu = false;
  title='My books';

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.securityService.userLoad();
  }
}
