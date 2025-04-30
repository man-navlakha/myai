import { Home, Settings, ArrowLeftToLine, MessagesSquare, MessageSquarePlus   } from 'lucide-react';

import Link from 'next/link';
interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar = ({ isOpen, onToggleSidebar }: SidebarProps) => {
  return (
    <div
    className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out
      ${isOpen ? 'w-screen md:w-64' : 'w-0 md:w-0 overflow-hidden'}
      bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-r border-white/20 text-black dark:text-white`}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
      <span className="text-xl font-semibold">Solvinger</span>
      <button onClick={onToggleSidebar} aria-label="Close sidebar">
        <ArrowLeftToLine className="w-5 h-5" />
      </button>
    </div>

    <div className="flex flex-col gap-2 p-4 text-black dark:text-white">
    <Link
        href="/"
        className="flex items-center gap-3 px-3 py-2 rounded-md border border-blue-700/30 dark:border-blue-300/40  hover:bg-blue-200 dark:hover:bg-blue-700 transition"
      >
        <MessageSquarePlus   />
        <span className=" md:block">New Chat</span>
      </Link>
      <p>Chats </p>
    <Link
        href="/"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <MessagesSquare  />
        <span className=" md:block">Home</span>
      </Link>
    </div>
  
    {/* Navigation */}
    <nav className="flex flex-col gap-2 p-4 text-black dark:text-white">
      <Link
        href="/"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Home />
        <span className=" md:block">Home</span>
      </Link>
  
      <Link
        href="/settings"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Settings />
        <span className=" md:inline">Settings</span>
      </Link>
    </nav>
  </div>
  
  );
};

export default Sidebar;
