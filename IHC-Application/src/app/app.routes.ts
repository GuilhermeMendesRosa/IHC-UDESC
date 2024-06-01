import {Routes} from '@angular/router';
import {FirstWizardComponent} from "./components/first-wizard/first-wizard.component";
import {SecondWizardComponent} from "./components/second-wizard/second-wizard.component";
import {VideoComponent} from "./components/video/video.component";

export const routes: Routes = [
  {path: 'video', component: VideoComponent},
  {path: 'first-wizard', component: FirstWizardComponent},
  {path: 'second-wizard', component: SecondWizardComponent}
];
