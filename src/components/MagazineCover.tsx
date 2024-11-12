import { type ReactNode } from 'react';

interface MagazineCoverProps {
  name: string;
  title: string;
  experience: Array<{
    company: string;
    role: string;
    years: string;
  }>;
}

export default function MagazineCover({ name, title, experience }: MagazineCoverProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <header className="border-b-4 border-black pb-4 mb-6">
        <h2 className="text-6xl font-headline font-bold">THE PROFESSIONAL TIMES</h2>
        <p className="text-gray-600 mt-2">Where Excellence Meets Innovation</p>
      </header>

      <article className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <h1 className="text-5xl font-headline font-bold leading-tight mb-4">
            {name}: {title}
          </h1>
          <div className="aspect-video bg-gray-200 mb-4">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Profile Image</p>
            </div>
          </div>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <h3 className="text-xl font-bold">{exp.company}</h3>
                <p className="text-gray-600">{exp.role} | {exp.years}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="col-span-4">
          <div className="bg-gray-100 p-4 mb-6">
            <h3 className="text-2xl font-headline font-bold mb-3">Highlights</h3>
            <ul className="space-y-2">
              <li>✨ Industry Expert</li>
              <li>🚀 Innovation Leader</li>
              <li>💡 Problem Solver</li>
              <li>🤝 Team Builder</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-headline font-bold">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="block text-blue-600 hover:underline">
                Portfolio →
              </a>
              <a href="#" className="block text-blue-600 hover:underline">
                LinkedIn →
              </a>
              <a href="#" className="block text-blue-600 hover:underline">
                GitHub →
              </a>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
}