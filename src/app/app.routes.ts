import { Routes } from '@angular/router';
import { MatchingProfilesComponent } from './matching-profiles/matching-profiles.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FeaturesComponent } from './features/features.component';
import { SuccessstoriesComponent } from './successstories/successstories.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'matching-profiles', component: MatchingProfilesComponent },
  { path: 'contact-us', component: ContactusComponent},
  { path: 'features', component: FeaturesComponent},
  { path: 'success-stories', component: SuccessstoriesComponent},
  { path: 'create-profile', component: CreateProfileComponent}
];
