import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-successstories',
  imports: [CommonModule],
  templateUrl: './successstories.component.html',
  styleUrl: './successstories.component.css'
})
export class SuccessstoriesComponent implements OnInit {
  marriedCandidates: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getMarriedCouples().subscribe((response) => {
      this.marriedCandidates = response;
    });
  }
}
