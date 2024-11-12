interface ViewToggleProps {
  currentView: 'magazine' | 'ats';
  onViewChange: (view: 'magazine' | 'ats') => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => onViewChange('magazine')}
        className={`px-4 py-2 rounded ${
          currentView === 'magazine' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        Magazine View
      </button>
      <button
        onClick={() => onViewChange('ats')}
        className={`px-4 py-2 rounded ${
          currentView === 'ats' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        ATS View
      </button>
    </div>
  );
}