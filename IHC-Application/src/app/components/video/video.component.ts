import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PoButtonModule, PoFieldModule, PoStepperModule} from "@po-ui/ng-components";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    FormsModule,
    PoButtonModule,
    PoFieldModule,
    PoStepperModule,
    ReactiveFormsModule
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

  constructor(private router: Router) {
  }

  goToWizard() {
    this.router.navigateByUrl('/first-wizard');
  }
}
