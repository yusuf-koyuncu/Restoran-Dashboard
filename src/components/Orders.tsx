import { useState } from 'react';
import {
    ClipboardList,
    Search,
    Filter,
    TrendingUp,
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2,
    Eye,
} from 'lucide-react';

type OrderStatus = 'Tamamlandı' | 'Hazırlanıyor' | 'İptal Edildi' | 'Beklemede';

interface Order {
    id: string;
    customer: string;
    items: string;
    total: number;
    status: OrderStatus;
    time: string;
    table: string;
    paymentMethod: string;
}

const mockOrders: Order[] = [
    { id: '#1042', customer: 'Masa 5', items: '2x Hamburger Menü, 1x Sezar Salata', total: 410, status: 'Tamamlandı', time: '17:02', table: 'Masa 5', paymentMethod: 'Nakit' },
    { id: '#1041', customer: 'Masa 2', items: '1x Margherita Pizza, 2x Ayran', total: 170, status: 'Hazırlanıyor', time: '16:55', table: 'Masa 2', paymentMethod: 'Kredi Kartı' },
    { id: '#1040', customer: 'Masa 8', items: '3x Hamburger Menü', total: 450, status: 'Hazırlanıyor', time: '16:50', table: 'Masa 8', paymentMethod: 'Kredi Kartı' },
    { id: '#1039', customer: 'Paket', items: '1x Sezar Salata, 1x Margherita Pizza', total: 250, status: 'Tamamlandı', time: '16:38', table: 'Paket', paymentMethod: 'Online' },
    { id: '#1038', customer: 'Masa 1', items: '2x Margherita Pizza', total: 280, status: 'Tamamlandı', time: '16:21', table: 'Masa 1', paymentMethod: 'Nakit' },
    { id: '#1037', customer: 'Masa 3', items: '1x Hamburger Menü', total: 150, status: 'İptal Edildi', time: '16:10', table: 'Masa 3', paymentMethod: '-' },
    { id: '#1036', customer: 'Masa 6', items: '4x Sezar Salata', total: 440, status: 'Tamamlandı', time: '15:55', table: 'Masa 6', paymentMethod: 'Kredi Kartı' },
    { id: '#1035', customer: 'Paket', items: '2x Hamburger Menü, 2x Pizza', total: 580, status: 'Tamamlandı', time: '15:40', table: 'Paket', paymentMethod: 'Online' },
    { id: '#1034', customer: 'Masa 4', items: '1x Sezar Salata', total: 110, status: 'Beklemede', time: '17:08', table: 'Masa 4', paymentMethod: '-' },
    { id: '#1033', customer: 'Masa 7', items: '2x Pizza, 1x Hamburger Menü', total: 430, status: 'Tamamlandı', time: '15:20', table: 'Masa 7', paymentMethod: 'Nakit' },
];

const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; classes: string }> = {
    'Tamamlandı': { label: 'Tamamlandı', icon: CheckCircle2, classes: 'bg-green-50 text-green-700 border-green-200' },
    'Hazırlanıyor': { label: 'Hazırlanıyor', icon: Loader2, classes: 'bg-blue-50 text-blue-700 border-blue-200' },
    'İptal Edildi': { label: 'İptal', icon: XCircle, classes: 'bg-red-50 text-red-700 border-red-200' },
    'Beklemede': { label: 'Beklemede', icon: Clock, classes: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
};

const ALL_STATUSES = ['Tümü', 'Tamamlandı', 'Hazırlanıyor', 'Beklemede', 'İptal Edildi'];

const summaryStats = [
    { title: "Bugünkü Ciro", icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { title: "Toplam Sipariş", value: "42", icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: "Aktif Sipariş", value: "3 Masa", icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: "Tamamlanan", value: "38", icon: CheckCircle2, color: 'text-primary-600', bg: 'bg-primary-50' },
];

export const Orders = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tümü');

    const filtered = mockOrders.filter(o => {
        const matchSearch = o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.items.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'Tümü' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const todayRevenue = mockOrders.filter(o => o.status === 'Tamamlandı').reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full flex flex-col gap-5 md:gap-8">

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {summaryStats.map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-300">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                            <s.icon className={`w-5 h-5 md:w-6 md:h-6 ${s.color}`} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">{s.title}</p>
                            <p className="text-lg md:text-xl font-bold text-gray-800">
                                {i === 0 ? `${todayRevenue.toLocaleString('tr-TR')} ₺` : s.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
                {/* Controls */}
                <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-primary-600" />
                        <h3 className="text-sm font-bold text-gray-800">Sipariş Geçmişi</h3>
                        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{filtered.length}</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Sipariş ara..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-44 transition-all min-h-[44px]"
                            />
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-2.5 bg-white min-h-[44px]">
                            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer max-w-[100px]"
                            >
                                {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table with horizontal scroll */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[640px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="px-4 md:px-6 py-3 font-semibold">No</th>
                                <th className="px-4 md:px-6 py-3 font-semibold">Müşteri</th>
                                <th className="px-4 md:px-6 py-3 font-semibold">Ürünler</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center">Saat</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center">Ödeme</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center">Durum</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-right">Tutar</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map(order => {
                                const cfg = statusConfig[order.status];
                                const StatusIcon = cfg.icon;
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors group">
                                        <td className="px-4 md:px-6 py-3.5 font-bold text-gray-700">{order.id}</td>
                                        <td className="px-4 md:px-6 py-3.5 font-medium text-gray-800">{order.customer}</td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-500 max-w-[200px] truncate">{order.items}</td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-500 text-center">{order.time}</td>
                                        <td className="px-4 md:px-6 py-3.5 text-center">
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{order.paymentMethod}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-center">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${cfg.classes}`}>
                                                <StatusIcon className={`w-3 h-3 ${order.status === 'Hazırlanıyor' ? 'animate-spin' : ''}`} />
                                                {cfg.label}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-right font-bold text-gray-800">{order.total.toLocaleString('tr-TR')} ₺</td>
                                        <td className="px-4 md:px-6 py-3.5 text-center">
                                            <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-16 text-center text-gray-400">
                                        Sipariş bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
