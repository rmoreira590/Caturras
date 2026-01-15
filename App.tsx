
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { BirdRecord, EggRecord, BreedingPair, FoodPurchase, Habitat, UserAccount, UserRole } from './types.ts';
import { loadBirds, saveBirds, loadEggs, saveEggs, loadPairs, savePairs, loadFood, saveFood, loadHabitats, saveHabitats, runDataIntegrityCheck } from './services/birdService.ts';
import { initializeAuth, getCurrentUser, logout } from './services/authService.ts';
import { translations } from './translations.ts';
import Dashboard from './components/Dashboard.tsx';
import BirdTable from './components/BirdTable.tsx';
import BirdForm from './components/BirdForm.tsx';
import EggManager from './components/EggManager.tsx';
import PairManager from './components/PairManager.tsx';
import FoodManager from './components/FoodManager.tsx';
import HabitatManager from './components/HabitatManager.tsx';
import DataExplorer from './components/DataExplorer.tsx';
import AICalculator from './components/AICalculator.tsx';
import IDCardManager from './components/IDCardManager.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import UserGuide from './components/UserGuide.tsx';
import Login from './components/Login.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import NewEntrySelector from './components/NewEntrySelector.tsx';
import BrandIcon from './components/BrandIcon.tsx';
import { 
  LayoutGrid, ListChecks, Cpu, Egg, Heart, Warehouse, 
  Wallet, Database, Plus, LogOut, CheckCircle2, IdCard, Info, AlertCircle, ShieldAlert, BookOpen
} from 'lucide-react';

enum AppView {
  MENU = 'MENU', 
  REGISTOS = 'REGISTOS', 
  OVOS = 'OVOS', 
  CASAIS = 'CASAIS', 
  HABITATS = 'HABITATS', 
  FINANCAS = 'FINANCAS', 
  DATA_CENTER = 'DATA_CENTER', 
  AI_LAB = 'AI_LAB', 
  STUDIO = 'STUDIO',
  ADMIN = 'ADMIN', 
  GUIDE = 'GUIDE'
}

