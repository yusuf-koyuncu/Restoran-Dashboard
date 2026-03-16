import { useApp } from '../context/AppContext';
import type { OrderStatus } from '../context/AppContext';
import { CheckCircle2, Clock, XCircle, ShoppingBag, UtensilsCrossed, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
    const { orders, updateOrderStatus } = useApp();

    const stats = [
        { title: 'Aktif Siparişler', value: orders.filter(o => o.status !== 'Teslim Edildi' && o.status !== 'İptal').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
        { title: 'Bugünkü Kazanç', value: `${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString('tr-TR')} ₺`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
        { title: 'Tamamlanan', value: orders.filter(o => o.status === 'Teslim Edildi').length, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Hazırlanıyor': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Hazır': return 'bg-green-100 text-green-800 border-green-200';
            case 'Teslim Edildi': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'İptal': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const StatusButton = ({ orderId, currentStatus, targetStatus, label, icon: Icon, activeClass }: { orderId: number, currentStatus: string, targetStatus: OrderStatus, label: string, icon: any, activeClass: string }) => {
        const isActive = currentStatus === targetStatus;
        return (
            <button
                onClick={() => updateOrderStatus(orderId, targetStatus)}
                disabled={isActive}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                    ? `${activeClass} cursor-default` 
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
                <Icon className={`w-4 h-4 ${isActive ? '' : 'text-gray-400'}`} />
                {label}
            </button>
        );
    };

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full bg-gray-50/50">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-50 rounded-lg">
                                <ShoppingBag className="w-5 h-5 text-primary-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Aktif Siparişler</h2>
                        </div>
                    </div>
                    
                    <div className="divide-y divide-gray-50">
                        {orders.map((order) => (
                            <div key={order.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    
                                    {/* Order Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-sm font-bold text-gray-900">#{order.id}</span>
                                                    <span className="text-sm text-gray-500">•</span>
                                                    <span className="text-sm font-medium text-gray-700">{order.customerName}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {new Date(order.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div className="space-y-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-gray-700">{item.quantity}x</span>
                                                            <span className="text-gray-600">{item.name}</span>
                                                        </div>
                                                        <span className="font-medium text-gray-900">{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center text-sm">
                                                <span className="font-semibold text-gray-500">Toplam</span>
                                                <span className="text-base font-bold text-primary-600">{order.total.toLocaleString('tr-TR')} ₺</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex flex-row lg:flex-col justify-end gap-2 lg:min-w-[160px]">
                                        <StatusButton 
                                            orderId={order.id} 
                                            currentStatus={order.status} 
                                            targetStatus="Hazırlanıyor" 
                                            label="Hazırlanıyor" 
                                            icon={UtensilsCrossed}
                                            activeClass="bg-amber-100 text-amber-700 border border-amber-200"
                                        />
                                        <StatusButton 
                                            orderId={order.id} 
                                            currentStatus={order.status} 
                                            targetStatus="Hazır" 
                                            label="Hazır" 
                                            icon={CheckCircle2}
                                            activeClass="bg-green-100 text-green-700 border border-green-200"
                                        />
                                        <StatusButton 
                                            orderId={order.id} 
                                            currentStatus={order.status} 
                                            targetStatus="Teslim Edildi" 
                                            label="Teslim Edildi" 
                                            icon={ShoppingBag}
                                            activeClass="bg-blue-100 text-blue-700 border border-blue-200"
                                        />
                                        <StatusButton 
                                            orderId={order.id} 
                                            currentStatus={order.status} 
                                            targetStatus="İptal" 
                                            label="İptal" 
                                            icon={XCircle}
                                            activeClass="bg-red-100 text-red-700 border border-red-200"
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-lg font-medium text-gray-900">Henüz sipariş yok</p>
                                <p className="text-sm">Yeni siparişler burada listelenecektir.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
