import { LayoutDashboard, Package, ClipboardList, Settings, Utensils, BookOpen, X } from 'lucide-react';

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const SidebarItem = ({
    icon: Icon, label, id, activePage, onClick
}: {
    icon: React.ElementType;
    label: string;
    id: string;
    activePage: string;
    onClick: () => void;
}) => {
    const active = activePage === id;
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-left min-h-[48px]
                ${active
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
        >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm">{label}</span>
        </button>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, onClose }) => {
    const handleNav = (page: string) => {
        setActivePage(page);
        onClose();
    };

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col shrink-0
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:w-64 md:z-auto
            `}
        >
            {/* Logo + Close */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shrink-0">
                        <Utensils className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-orange-500">
                        Gusto Yönetim
                    </h1>
                </div>
                {/* Close button — mobile only */}
                <button
                    onClick={onClose}
                    className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    aria-label="Menüyü Kapat"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Nav Items */}
            <nav className="p-3 flex flex-col gap-1 flex-1 overflow-y-auto">
                <SidebarItem id="dashboard" icon={LayoutDashboard} label="Gösterge Paneli" activePage={activePage} onClick={() => handleNav('dashboard')} />
                <SidebarItem id="inventory" icon={Package} label="Envanter" activePage={activePage} onClick={() => handleNav('inventory')} />
                <SidebarItem id="recipes" icon={BookOpen} label="Menüler & Reçeteler" activePage={activePage} onClick={() => handleNav('recipes')} />
                <SidebarItem id="orders" icon={ClipboardList} label="Siparişler" activePage={activePage} onClick={() => handleNav('orders')} />
                <SidebarItem id="settings" icon={Settings} label="Ayarlar" activePage={activePage} onClick={() => handleNav('settings')} />
            </nav>

            {/* User info */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600 shrink-0">Y</div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">Yönetici</p>
                        <p className="text-xs text-gray-500 truncate">admin@restoran.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
