export interface ResumeData {
  name: string;
  title: string;
  experience: Array<{
    company: string;
    role: string;
    years: string;
    description?: string;
  }>;
  skills?: string[];
  education?: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
  };
}