const ToastContext = createContext<{ notify: (m: string, t?: 'success' | 'error' | 'info') => void }>({ notify: () => {} });
export const useNotify = () => useContext(ToastContext);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [view, setView] = useState<AppView>(AppView.MENU);
  const [isScanning, setIsScanning] = useState(false);
  const [toasts, setToasts] = useState<any[]>([]);
  
  const [birds, setBirds] = useState<BirdRecord[]>([]);
  const [eggs, setEggs] = useState<EggRecord[]>([]);
  const [pairs, setPairs] = useState<BreedingPair[]>([]);
  const [food, setFood] = useState<FoodPurchase[]>([]);
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  
  const [showEntrySelector, setShowEntrySelector] = useState(false);
  const [showBirdForm, setShowBirdForm] = useState(false);
  const [autoShowTrigger, setAutoShowTrigger] = useState(0); 
  const [showAppContent, setShowAppContent] = useState(false); 
  const t = translations['pt'];

  const notify = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  useEffect(() => {
    if (!showAppContent) return;
    initializeAuth();
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
    
    runDataIntegrityCheck();
    setBirds(loadBirds()); 
    setEggs(loadEggs()); 
    setPairs(loadPairs()); 
    setFood(loadFood()); 
    setHabitats(loadHabitats());
  }, [showAppContent]);

  useEffect(() => {
    if (showAppContent && currentUser) {
      saveBirds(birds); 
      saveEggs(eggs); 
      savePairs(pairs); 
      saveFood(food); 
      saveHabitats(habitats);
    }
  }, [birds, eggs, pairs, food, habitats, showAppContent, currentUser]);

  const navigateTo = (newView: AppView) => {
    setAutoShowTrigger(0); 
    setIsScanning(true);
    setView(newView);
    setTimeout(() => setIsScanning(false), 400);
  };

  if (!showAppContent) return <SplashScreen onAnimationComplete={() => setShowAppContent(true)} />;
  if (!currentUser) return <Login onSuccess={setCurrentUser} lang="pt" t={t} />;

  const isAdmin = currentUser.role === UserRole.Admin;

  return (
    <ErrorBoundary>
      <ToastContext.Provider value={{ notify }}>
        <div className="flex flex-col lg:flex-row h-screen w-screen bg-[#020203] text-white overflow-hidden select-none relative animate-fadeIn">
          {isScanning && <div className="scan-laser-line"></div>}

          {/* SIDEBAR MASTER */}
          <aside className="hidden lg:flex flex-col w-[85px] hover:w-[260px] bg-[#020203] border-r border-white/5 shadow-2xl z-[100] transition-all duration-500 group/sidebar">
            <div className="p-6 mb-8 flex items-center gap-4 overflow-hidden shrink-0">
               <BrandIcon size={40} />
               <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
                  <h1 className="text-xl font-black italic uppercase leading-none text-glamour">Caturras <span className="text-emerald-500 font-light non-italic">Pro</span></h1>
               </div>
            </div>

            <nav className="flex-1 px-3 space-y-2 overflow-y-auto no-scrollbar py-4">
               <SidebarItem active={view === AppView.MENU} onClick={() => navigateTo(AppView.MENU)} icon={<LayoutGrid size={18} />} label="Dashboard" />
               <SidebarItem active={view === AppView.REGISTOS} onClick={() => navigateTo(AppView.REGISTOS)} icon={<ListChecks size={18} />} label="Plantel" />
               <SidebarItem active={view === AppView.AI_LAB} onClick={() => navigateTo(AppView.AI_LAB)} icon={<Cpu size={18} />} label="Bio-Neural" />
               <SidebarItem active={view === AppView.STUDIO} onClick={() => navigateTo(AppView.STUDIO)} icon={<IdCard size={18} />} label="Estúdio" />
               
               <div className="h-px bg-white/5 mx-2 my-4"></div>
               
               <SidebarItem active={view === AppView.OVOS} onClick={() => navigateTo(AppView.OVOS)} icon={<Egg size={18} />} label="Ovos" />
               <SidebarItem active={view === AppView.CASAIS} onClick={() => navigateTo(AppView.CASAIS)} icon={<Heart size={18} />} label="Matrizes" />
               <SidebarItem active={view === AppView.HABITATS} onClick={() => navigateTo(AppView.HABITATS)} icon={<Warehouse size={18} />} label="Habitats" />
               <SidebarItem active={view === AppView.FINANCAS} onClick={() => navigateTo(AppView.FINANCAS)} icon={<Wallet size={18} />} label="Finanças" />
               
               <div className="h-px bg-white/5 mx-2 my-4"></div>
               
               <SidebarItem active={view === AppView.GUIDE} onClick={() => navigateTo(AppView.GUIDE)} icon={<BookOpen size={18} />} label="Manual" />
               <SidebarItem active={view === AppView.DATA_CENTER} onClick={() => navigateTo(AppView.DATA_CENTER)} icon={<Database size={18} />} label="Arquivo" />
               
               {isAdmin && (
                  <SidebarItem active={view === AppView.ADMIN} onClick={() => navigateTo(AppView.ADMIN)} icon={<ShieldAlert size={18} className="text-rose-500" />} label="Security" />
               )}
            </nav>

            <button onClick={() => { logout(); window.location.reload(); }} title="Terminar sessão" className="p-6 mt-auto text-zinc-700 hover:text-rose-500 transition-all flex items-center gap-4 shrink-0 border-t border-white/5">
               <LogOut size={20} /> <span className="opacity-0 group-hover/sidebar:opacity-100 uppercase text-[10px] font-black tracking-widest">Logout</span>
            </button>
          </aside>

          {/* MAIN SURFACE */}
          <main className="flex-1 flex flex-col relative bg-white lg:rounded-l-[3.5rem] shadow-2xl overflow-hidden border-l border-white/10">
            <div className="flex-1 overflow-y-auto no-scrollbar relative pb-24 lg:pb-0">
                 {view === AppView.MENU && <Dashboard birds={birds} eggs={eggs} pairs={pairs} onAddClick={() => setShowEntrySelector(true)} onViewList={() => navigateTo(AppView.REGISTOS)} lang="pt" t={t} />}
                 {view === AppView.REGISTOS && <BirdTable birds={birds} onUpdateBird={(u) => setBirds(birds.map(b => b.id === u.id ? u : b))} onDelete={(id) => setBirds(birds.filter(b => b.id !== id))} onBack={() => navigateTo(AppView.MENU)} setEditState={() => {}} t={t} />}
                 {view === AppView.AI_LAB && <AICalculator birds={birds} onBack={() => navigateTo(AppView.MENU)} lang="pt" />}
                 {view === AppView.STUDIO && <IDCardManager birds={birds} onBack={() => navigateTo(AppView.MENU)} />}
                 {view === AppView.OVOS && <EggManager eggs={eggs} habitats={habitats} autoShowTrigger={autoShowTrigger} onSave={(e) => setEggs([e, ...eggs.filter(x => x.id !== e.id)])} onDelete={(id) => setEggs(eggs.filter(x => x.id !== id))} onBack={() => navigateTo(AppView.MENU)} setEditState={() => {}} t={t} />}
                 {view === AppView.CASAIS && <PairManager birds={birds} pairs={pairs} habitats={habitats} autoShowTrigger={autoShowTrigger} onSave={(p) => setPairs([p, ...pairs.filter(x => x.id !== p.id)])} onDelete={(id) => setPairs(pairs.filter(x => x.id !== id))} onBack={() => navigateTo(AppView.MENU)} setEditState={() => {}} t={t} />}
                 {view === AppView.HABITATS && <HabitatManager habitats={habitats} autoShowTrigger={autoShowTrigger} onSave={(h) => setHabitats([h, ...habitats.filter(x => x.id !== h.id)])} onDelete={(id) => setHabitats(habitats.filter(x => x.id !== id))} onBack={() => navigateTo(AppView.MENU)} setEditState={() => {}} t={t} />}
                 {view === AppView.FINANCAS && <FoodManager purchases={food} autoShowTrigger={autoShowTrigger} onSave={(f) => setFood([f, ...food.filter(x => x.id !== f.id)])} onDelete={(id) => setFood(food.filter(x => x.id !== id))} onBack={() => navigateTo(AppView.MENU)} setEditState={() => {}} />}
                 {view === AppView.DATA_CENTER && (
                    <DataExplorer 
                      birds={birds} setBirds={setBirds} 
                      eggs={eggs} setEggs={setEggs} 
                      pairs={pairs} setPairs={setPairs} 
                      food={food} setFood={setFood}
                      habitats={habitats} setHabitats={setHabitats}
                      onBack={() => navigateTo(AppView.MENU)} 
                    />
                 )}
                 {view === AppView.GUIDE && <UserGuide onBack={() => navigateTo(AppView.MENU)} />}
                 {view === AppView.ADMIN && isAdmin && <AdminPanel onBack={() => navigateTo(AppView.MENU)} t={t} isOnline={true} birds={birds} />}
            </div>
            
            <MobileNav activeView={view} onNavigate={navigateTo} onAdd={() => setShowEntrySelector(true)} />
          </main>

          {/* NOTIFICATION HUB */}
          <div className="fixed top-8 right-8 z-[2000] space-y-4 pointer-events-none">
            {toasts.map((toast: any) => (
              <div key={toast.id} className={`pointer-events-auto flex items-center gap-5 px-8 py-5 rounded-[2rem] shadow-2xl border backdrop-blur-2xl animate-slideInRight ${toast.type === 'success' ? 'bg-emerald-600/90 border-emerald-400 text-white' : toast.type === 'error' ? 'bg-rose-600/90 border-rose-400 text-white' : 'bg-zinc-900/95 border-zinc-700 text-white'}`}>
                <div className="shrink-0">{toast.type === 'success' ? <CheckCircle2 size={20} /> : toast.type === 'info' ? <Info size={20} /> : <AlertCircle size={20} />}</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
              </div>
            ))}
          </div>

          {/* OVERLAY COMPONENTS */}
          {showEntrySelector && <NewEntrySelector onSelect={(type) => { 
            setShowEntrySelector(false); 
            const trigger = Date.now();
            if(type === 'bird') setShowBirdForm(true);
            else if(type === 'egg') { setAutoShowTrigger(trigger); setView(AppView.OVOS); }
            else if(type === 'pair') { setAutoShowTrigger(trigger); setView(AppView.CASAIS); }
            else if(type === 'food') { setAutoShowTrigger(trigger); setView(AppView.FINANCAS); }
            else if(type === 'habitat') { setAutoShowTrigger(trigger); setView(AppView.HABITATS); }
            else if(type === 'ai-calc') { setAutoShowTrigger(trigger); setView(AppView.AI_LAB); }
          }} onClose={() => setShowEntrySelector(false)} isOnline={true} />}

          {showBirdForm && <BirdForm onSave={(b) => { setBirds([b, ...birds]); setShowBirdForm(false); notify("AVE REGISTADA NO PLANTEL", "success"); }} onCancel={() => setShowBirdForm(false)} habitats={habitats} isOnline={true} lang="pt" />}
        </div>
      </ToastContext.Provider>
    </ErrorBoundary>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} title={label} className={`group relative w-full flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 ${active ? 'bg-white/10 text-emerald-400 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]' : 'text-zinc-600 hover:text-white hover:bg-white/[0.03]'}`}>
    <div className={`shrink-0 transition-transform duration-500 ${active ? 'scale-125' : 'group-hover/sidebar:rotate-6'}`}>{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
    {/* Tooltip for collapsed sidebar */}
    <div className="absolute left-full ml-4 z-[101] px-4 py-2 bg-zinc-950 text-white rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover/sidebar:opacity-0 transition-all duration-300 pointer-events-none">
      {label}
    </div>
  </button>
);

