import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AuthService } from './auth.service';
@Component({
  selector: 'app-profile-photo',

  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent {

  selectedFile: File | null = null;
  uploadResponse: any;

  constructor(private authService: AuthService, private router: Router) { }
  title = 'mmClient';

  imagetobruploaded: FormData = new FormData();

  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      alert('Image uploaded successfully!');
      this.selectedFile = event.target.files[0];
    }
  }
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    // Append the file to formData. Ensure the field name "image" matches what your backend expects.
    formData.append('image', this.selectedFile);
    this.authService.uploadImage(formData);

    // .subscribe({
    //   next: (response: any) => {
    //     this.uploadResponse = response;
        
    //   },
    //   error: (error: any) => {
    //     alert('Upload error:'+ error);
    //   }
    // });
    //alert('Image uploaded successfully!');
  }

  uploadImage(imageToBeUploaded: FormData) {
    this.authService.uploadImage(imageToBeUploaded).subscribe({
      next: (response: any) => {
        this.uploadResponse = response;
      },
      error: (error: any) => {
        alert('Upload error:'+ error);
      }
    });
  }
}

function photo(imageToBeuploade: any, FormData: { new(form?: HTMLFormElement, submitter?: HTMLElement | null): FormData; prototype: FormData; }) {
  throw new Error('Function not implemented.');
}

