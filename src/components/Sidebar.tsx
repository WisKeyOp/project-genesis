import { Map, LayoutDashboard, PlusCircle, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const navItems = [
  { icon: Map, label: 'Roadmap' },
  { icon: LayoutDashboard, label: 'Board', active: true },
  { icon: PlusCircle, label: 'Add Item' },
  { icon: Settings, label: 'Project Settings' },
];

export function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="w-52 bg-sidebar text-sidebar-foreground flex flex-col animate-slide-in">
      <div className="p-4">
        <h1 className="text-lg font-bold text-sidebar-primary">Design Team</h1>
      </div>
      
      <nav className="flex-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              item.active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
