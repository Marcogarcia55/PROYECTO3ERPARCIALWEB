import { Component, Input,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header-tb',
  templateUrl: './header-tb.component.html',
  styleUrls: ['./header-tb.component.css']
})
export class HeaderTbComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  constructor() { }

  ngOnInit(): void {
  }

}
