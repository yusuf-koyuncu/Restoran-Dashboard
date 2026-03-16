import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
    ChevronDown,
    ChevronUp,
    Utensils,
    Plus,
    Edit3,
    PlayCircle,
    TrendingUp,
    Percent
} from 'lucide-react';


export const Recipes = () => {
    const { menus, simulateOrder } = useAppContext();
    const [expandedId, setExpandedId] = useState<number | null>(1);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Menüler ve Reçeteler</h3>
                    <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">Menü kalemlerini, içerik maliyetlerini ve kar marjlarını yönetin.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm min-h-[44px] w-full sm:w-auto">
                    <Utensils className="w-4 h-4" />
                    <span>Yeni Menü Ekle</span>
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {menus.map((menu) => {
                    const isExpanded = expandedId === menu.id;

                    const totalCost = menu.recipe.reduce((acc, item) => acc + (item.amount * item.unitCost), 0);
                    const profit = menu.salePrice - totalCost;
                    const margin = (profit / menu.salePrice) * 100;

                    const marginColor = margin >= 65 ? 'text-green-600 bg-green-50' :
                        margin >= 50 ? 'text-yellow-600 bg-yellow-50' :
                            'text-red-600 bg-red-50';

                    return (
                        <div key={menu.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">

                            {/* ACCORDION HEADER */}
                            <div
                                className="p-4 md:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleExpand(menu.id)}
                            >
                                {/* Top row: expand icon + name + simulate button */}
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`p-1.5 rounded-lg shrink-0 ${isExpanded ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-base font-bold text-gray-800 truncate">{menu.name}</h4>
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{menu.category}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); simulateOrder(menu.id); }}
                                        className="flex items-center gap-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm shrink-0 min-h-[40px]"
                                        title="Sipariş Simüle Et"
                                    >
                                        <PlayCircle className="w-4 h-4" />
                                        <span className="hidden sm:inline">Simüle Et</span>
                                    </button>
                                </div>

                                {/* Stats chips row */}
                                <div className="flex flex-wrap gap-2 ml-9">
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-gray-400">Maliyet</span>
                                        <span className="text-sm font-bold text-gray-700">{totalCost.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                                    </div>
                                    <div className="w-px bg-gray-200 self-stretch mx-1 hidden sm:block" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-gray-400">Satış Fiyatı</span>
                                        <span className="text-sm font-bold text-blue-600">{menu.salePrice.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                    <div className="w-px bg-gray-200 self-stretch mx-1 hidden sm:block" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-gray-400">Kar Marjı</span>
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${marginColor}`}>
                                            <TrendingUp className={`w-3 h-3 ${margin < 50 ? 'rotate-180' : ''}`} />
                                            %{margin.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RECIPE DETAILS (EXPANDED) */}
                            {isExpanded && (
                                <div className="border-t border-gray-100 bg-gray-50/50 p-4 md:p-6">
                                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                        <h5 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Utensils className="w-4 h-4 text-gray-400" />
                                            Reçete İçeriği
                                        </h5>
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors shadow-sm min-h-[36px]">
                                                <Plus className="w-3.5 h-3.5" />
                                                Malzeme Ekle
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-blue-600 hover:text-blue-700 hover:border-blue-200 transition-colors shadow-sm min-h-[36px]">
                                                <Edit3 className="w-3.5 h-3.5" />
                                                Fiyat Güncelle
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm whitespace-nowrap min-w-[380px]">
                                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                                                    <tr>
                                                        <th className="px-4 py-3 font-medium">Hammadde</th>
                                                        <th className="px-4 py-3 font-medium text-right">Miktar</th>
                                                        <th className="px-4 py-3 font-medium text-right">Birim Fiyat</th>
                                                        <th className="px-4 py-3 font-medium text-right">Maliyet</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {menu.recipe.map((ingredient) => {
                                                        const itemCost = ingredient.amount * ingredient.unitCost;
                                                        return (
                                                            <tr key={ingredient.id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-4 py-3 font-medium text-gray-700">{ingredient.name}</td>
                                                                <td className="px-4 py-3 text-right text-gray-600">
                                                                    {ingredient.amount} <span className="text-xs text-gray-400">{ingredient.unit}</span>
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-gray-500">
                                                                    {ingredient.unitCost.toLocaleString('tr-TR')} ₺<span className="text-xs text-gray-400">/{ingredient.unit}</span>
                                                                </td>
                                                                <td className="px-4 py-3 text-right font-medium text-gray-800">
                                                                    {itemCost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                                <tfoot className="bg-gray-50 border-t border-gray-200 font-bold text-gray-800">
                                                    <tr>
                                                        <td colSpan={3} className="px-4 py-3 text-right">Toplam Maliyet:</td>
                                                        <td className="px-4 py-3 text-right text-red-600">{totalCost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                            <span className="text-gray-500 font-medium flex items-center gap-1.5"><Percent className="w-4 h-4" /> KDV Hariç Satış:</span>
                                            <span className="font-bold text-gray-800">{menu.salePrice.toLocaleString('tr-TR')} ₺</span>
                                        </div>
                                        <div className={`p-3 rounded-xl border shadow-sm flex items-center justify-between ${margin >= 50 ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'}`}>
                                            <span className={`font-medium ${margin >= 50 ? 'text-green-700' : 'text-red-700'}`}>Net Kar (Porsiyon):</span>
                                            <span className={`font-bold ${margin >= 50 ? 'text-green-700' : 'text-red-700'}`}>{profit.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
