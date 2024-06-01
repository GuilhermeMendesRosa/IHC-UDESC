import {Routes} from '@angular/router';
import {FirstWizardComponent} from "./components/first-wizard/first-wizard.component";
import {SecondWizardComponent} from "./components/second-wizard/second-wizard.component";

export const routes: Routes = [
  {path: 'first-wizard', component: FirstWizardComponent},
  {path: 'second-wizard', component: SecondWizardComponent}
];
