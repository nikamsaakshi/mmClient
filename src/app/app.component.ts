import { Component, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { Candidate } from './candidate.model';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { NavComponent } from "./nav/nav.component";
import { IdleService } from './idle.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mmClient';

  constructor(private idleService: IdleService) {
  }

  ngOnInit(): void {
    this.idleService.startWatching();
  }
}