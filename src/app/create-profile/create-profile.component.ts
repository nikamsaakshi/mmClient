import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-profile',
  imports: [FormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
  isAddedIn: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) { }
  title = 'mmClient';

  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  DOB: Date = new Date();
  gender: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  taluka: string = '';
  district: string = '';
  pincode: string = '';
  villageOrcity: string = '';
  religion: string = '';
  cast: string = '';
  subCast: string = '';
  height: number = 0;
  weight: number = 0;
  complexion: string = '';
  candidateId: number = 0;




  onSaveProfile(form: NgForm) {
    if (form.valid) {
      this.authService.saveProfile(
        this.candidateId,
        this.firstName,
        this.middleName,
        this.lastName,
        this.DOB,
        this.gender,
        this.addressLine1,
        this.addressLine2,
        this.taluka,
        this.district,
        this.pincode,
        this.villageOrcity,
        this.religion,
        this.cast,
        this.subCast,
        this.height,
        this.weight,
        this.complexion
      ).subscribe(
        (response) => {
          alert('Added successful!!');
          this.isAddedIn = true;
          // this.router.navigate(['create-profile']);
        },
        (error) => {
          alert('onSaveProfile failed ' + error);
        });
    } else {
      alert('onSaveProfile - Invalid')
    }
  }
}





