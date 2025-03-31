import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { CandidateDetailsDialogComponent } from "../candidate-details-dialog/candidate-details-dialog.component";

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements AfterViewInit {
  selectedCandidateId: number | null = null;
  constructor(private authService: AuthService, private router: Router) { }
  ngAfterViewInit(): void {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
  }

  openPopup(item: any): void {
    this.selectedCandidateId = item.candidateId;
  }

  closePopup(): void {
    this.selectedCandidateId = null;
  }
}