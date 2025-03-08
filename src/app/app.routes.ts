import { Routes } from '@angular/router';
import { MatchingProfilesComponent } from './matching-profiles/matching-profiles.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeaturesComponent } from './features/features.component';
import { SuccessstoriesComponent } from './successstories/successstories.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { authGuard } from './auth.guard';
import { CandidateDetailsDialogComponent } from './candidate-details-dialog/candidate-details-dialog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'matching-profiles', component: MatchingProfilesComponent, canActivate:[authGuard] },
  { path: 'contact-us', component: ContactusComponent},
  { path: 'features', component: FeaturesComponent},
  { path: 'success-stories', component: SuccessstoriesComponent, canActivate:[authGuard]},
  { path: 'create-profile', component: CreateProfileComponent, canActivate:[authGuard]},
  { path: 'app-candidate-details-dialog', component: CandidateDetailsDialogComponent}
];
