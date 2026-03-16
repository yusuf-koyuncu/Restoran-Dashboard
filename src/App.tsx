import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Recipes } from './components/Recipes';
import { Orders } from './components/Orders';
import { Settings } from './components/Settings';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/Toast';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (page: string) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  let Content;
  let title;

  switch (activePage) {
    case 'dashboard':
      Content = <Dashboard />;
      title = 'Gösterge Paneli';
      break;
    case 'inventory':
      Content = <Inventory />;
      title = 'Hammadde ve Stok';
      break;
    case 'recipes':
      Content = <Recipes />;
      title = 'Menüler & Reçeteler';
      break;
    case 'orders':
      Content = <Orders />;
      title = 'Sipariş Yönetimi';
      break;
    case 'settings':
      Content = <Settings />;
      title = 'Ayarlar';
      break;
    default:
      Content = <Dashboard />;
      title = 'Gösterge Paneli';
  }

  return (
    <AppProvider>
      <div className="h-screen w-full flex bg-gray-50 font-sans overflow-hidden relative">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          activePage={activePage}
          setActivePage={navigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
          <Header
            title={title}
            onMenuOpen={() => setSidebarOpen(true)}
          />
          {Content}
        </main>

        <Toast />
      </div>
    </AppProvider>
  );
}
