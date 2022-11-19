import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}
  showMenuMobile: boolean = false;

  ngOnInit() {}

  toggleMenu() {
    this.showMenuMobile = !this.showMenuMobile;
  }
}
