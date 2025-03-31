import { Component, Inject, OnInit } from '@angular/core';
import { CandidateProfileWithPhotos } from '../candidate.model';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { faCommentAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { Firestore, collection, addDoc, query, orderBy, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-sent-rec',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './sent-rec.component.html',
  styleUrl: './sent-rec.component.css'
})

export class SentRecComponent implements OnInit {
  candidates: CandidateProfileWithPhotos[] = [];
  candidatesReceived: CandidateProfileWithPhotos[] = [];
  faUser = faCommentAlt;
  //chat

  isChatOpen = false;
  messages$: any;
  chatMessages: string[] = [];
  messageText: string = '';
  sender: string = 'Candidate'; // Replace with logged-in user's name
  constructor(private authService: AuthService) {
    // const messagesCollection = collection(this.firestore, 'messages');
    // const q = query(messagesCollection, orderBy('timestamp'));
    // this.messages$ = collectionData(q, { idField: 'id' });
  }
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  async sendMessage(sentCandidateId: Number) {
    let candidateId: Number = 0;
    if (localStorage?.getItem('candidateId')) {
      candidateId = Number(localStorage?.getItem('candidateId')?.toString()) || 0; // Loggedin
    }
    this.chatMessages.push(this.messageText);
    this.messageText = '';
  }
  ngOnInit(): void {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    this.getSentInterestMatchingProfilesByCandidateId(candidateId);
    this.getReceivedInterestMatchingProfilesByCandidateId(candidateId);
  }

  getSentInterestMatchingProfilesByCandidateId(candidateId: string) {
    this.authService.getSentInterestMatchingProfilesByCandidateId(candidateId).subscribe({
      next: (response) => {
        this.candidates = response;
      },
      error: (error) => {
        alert('Error in getSentInterestMatchingProfilesByCandidateId' + error);
      }
    });
  }

  getReceivedInterestMatchingProfilesByCandidateId(candidateId: string) {
    this.authService.getReceivedInterestMatchingProfilesByCandidateId(candidateId).subscribe({
      next: (response) => {
        this.candidatesReceived = response;
      },
      error: (error) => {
        alert('Error in getReceivedInterestMatchingProfilesByCandidateId' + error);
      }
    });
  }

  acceptInterest(interestedCandidateId: number) {
    localStorage.getItem('candidateId')?.toString() || '0';
    this.authService.updateCandidateInterest(interestedCandidateId, 1, 0).subscribe((response) => {
      const interestedCandidate = response;
      let indexToUpdate = this.candidatesReceived.findIndex(item =>
        item.candidateId === interestedCandidate.candidateId
        && item.interestedCandidateId == interestedCandidate.interestedCandidateId);
      this.candidatesReceived[indexToUpdate].isAccepted = interestedCandidate.isAccepted;
      this.candidatesReceived[indexToUpdate].isRejected = interestedCandidate.isRejected;
    });
    alert('Inetrest accepted successfully!');
  }

  rejectInterest(interestedCandidateId: number) {
    alert(interestedCandidateId)
    this.authService.updateCandidateInterest(interestedCandidateId, 0, 1).subscribe((respose) => {
      alert(respose.isAccepted + "--" + respose.isRejected);
    });
  }
}