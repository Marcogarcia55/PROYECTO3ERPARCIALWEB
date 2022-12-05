import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoMarco';
  isNavBarOpened: boolean;
  closeNavBar() {
    this.isNavBarOpened=true;
    }
}
