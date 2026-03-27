import * as yup from 'yup';

export const JobFormSchema = yup.object().shape({
  jobTitle: yup
    .string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters')
    .trim(),

  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .trim(),

  location: yup
    .string()
    .required('Location is required')
    .trim(),

  country: yup
    .string()
    .required('Country is required'),

  city: yup
    .string()
    .required('City is required'),

  jobType: yup
    .string()
    .oneOf(['Full-time', 'Part-time', 'Contract', 'Internship'], 'Invalid job type')
    .required('Job type is required'),

  payType: yup
    .string()
    .required('Pay type is required')
    .trim(),

  minSalaray: yup
    .string()
    .required('Minimum pay is required')
    .test('is-positive', 'Must be greater than 0', (value) => {
      return value ? parseFloat(value) > 0 : false;
    }),

  maxSalaray: yup
    .string()
    .required('Maximum pay is required')
    .test('is-positive', 'Must be greater than 0', (value) => {
      return value ? parseFloat(value) > 0 : false;
    })
    .test('is-greater', 'Maximum must be greater than minimum', function (value) {
      const { minimum } = this.parent;
      if (!value || !minimum) return true;
      return parseFloat(value) > parseFloat(minimum);
    }),

  jobDescription: yup
    .string()
    .required('Job description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must not exceed 2000 characters')
    .trim(),

  totalPersontoHire: yup
    .number()
    .required('Hiring count is required')
    .min(1, 'Must hire at least 1 person')
    .max(100, 'Cannot hire more than 100 people at once')
    .integer('Must be a whole number'),
});

export const createProjectSchema = yup.object().shape({
  title: yup.string().trim().required('Project title is required'),
  category: yup.string().required('Category is required'),
  subCategory: yup.string().required('Subcategory is required'),
  skills: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one skill is required'),
  budget: yup
    .number()
    .typeError('Budget must be a number')
    .positive('Budget must be greater than 0')
    .required('Budget is required'),
  deadline: yup
    .date()
    .min(new Date(), 'Deadline cannot be in the past')
    .required('Deadline is required'),
  mode: yup.string().required('Project mode is required'),
  duration: yup.string().required('Hiring timeline is required'),
  language: yup.string().optional(),
  freelancerType: yup.string().required('Freelancer type is required'),
  description: yup.string().trim().required('Project description is required'),
  deliverable: yup.string().trim().required('Deliverables are required'),
  experienceLevel: yup
    .string()
    .oneOf(['beginner', 'intermediate', 'expert'])
    .required('Experience level is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms to proceed'),
  attachments: yup
    .object()
    .shape({
      uri: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().optional(),
    })
    .nullable()
    .optional(),
});
export const editProjectSchema = yup.object({
  title: yup.string().required('Project title is required'),
  category: yup.string().required('Category is required'),
  subcategory: yup.string().required('Subcategory is required'),
  skills: yup.string().required('Skills are required'),
  budget: yup.string().required('Budget is required'),
  deadline: yup.string().required('Deadline is required'),
  timeline: yup.string().required('Hiring timeline is required'),
  language: yup.string().required('Language is required'),
  freelancerType: yup.string().required('Freelancer type is required'),
});

export const personalInfoSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  files: yup.object().required('Work samples are required'),
});

export const portfolioSchema = yup.object().shape({
  portfolioUrl: yup
    .string()
    .required('Portfolio URL is required')
    .url('Please enter a valid URL (e.g., https://example.com)'),
  portfolio_files: yup
    .array()
    .min(1, 'Please upload at least 1 work sample')
    .max(3, 'You can upload a maximum of 3 files')
    .required('Work samples are required'),
});

export type PortfolioFormData = {
  portfolioUrl: string;
  workSamples: any[];
};

