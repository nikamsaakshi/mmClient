import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})

export class CreateProfileComponent implements OnInit, AfterViewInit {
  dob: string = '';
  maxDate!: string;
  
  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }

  isAddedIn: boolean | undefined;
  selectedPhotoFile: File | null = null;
  selectedBiodataFile: File | null = null;

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
  villageOrCity: string = '';
  religion: string = '';
  cast: string = '';
  subCast: string = '';
  familyDeity: string= '';
  deityRepresentation: string = '';
  constellation: string = '';
  zodiacSign: string = '';
  category: string = '';
  pulse: string = '';
  height: number = 0;
  weight: number = 0;
  complexion: string = '';
  bloodGroup:string = '';
  education:string = '';
  profession: string='';
  annualIncome:string = '';
  property:string = '';
  familyBackground:string = '';
  photo: string = '';
  bioData: string = '';
  imagetobruploaded: FormData = new FormData();
  candidateId: number = 0;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.maxDate = `${year}-${month}-${day}`;
  }

  ngAfterViewInit(): void {
    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    if (this.authService.isLoggedIn()) {
      this.authService.getCandidateProfileByCandidateId(Number(candidateId)).subscribe((response) => {

        console.log('=========================');
        console.log(response);
        this.candidateId = Number(candidateId);
        this.firstName = response.firstName;
        this.middleName = response.middleName;
        this.lastName = response.lastName;
        this.DOB = response.dob;
        this.gender = response.gender;
        this.addressLine1 = response.addressLine1;
        this.addressLine2 = response.addressLine2;
        this.taluka = response.taluka;
        this.district = response.district;
        this.pincode = response.pincode;
        this.villageOrCity = response.villageOrCity;
        this.religion = response.religion;
        this.cast = response.cast;
        this.subCast = response.subCast;
        this.familyDeity = response.familyDeity;
        this.deityRepresentation = response.deityRepresentation;
        this.constellation = response.constellation;
        this.zodiacSign = response.zodiacSign;
        this.category = response.caetgory;
        this.pulse = response.pulse;
        this.height = response.height;
        this.weight = response.weight;
        this.complexion = response.complexion;
        this.bloodGroup = response.bloodGroup;
        this.education = response.education;
        this.profession = response.profession;
        this.annualIncome = response.annualIncome;
        this.property = response.property;
        this.familyBackground = response.familyBackground;

      });
    } else {
      alert("Please login!");
    }
  }

  onSaveProfile(form: NgForm) {
    let imagemDocData = new FormData();
    if (this.selectedPhotoFile != null)
      imagemDocData.append('image', this.selectedPhotoFile);
    if (this.selectedBiodataFile != null)
      imagemDocData.append('doc', this.selectedBiodataFile);

    let candidateId = '';
    if (localStorage?.getItem('candidateId')) {
      candidateId = localStorage?.getItem('candidateId')?.toString() || '0';
    }
    imagemDocData.append('candidateId', candidateId);
    imagemDocData.append('firstName', this.firstName);
    imagemDocData.append('middleName', this.middleName);
    imagemDocData.append('lastName', this.lastName);
    imagemDocData.append('DOB', this.DOB.toString());
    imagemDocData.append('gender', this.gender);
    imagemDocData.append('addressLine1', this.addressLine1);
    imagemDocData.append('addressLine2', this.addressLine2);
    imagemDocData.append('taluka', this.taluka);
    imagemDocData.append('district', this.district);
    imagemDocData.append('pincode', this.pincode);
    imagemDocData.append('villageOrcity', this.villageOrCity);
    imagemDocData.append('religion', this.religion);
    imagemDocData.append('cast', this.cast);
    imagemDocData.append('subcast', this.subCast);
    imagemDocData.append('familyDeity',this.familyDeity);
    imagemDocData.append('deityRepresentation',this.deityRepresentation);
    imagemDocData.append('constellation',this.constellation);
    imagemDocData.append('zodiacSign',this.zodiacSign);
    imagemDocData.append('category',this.category);
    imagemDocData.append('pulse',this.pulse);
    imagemDocData.append('height', this.height.toString());
    imagemDocData.append('weight', this.weight.toString());
    imagemDocData.append('complexion', this.complexion);
    imagemDocData.append('bloodGroup',this.bloodGroup);
    imagemDocData.append('education', this.education);
    imagemDocData.append('profession',this.profession)
    imagemDocData.append('annualIncome',this.annualIncome);
    imagemDocData.append('property',this.property);
    imagemDocData.append('familyBackground',this.familyBackground);


    if (form.valid) {
      this.authService.saveProfile(
        imagemDocData
      ).subscribe(
        (response) => {
          alert('Added successful!!');
          this.router.navigate(['home']);
        },
        (error) => {
          alert('onSaveProfile failed ' + error);
        });
    } else {
      alert(form.errors);
      alert('onSaveProfile - Invalid')
    }
  }

  onCancel() {
    this.router.navigate(['home']);
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedPhotoFile = event.target.files[0];
    }
  }

  onBiodataSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedBiodataFile = event.target.files[0];
    }
  }
}