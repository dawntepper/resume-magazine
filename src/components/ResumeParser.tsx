import { useState } from 'react';
import type { ResumeData } from '../types/resume';
import { extractTextFromPDF, parseResumeText } from '../utils/pdfParser';
import DropZone from './DropZone';
import ViewToggle from './ViewToggle';
import MagazineCover from './MagazineCover';
import ATSVersion from './ATSVersion';

export default function ResumeParser() {
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [viewMode, setViewMode] = useState<'magazine' | 'ats'>('magazine');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setParsedData(null);

    try {
      const text = await extractTextFromPDF(file);
      if (!text.trim()) {
        throw new Error('No text content found in PDF');
      }
      
      const resumeData = parseResumeText(text);
      setParsedData(resumeData);
    } catch (err) {
      console.error('Resume processing error:', err);
      setError(err instanceof Error ? err.message : 'Error processing PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DropZone onDrop={handleFileDrop} isLoading={isLoading}>
        <p className="text-xl mb-2">Drop your resume PDF here</p>
        <p className="text-gray-500">PDF files only</p>
      </DropZone>
      
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {parsedData && (
        <div className="space-y-6">
          <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
          {viewMode === 'magazine' ? (
            <MagazineCover {...parsedData} />
          ) : (
            <ATSVersion {...parsedData} />
          )}
        </div>
      )}
    </div>
  );
}