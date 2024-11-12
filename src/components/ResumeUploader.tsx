import { useState } from 'react';

export default function ResumeUploader({ onUpload }: { onUpload: (data: any) => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      // Here you would typically send the file to your backend
      // For now, we'll just simulate parsing the resume
      const mockData = {
        name: "Your Name",
        title: "Senior Software Engineer",
        experience: [
          { company: "Tech Corp", role: "Lead Developer", years: "2020-Present" },
          { company: "StartUp Inc", role: "Full Stack Developer", years: "2018-2020" }
        ]
      };
      onUpload(mockData);
    }
  };

  return (
    <div
      className={`border-4 border-dashed p-8 text-center transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <p className="text-xl mb-2">Drop your resume here</p>
      <p className="text-gray-500">Supports PDF, DOC, DOCX</p>
    </div>
  );
}