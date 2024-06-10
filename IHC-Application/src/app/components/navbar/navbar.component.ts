import {Component} from '@angular/core';
import {PoButtonModule, PoFieldModule, PoModalModule, PoNavbarModule, PoStepperModule} from "@po-ui/ng-components";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    PoNavbarModule,
    PoButtonModule,
    PoModalModule,
    PoFieldModule,
    FormsModule,
    PoStepperModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  apiKey: string = "";

  public saveAPIKey() {
    localStorage.setItem("apiKey", this.apiKey);
  }
}
