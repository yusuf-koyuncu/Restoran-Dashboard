import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
    Search,
    Plus,
    Filter,
    Edit2,
    Trash2,
    ArrowDownToLine,
    AlertCircle
} from 'lucide-react';

const categories = ['Tümü', 'Sebze', 'Et', 'Kuru Gıda', 'Süt Ürünleri', 'Yağ', 'Diğer'];


export const Inventory = () => {
    const { inventory } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tümü');

    const filteredMaterials = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full flex flex-col">

            {/* HEADER CONTROLS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Hammadde ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-56 transition-all bg-white shadow-sm min-h-[44px]"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 shadow-sm min-h-[44px]">
                        <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                        <select
                            className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary-500/30 min-h-[44px] w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    <span>Yeni Hammadde Ekle</span>
                </button>
            </div>

            {/* DATA TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="px-4 md:px-6 py-3 font-semibold">Hammadde</th>
                                <th className="px-4 md:px-6 py-3 font-semibold">Kategori</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-right">Miktar</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-right">Sınır</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center">Son Alım</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-right">Birim Fiyat</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-right">Toplam</th>
                                <th className="px-4 md:px-6 py-3 font-semibold text-center">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {filteredMaterials.map((item) => {
                                const isCritical = item.currentAmt <= item.limit;

                                return (
                                    <tr
                                        key={item.id}
                                        className={`transition-colors group ${isCritical ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-gray-50/50'}`}
                                    >
                                        <td className="px-4 md:px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-800">{item.name}</span>
                                                {isCritical && (
                                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Kritik
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-500">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">{item.category}</span>
                                        </td>
                                        <td className={`px-4 md:px-6 py-3.5 font-medium text-right ${isCritical ? 'text-red-600' : 'text-gray-800'}`}>
                                            {item.currentAmt} <span className="text-gray-400 font-normal text-xs">{item.unit}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-500 text-right">
                                            {item.limit} <span className="text-xs">{item.unit}</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-500 text-center">
                                            {new Date(item.lastPurchase).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-700 text-right font-medium">
                                            {item.unitPrice.toLocaleString('tr-TR')} ₺
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-gray-800 text-right font-bold">
                                            {(item.currentAmt * item.unitPrice).toLocaleString('tr-TR')} ₺
                                        </td>
                                        <td className="px-4 md:px-6 py-3.5 text-center">
                                            <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button title="Alım Gir" className="p-1.5 text-green-600 hover:bg-green-100 rounded-md transition-colors"><ArrowDownToLine className="w-4 h-4" /></button>
                                                <button title="Düzenle" className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                <button title="Sil" className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredMaterials.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        Arama kriterlerine uygun hammadde bulunamadı.
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
