export class Candidate {
  candidateId!: number;
  firstName!: string;
  lastName!: string;
  middleName!: string;
  DOB!: Date;
  gender!: string;
  // contactNo?: string; // Uncomment if needed
  // emailId?: string;   // Uncomment if needed
  addressLine1!: string;
  addressLine2!: string;
  taluka!: string;
  district!: string;
  pincode!: string;
  villageOrCity!: string;
  religion!: string;
  cast!: string;
  subCast!: string;
  height!: number;
  weight!: number;
  complexion!: string;

  constructor(data?: Partial<Candidate>) {

    if (data) {
      Object.assign(this, data);
    }
  }
}

export class CandidateProfileWithPhotos {
  candidateId!: number;
  firstName!: string;
  lastName!: string;
  photoPath!: string;
}
