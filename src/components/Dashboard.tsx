import { useAppContext } from '../context/AppContext';
import {
    Utensils,
    AlertTriangle,
    Banknote,
    TrendingDown,
    PlusCircle,
    ShoppingCart,
    RefreshCw,
    Package
} from 'lucide-react';


export const Dashboard = () => {
    const { inventory, menus, recentOrders } = useAppContext();

    const criticalStockList = inventory.filter(item => item.currentAmt <= item.limit);

    const summaryStats = [
        { id: 1, title: 'Toplam Menü', value: menus.length.toString(), icon: Utensils, color: 'text-orange-500', bgColor: 'bg-orange-50' },
        { id: 2, title: 'Kritik Stok', value: `${criticalStockList.length} Ürün`, icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50', isAlert: criticalStockList.length > 0 },
        { id: 3, title: 'Tahmini Maliyet', value: '45.200 ₺', icon: Banknote, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    ];

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full">
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {summaryStats.map((stat) => (
                    <div key={stat.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-300">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm font-medium text-gray-500 mb-0.5">{stat.title}</p>
                            <p className={`text-xl md:text-2xl font-bold ${stat.isAlert ? 'text-red-600' : 'text-gray-800'}`}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-6">

                {/* LEFT COLUMN: CRITICAL STOCK TABLE */}
                <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                <h3 className="text-base font-bold text-gray-800">Kritik Stok Uyarısı</h3>
                            </div>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">Tümünü Gör</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[400px]">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="px-4 md:px-6 py-3 font-semibold">Ürün Adı</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Kalan</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Sınır</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Durum</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {criticalStockList.length > 0 ? criticalStockList.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 md:px-6 py-3 font-medium text-gray-800">{item.name}</td>
                                            <td className="px-4 md:px-6 py-3 text-red-600 font-bold">{item.currentAmt} <span className="text-gray-400 text-xs font-normal">{item.unit}</span></td>
                                            <td className="px-4 md:px-6 py-3 text-gray-500">{item.limit} <span className="text-xs">{item.unit}</span></td>
                                            <td className="px-4 md:px-6 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                                                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
                                                    Kritik
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">Tüm stoklar yeterli seviyede.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RECENT ORDERS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-bold text-gray-800">Son İşlemler & Tüketim</h3>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.length > 0 ? recentOrders.map((order) => (
                                <div key={order.id} className="flex items-start gap-3">
                                    <div className="mt-0.5 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <ShoppingCart className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                            <p className="text-sm font-bold text-gray-800 truncate">{order.item}</p>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{order.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <TrendingDown className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                            <span className="truncate">Eksilen: {order.consumption}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500 text-center py-4">Henüz işlem yapılmadı.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: QUICK ACTIONS */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                        <h3 className="text-base font-bold text-gray-800 mb-5">Hızlı Eylemler</h3>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Yeni Sipariş Gir', icon: ShoppingCart, hover: 'hover:border-primary-500 hover:bg-primary-50', iconHover: 'group-hover:bg-primary-100 group-hover:text-primary-600', textHover: 'group-hover:text-primary-700' },
                                { label: 'Hammadde Ekle', icon: Package, hover: 'hover:border-green-500 hover:bg-green-50', iconHover: 'group-hover:bg-green-100 group-hover:text-green-600', textHover: 'group-hover:text-green-700' },
                                { label: 'Menü Güncelle', icon: Utensils, hover: 'hover:border-blue-500 hover:bg-blue-50', iconHover: 'group-hover:bg-blue-100 group-hover:text-blue-600', textHover: 'group-hover:text-blue-700' },
                            ].map((action) => (
                                <button key={action.label} className={`group flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 transition-all duration-200 min-h-[56px] ${action.hover}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center transition-colors text-gray-600 ${action.iconHover}`}>
                                            <action.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`font-semibold text-sm text-gray-700 ${action.textHover}`}>{action.label}</span>
                                    </div>
                                    <PlusCircle className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