const MobileNav = ({ activeView, onNavigate, onAdd }: any) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 h-24 bg-[#020203]/80 backdrop-blur-xl border-t border-white/10 z-[200]">
     <div className="h-full grid grid-cols-5 items-center">
        <MobileNavItem icon={<LayoutGrid />} label="Dashboard" active={activeView === AppView.MENU} onClick={() => onNavigate(AppView.MENU)} />
        <MobileNavItem icon={<ListChecks />} label="Plantel" active={activeView === AppView.REGISTOS} onClick={() => onNavigate(AppView.REGISTOS)} />
        <button onClick={onAdd} title="Adicionar novo registo" className="h-full flex flex-col items-center justify-center gap-1.5 text-white relative -translate-y-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#020203]"><Plus size={32} /></div>
        </button>
        <MobileNavItem icon={<Cpu />} label="Bio-Lab" active={activeView === AppView.AI_LAB} onClick={() => onNavigate(AppView.AI_LAB)} />
        <MobileNavItem icon={<Database />} label="Arquivo" active={activeView === AppView.DATA_CENTER} onClick={() => onNavigate(AppView.DATA_CENTER)} />
     </div>
  </div>
);

const MobileNavItem = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} title={label} className={`h-full flex flex-col items-center justify-center gap-1.5 transition-all ${active ? 'text-emerald-500' : 'text-zinc-500 hover:text-white'}`}>
     <div className={`transition-all ${active ? 'scale-110' : ''}`}>{icon}</div>
     <span className="text-[9px] font-bold tracking-tight">{label}</span>
  </button>
);

export default App;
