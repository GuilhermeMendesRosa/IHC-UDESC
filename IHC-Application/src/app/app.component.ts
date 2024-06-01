import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FirstWizardComponent} from "./components/first-wizard/first-wizard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstWizardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IHC-Application';
}
