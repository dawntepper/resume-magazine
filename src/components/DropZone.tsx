import { type ReactNode } from 'react';

interface DropZoneProps {
  onDrop: (file: File) => void;
  isLoading?: boolean;
  children?: ReactNode;
}

export default function DropZone({ onDrop, isLoading, children }: DropZoneProps) {
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onDrop(file);
    }
  };

  return (
    <div
      className="border-4 border-dashed p-8 text-center transition-colors hover:border-blue-500 hover:bg-blue-50"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <span className="ml-2">Processing PDF...</span>
        </div>
      ) : children}
    </div>
  );
}