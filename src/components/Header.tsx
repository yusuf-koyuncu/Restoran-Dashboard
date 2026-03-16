import React from 'react';
import { Search, Bell, RotateCcw, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
    title: string;
    onMenuOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuOpen }) => {
    const { resetDemo } = useAppContext();

    const handleReset = () => {
        if (window.confirm('Tüm demo verileri başlangıç haline sıfırlansın mı?')) {
            resetDemo();
        }
    };

    return (
        <header className="h-16 md:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 gap-3">

            {/* Left: Hamburger (mobile) + Title */}
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={onMenuOpen}
                    className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                    aria-label="Menüyü Aç"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="min-w-0">
                    <h2 className="text-base md:text-2xl font-bold text-gray-800 truncate">{title}</h2>
                    <p className="text-xs text-gray-400 hidden sm:block">
                        Bugün: {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Right: Search + Buttons */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">

                {/* Search — hidden on small screens */}
                <div className="relative hidden lg:block">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Ürün veya menü ara..."
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-52 transition-all"
                    />
                </div>

                {/* Reset button — icon only on mobile, full text on sm+ */}
                <button
                    onClick={handleReset}
                    title="Demo verilerini sıfırla"
                    className="flex items-center gap-1.5 px-3 py-2 md:px-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 hover:border-red-400 active:scale-95 transition-all duration-150 cursor-pointer min-h-[40px]"
                >
                    <RotateCcw className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Sıfırla</span>
                </button>

                {/* Bell */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};
