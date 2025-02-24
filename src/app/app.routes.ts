import { Routes } from '@angular/router';
import { MatchingProfilesComponent } from './matching-profiles/matching-profiles.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'matching-profiles', component: MatchingProfilesComponent },
    { path: 'home', component: HomeComponent },
    // { path: '', redirectTo: '/matching-profiles', pathMatch: 'full' }, // Optional redirect
    { path: '**', redirectTo: '' } // Wildcard route to handle unknown paths
     ];
