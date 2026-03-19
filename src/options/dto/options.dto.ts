export class OptionsDto {
    gender?: string[];
    dismissalReason?: string[];
    socialLeave?: string[];
    university?: string[];
    preparationForm?: string[];
    identityDocument?: string[];
    residence?: string[];
    medicalCertificate?: string[];
    rivshCertificate?: string[];
    entryByInvitation?: string[];
    country?: string[];
    departments?: string[];
    specialtyProfiles?: string[];
  }
  
  export class AddOptionDto {
    value: string;
  }