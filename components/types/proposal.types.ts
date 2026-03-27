// types/proposal.types.ts
export interface Step1Data {
  projectTitle: string;
  freelancerName: string;
  contactEmail: string;
}

export interface Step2Data {
  coverLetter: string;
  proposedDeliverables: string;
  estimatedTime: string;
  timeUnit: 'hours' | 'days' | 'weeks' | 'months';
}

export interface Step3Data {
  proposedBudget: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'PKR';
  paymentTerms: 'fixed' | 'milestone' | 'hourly';
}

export interface Step4Data {
  portfolioLink: string;
  proposalFile: DocumentPickerAsset | null;
}

export interface Step5Data {
  confirmation: boolean;
}

export interface DocumentPickerAsset {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
}

export interface AllFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
}

export type JobTypeProps = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface JobFormProps {
  jobTitle: string;
  companyName: string;
  country: string;
  city: string;
  location: string;
  jobType: JobTypeProps;
  payType: string;
  minSalaray: string;
  maxSalaray: string;
  jobDescription: string;
  totalPersontoHire: number;
}

export interface SelectOption {
  label: string;
  value: string;
}


export interface PortfolioFormData {
  portfolioUrl: string;
  portfolio_files: any[];
}


export interface Skill {
  skill: string;
  level: string;
}

export interface Education {
  title: string;
  major: string;
  institution: string;
  country: string;
  year: string;
}

export interface ProfessionalInfoFormData {
  professionalTitle: string;
  professionalBio: string;
  primaryCategory: string;
  skills: Skill[];
  experience: string;
  education: Education[];
  termsAccepted: boolean;
}

