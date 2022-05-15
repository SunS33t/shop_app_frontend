import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Производители',
          link: 'manufacturers',
          index: 0
      }, {
          label: 'Товары',
          link: 'products',
          index: 1
      }, {
          label: 'Цвета',
          link: 'colors',
          index: 2
      },{
        label: 'Адреса',
        link: 'addresses',
        index: 3
      },{
        label: 'Магазины',
        link: 'shops',
        index: 4
      }
    ];
   }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
