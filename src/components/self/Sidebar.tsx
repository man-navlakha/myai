import { Home, Settings, ArrowLeftToLine } from 'lucide-react';

import Link from 'next/link';
interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar = ({ isOpen, onToggleSidebar }: SidebarProps) => {
  return (
    <div className={` top-0 left-0 flex flex-col h-screen dark:bg-gray-800 bg-gray-100  dark:text-white transition-all duration-300 ${isOpen ? 'w-screen md:w-64 z-50' : 'hidden'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="text-lg font-semibold">Solvinger</span>
        <button onClick={onToggleSidebar}>
        <ArrowLeftToLine  />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <Link href="/" className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded">
          <Home />
          {isOpen && <span>Home</span>}
        </Link>
        <Link href="/settings" className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded">
          <Settings />
          {isOpen && <span>Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
