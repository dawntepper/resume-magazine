import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import type { ResumeData } from '../types/resume';

// Configure worker with explicit version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({ data: arrayBuffer, useWorkerFetch: false });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter((item): item is TextItem => 'str' in item)
          .map(item => item.str)
          .join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        console.error(`Error extracting text from page ${i}:`, pageError);
        continue; // Continue with next page if one fails
      }
    }
    
    if (!fullText.trim()) {
      throw new Error('No text content found in PDF');
    }
    
    return fullText;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
    throw new Error('Failed to extract text from PDF');
  }
}

export function parseResumeText(text: string): ResumeData {
  if (!text.trim()) {
    throw new Error('No text content to parse');
  }

  const lines = text.split('\n').filter(line => line.trim());
  const data: ResumeData = {
    name: '',
    title: '',
    experience: [],
    skills: [],
    education: [],
    contact: {}
  };

  let currentSection = '';
  let experienceBuffer = '';

  try {
    // First two non-empty lines are name and title
    if (lines.length >= 1) data.name = lines[0].trim();
    if (lines.length >= 2) data.title = lines[1].trim();

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      
      // Section detection
      if (line.includes('experience')) {
        currentSection = 'experience';
        continue;
      } else if (line.includes('education')) {
        currentSection = 'education';
        continue;
      } else if (line.includes('skills')) {
        currentSection = 'skills';
        continue;
      } else if (line.includes('contact')) {
        currentSection = 'contact';
        continue;
      }

      // Skip empty lines
      if (!lines[i].trim()) continue;

      switch (currentSection) {
        case 'experience':
          if (line.includes('|')) {
            if (experienceBuffer) {
              const [company, role, years] = experienceBuffer.split('|').map(s => s.trim());
              if (company && role && years) {
                data.experience.push({ company, role, years });
              }
            }
            experienceBuffer = lines[i];
          } else {
            experienceBuffer += ' ' + lines[i];
          }
          break;

        case 'education':
          if (line.includes('|')) {
            const [degree, school, year] = lines[i].split('|').map(s => s.trim());
            if (degree && school) {
              data.education?.push({ degree, school, year });
            }
          }
          break;

        case 'skills':
          if (lines[i].trim()) {
            data.skills?.push(...lines[i].split(',').map(s => s.trim()));
          }
          break;

        case 'contact':
          const contactLine = lines[i].toLowerCase();
          if (contactLine.includes('@')) {
            data.contact!.email = lines[i].trim();
          } else if (contactLine.match(/[\d-()]/)) {
            data.contact!.phone = lines[i].trim();
          } else {
            data.contact!.location = lines[i].trim();
          }
          break;
      }
    }

    // Process any remaining experience buffer
    if (experienceBuffer) {
      const [company, role, years] = experienceBuffer.split('|').map(s => s.trim());
      if (company && role && years) {
        data.experience.push({ company, role, years });
      }
    }

    // Validate required fields
    if (!data.name || !data.title) {
      throw new Error('Resume must include at least a name and title');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Resume parsing failed: ${error.message}`);
    }
    throw new Error('Failed to parse resume content');
  }
}