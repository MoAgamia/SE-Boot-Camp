import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private as: AuthService) { }
  ngOnInit() {
  }

  authorized() {
    return this.as.authorized;
  }

  logout() {
    this.as.logout();
  }
}
