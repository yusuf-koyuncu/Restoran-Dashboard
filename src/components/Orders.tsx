import { useState } from 'react';
import { useApp } from '../context/AppContext';
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

const statusConfig: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
    'Teslim Edildi': { label: 'Teslim Edildi', icon: CheckCircle2, classes: 'bg-green-50 text-green-700 border-green-200' },
    'Hazırlanıyor': { label: 'Hazırlanıyor', icon: Loader2, classes: 'bg-blue-50 text-blue-700 border-blue-200' },
    'İptal': { label: 'İptal', icon: XCircle, classes: 'bg-red-50 text-red-700 border-red-200' },
    'Hazır': { label: 'Hazır', icon: Clock, classes: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
};

const ALL_STATUSES = ['Tümü', 'Teslim Edildi', 'Hazırlanıyor', 'Hazır', 'İptal'];

export const Orders = () => {
    const { orders } = useApp();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tümü');

    const mappedOrders = orders.map(o => ({
        id: `#${o.id}`,
        customer: o.customerName,
        items: o.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
        time: new Date(o.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        status: o.status,
        total: o.total,
        table: 'Masa/Paket',
        paymentMethod: 'Bilinmiyor'
    }));

    const filtered = mappedOrders.filter(o => {
        const matchSearch = String(o.id).includes(search) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.items.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'Tümü' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const todayRevenue = mappedOrders.filter(o => o.status === 'Teslim Edildi').reduce((sum, o) => sum + o.total, 0);
    const activeOrdersCount = mappedOrders.filter(o => o.status === 'Hazırlanıyor' || o.status === 'Hazır').length;
    const completedOrdersCount = mappedOrders.filter(o => o.status === 'Teslim Edildi').length;

    const summaryStats = [
        { title: "Bugünkü Ciro", value: `${todayRevenue.toLocaleString('tr-TR')} ₺`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { title: "Toplam Sipariş", value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: "Aktif Sipariş", value: activeOrdersCount.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: "Tamamlanan", value: completedOrdersCount.toString(), icon: CheckCircle2, color: 'text-primary-600', bg: 'bg-primary-50' },
    ];

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full flex flex-col gap-5 md:gap-8 bg-gray-50/50">

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
                                {s.value}
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
                                const cfg = statusConfig[order.status] || { icon: Loader2, label: order.status, classes: 'bg-gray-50 text-gray-700' };
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
