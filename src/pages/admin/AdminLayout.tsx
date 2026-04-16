import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  TicketPercent, 
  Users, 
  BarChart3, 
  Wallet, 
  Grid3X3, 
  CookingPot, 
  Split, 
  CreditCard, 
  History,
  Menu,
  X,
  ChevronRight,
  Beer,
  LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import AdminDashboard from '../../components/admin/modules/admin/AdminDashboard';
import ReservationManager from '../../components/admin/modules/reservations/ReservationManager';
import MenuManager from '../../components/admin/modules/menu/MenuManager';
import OffersManager from '../../components/admin/modules/offers/OffersManager';
import CustomerCRM from '../../components/admin/modules/crm/CustomerCRM';
import AnalyticsDashboard from '../../components/admin/modules/analytics/AnalyticsDashboard';
import POSBilling from '../../components/admin/modules/pos/POSBilling';
import FloorManagement from '../../components/admin/modules/floor/FloorManagement';
import KitchenTicketScreen from '../../components/admin/modules/kitchen/KitchenTicketScreen';
import SplitMergeFlow from '../../components/admin/modules/billing/SplitMergeFlow';
import PaymentSettlement from '../../components/admin/modules/billing/PaymentSettlement';
import EODSummary from '../../components/admin/modules/admin/EODSummary';
import toitLogo from '../../assets/toit-logo.png';

import { useAuth } from '../../contexts/AuthContext';

// Helper for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Module IDs
type ModuleId = 
  | 'admin' | 'reservations' | 'menu' | 'offers' 
  | 'crm' | 'analytics' | 'pos' | 'floor' 
  | 'kitchen' | 'split' | 'payment' | 'eod';

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ElementType;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['manager'] },
  { id: 'reservations', label: 'Reservations', icon: CalendarDays, roles: ['manager'] },
  { id: 'pos', label: 'POS Billing', icon: Wallet, roles: ['manager', 'server'] },
  { id: 'floor', label: 'Floor Map', icon: Grid3X3, roles: ['manager', 'server'] },
  { id: 'kitchen', label: 'Kitchen (KDS)', icon: CookingPot, roles: ['manager', 'server', 'chef'] },
  { id: 'menu', label: 'Menu Manager', icon: UtensilsCrossed, roles: ['manager'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['manager'] },
  { id: 'payment', label: 'Settlement', icon: CreditCard, roles: ['manager', 'server'] },
  { id: 'split', label: 'Split Bill', icon: Split, roles: ['manager', 'server'] },
  { id: 'crm', label: 'Customers', icon: Users, roles: ['manager'] },
  { id: 'offers', label: 'Offers', icon: TicketPercent, roles: ['manager'] },
  { id: 'eod', label: 'EOD Summary', icon: History, roles: ['manager'] },
];

export default function AdminLayout() {
  const [activeModule, setActiveModule] = useState<ModuleId>('pos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { profile, signOut } = useAuth();

  const userRole = profile?.role || 'manager';
  const allowedNavItems = NAV_ITEMS.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen bg-base text-ivory overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-surface border-r border-iron/50 transition-all duration-300 flex flex-col z-50 shadow-2xl",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center gap-3 border-b border-iron/30">
          <div className="bg-transparent text-base p-1 rounded-lg">
            <img src={toitLogo} alt="Logo" className={cn("w-10 h-10 object-contain", !isSidebarOpen && "w-12 h-12")} />
          </div>
          {isSidebarOpen && (
            <span className="font-serif font-bold text-lg tracking-tight">Toit</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {allowedNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-gold text-base font-bold shadow-lg shadow-gold/10" 
                    : "text-smoke hover:bg-white/5 hover:text-ivory"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {isSidebarOpen && <span className="text-sm truncate font-medium tracking-tight">{item.label}</span>}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-elevated text-ivory text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] border border-iron shadow-xl">
                    {item.label}
                  </div>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight size={14} className="ml-auto opacity-50" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-iron/30 flex flex-col gap-2">
          <button 
            onClick={signOut}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors group",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium tracking-tight">Access Off</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-smoke hover:text-ivory transition-colors mt-2"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col relative bg-base">
        {/* Header */}
        <header className="h-16 border-b border-iron/30 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-serif font-bold capitalize">
              {NAV_ITEMS.find(n => n.id === activeModule)?.label}
            </h2>
            <div className="h-4 w-[1px] bg-iron/30" />
            <span className="text-[10px] text-smoke font-sans tracking-[0.2em] uppercase">Terminal: Station-01</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gold uppercase tracking-widest">{profile?.full_name || 'Admin'}</span>
              <span className="text-[10px] text-smoke uppercase tracking-tight">{profile?.role || 'Manager'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-copper flex items-center justify-center text-base font-black text-sm border-2 border-base">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Dynamic Screen Area */}
        <section className="p-8 flex-1 animate-brew-reveal">
          <div className="max-w-[1600px] mx-auto h-full">
            {!allowedNavItems.find(i => i.id === activeModule) ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                 <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/30">
                    <X size={48} className="text-rose-500" />
                 </div>
                 <div>
                   <h3 className="text-3xl font-serif font-bold text-ivory">Clearance Needed</h3>
                   <p className="text-smoke font-sans">Your current terminal profile lacks access to "{activeModule}".</p>
                 </div>
              </div>
            ) : activeModule === 'admin' ? (
              <AdminDashboard />
            ) : activeModule === 'reservations' ? (
              <ReservationManager />
            ) : activeModule === 'menu' ? (
              <MenuManager />
            ) : activeModule === 'offers' ? (
              <OffersManager />
            ) : activeModule === 'crm' ? (
              <CustomerCRM />
            ) : activeModule === 'analytics' ? (
              <AnalyticsDashboard />
            ) : activeModule === 'pos' ? (
              <POSBilling />
            ) : activeModule === 'floor' ? (
              <FloorManagement />
            ) : activeModule === 'kitchen' ? (
              <KitchenTicketScreen />
            ) : activeModule === 'split' ? (
              <SplitMergeFlow />
            ) : activeModule === 'payment' ? (
              <PaymentSettlement />
            ) : activeModule === 'eod' ? (
              <EODSummary />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-24 h-24 bg-elevated rounded-3xl flex items-center justify-center border border-iron/50 gold-glow">
                   <Beer size={48} className="text-gold animate-pulse" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-ivory">Brewing Module</h3>
                  <p className="text-smoke font-sans">The "{activeModule}" operational nexus is being prepared.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
