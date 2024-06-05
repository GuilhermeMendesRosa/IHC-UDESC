import {Component, TemplateRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FirstWizardComponent} from "./components/first-wizard/first-wizard.component";
import {PoNavbarIconAction, PoNavbarItem, PoNavbarModule} from "@po-ui/ng-components";
import {PoNavbarLiterals} from "@po-ui/ng-components/lib/components/po-navbar/interfaces/po-navbar-literals.interface";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstWizardComponent, PoNavbarModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
