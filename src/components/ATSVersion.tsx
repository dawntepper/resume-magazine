import { type ReactNode } from 'react';

interface ATSVersionProps {
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

export default function ATSVersion(props: ATSVersionProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
      {/* Schema.org JobPosting structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          "name": props.name,
          "jobTitle": props.title,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": props.contact?.location
          },
          "email": props.contact?.email,
          "telephone": props.contact?.phone,
          "workExperience": props.experience.map(exp => ({
            "@type": "WorkExperience",
            "jobTitle": exp.role,
            "employer": {
              "@type": "Organization",
              "name": exp.company
            },
            "dateOccupied": exp.years
          }))
        })}
      </script>

      {/* ATS-optimized content */}
      <div className="space-y-6 font-body text-gray-800">
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold">{props.name}</h1>
          <h2 className="text-xl text-gray-600 mt-1">{props.title}</h2>
          {props.contact && (
            <div className="mt-2 text-sm text-gray-600">
              {props.contact.email && <div>{props.contact.email}</div>}
              {props.contact.phone && <div>{props.contact.phone}</div>}
              {props.contact.location && <div>{props.contact.location}</div>}
            </div>
          )}
        </header>

        <section>
          <h3 className="text-xl font-bold mb-3">Professional Experience</h3>
          <div className="space-y-4">
            {props.experience.map((exp, index) => (
              <div key={index}>
                <div className="font-bold">{exp.role}</div>
                <div>{exp.company} | {exp.years}</div>
                {exp.description && (
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {props.education && props.education.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-3">Education</h3>
            <div className="space-y-2">
              {props.education.map((edu, index) => (
                <div key={index}>
                  <div className="font-bold">{edu.degree}</div>
                  <div>{edu.school} | {edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {props.skills && props.skills.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {props.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}