export const professionalInfoSchema = yup.object().shape({
  professionalTitle: yup
    .string()
    .required('Professional title is required')
    .min(3, 'Professional title must be at least 3 characters'),

  professionalBio: yup
    .string()
    .required('Professional bio is required')
    .min(50, 'Professional bio must be at least 50 characters')
    .max(1000, 'Professional bio must not exceed 1000 characters'),

  primaryCategory: yup
    .string()
    .required('Primary category is required'),

  skills: yup
    .array()
    .of(
      yup.object().shape({
        skill: yup.string().required('Skill name is required'),
        level: yup.string().required('Skill level is required'),
      })
    )
    .min(1, 'Please add at least one skill')
    .required('Skills are required'),

  experience: yup
    .string()
    .required('Experience level is required'),

  education: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required('Program is required'),
        major: yup.string().required('Degree is required'),
        institution: yup.string().required('Institution is required'),
        country: yup.string().required('Country is required'),
        year: yup.string().required('Year is required'),
      })
    )
    .optional(),

  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export const step1Schema = yup.object().shape({
  projectTitle: yup.string().required('Project title is required').trim(),
  freelancerName: yup.string().required('Name is required').trim(),
  contactEmail: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .trim(),
});

export const step2Schema = yup.object().shape({
  coverLetter: yup.string().required('Cover letter is required').trim(),
  proposedDeliverables: yup.string().required('Deliverables are required').trim(),
  estimatedTime: yup
    .string()
    .required('Estimated time is required')
    .test('is-positive', 'Must be greater than 0', (value) => {
      return value ? parseFloat(value) > 0 : false;
    }),
  timeUnit: yup
    .string()
    .oneOf(['hours', 'days', 'weeks', 'months'])
    .required(),
});

export const step3Schema = yup.object().shape({
  proposedBudget: yup
    .string()
    .required('Budget is required')
    .test('is-positive', 'Must be greater than 0', (value) => {
      return value ? parseFloat(value) > 0 : false;
    }),
  currency: yup.string().oneOf(['USD', 'EUR', 'GBP', 'PKR']).required(),
  paymentTerms: yup.string().oneOf(['fixed', 'milestone', 'hourly']).required(),
});

export const step4Schema = yup.object().shape({
  portfolioLink: yup
    .string()
    .required('Portfolio link is required')
    .url('Must be a valid URL')
    .trim(),
  proposalFile: yup
    .mixed()
    .required('Proposal document is required')
    .test('fileExists', 'Proposal document is required', (value) => value !== null),
});

export const step5Schema = yup.object().shape({
  confirmation: yup
    .boolean()
    .oneOf([true], 'You must confirm before submitting')
    .required(),
});

export const GigOverviewschema = yup.object().shape({
  gigsTitle: yup
    .string()
    .required("Gig title is required")
    .min(15, "Title must be at least 15 characters")
    .max(80, "Title must not exceed 80 characters"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("subCategory is required"),
});

const BasicPackageSchema = yup.object().shape({
  package_type: yup.string(),
  name: yup.string().required("Package name is required").min(3),
  description: yup.string().required("Description is required").min(20),
  deliveryTime: yup.string().required("Delivery time required").matches(/^\d+$/),
  revisions: yup.string().required("Revisions required").matches(/^\d+$/),
  concepts: yup.string().required("Concepts required"),
  price: yup.string().required("Price required").matches(/^\d+(\.\d{1,2})?$/),
});

export const packageSchema = yup.object().shape({
  packages: yup.object().shape({
    basic: BasicPackageSchema,
    standard: BasicPackageSchema,
    premium: BasicPackageSchema,
  }),
});

export const DescriptionSchema = yup.object().shape({
  description: yup
    .string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .trim(),
});

const ImageSchema = yup.object({
  fileName: yup.string().required("File Name is required"),
  mimeType: yup.string().required("Mime Type is required"),
  uri: yup.string().required("Image URI is required"),
});

export const GallerySchema = yup.object().shape({
  images: yup
    .array()
    .of(ImageSchema.nullable())
    .test(
      "at-least-one",
      "Please upload at least one image",
      (value) => value?.some((img) => img !== null) ?? false
    )
    .test(
      "max-images",
      "Maximum 3 images allowed",
      (value) => {
        const count = value?.filter((img) => img !== null).length ?? 0;
        return count <= 3;
      }
    ),
});

export const GalleryEditSchema = yup.object().shape({
  images: yup
    .array()
    .test(
      "at-least-one",
      "Please upload at least one image",
      (value) => value?.some((img) => img !== null) ?? false
    )
    .test(
      "max-images",
      "Maximum 3 images allowed",
      (value) => {
        const count = value?.filter((img) => img !== null).length ?? 0;
        return count <= 3;
      }
    ),
});

