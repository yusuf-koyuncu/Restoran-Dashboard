import { useState } from 'react';
import {
    Store,
    Phone,
    Mail,
    MapPin,
    Clock,
    Globe,
    Users,
    Save,
    Camera,
    Utensils,
    ChevronRight,
} from 'lucide-react';

interface FormData {
    restaurantName: string;
    tagline: string;
    category: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    city: string;
    openTime: string;
    closeTime: string;
    capacity: string;
    taxId: string;
    currency: string;
    language: string;
}

const initialData: FormData = {
    restaurantName: 'Gusto Restoran',
    tagline: 'Eşsiz lezzetler, unutulmaz anlar',
    category: 'Burger & Pizza',
    phone: '+90 212 555 0142',
    email: 'info@gustorestoran.com',
    website: 'www.gustorestoran.com',
    address: 'Bağcılar Mahallesi, Gürsel Caddesi No: 47',
    city: 'İstanbul',
    openTime: '10:00',
    closeTime: '23:00',
    capacity: '80',
    taxId: '1234567890',
    currency: 'TRY',
    language: 'tr',
};

const Field = ({
    label, value, onChange, type = 'text', icon: Icon, readOnly = false, hint
}: {
    label: string;
    value: string;
    onChange?: (v: string) => void;
    type?: string;
    icon?: React.ElementType;
    readOnly?: boolean;
    hint?: string;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
            {Icon && <Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />}
            <input
                type={type}
                value={value}
                readOnly={readOnly}
                onChange={e => onChange?.(e.target.value)}
                className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[44px]
                    ${readOnly ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'}`}
            />
        </div>
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
);

const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        </div>
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {children}
        </div>
    </div>
);

export const Settings = () => {
    const [form, setForm] = useState<FormData>(initialData);
    const [saved, setSaved] = useState(false);

    const set = (key: keyof FormData) => (value: string) => setForm(prev => ({ ...prev, [key]: value }));

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="p-4 md:p-8 overflow-y-auto flex-1 h-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-5 md:gap-6 pb-10">

                {/* Page Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">Restoran Ayarları</h3>
                        <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">İşletme bilgilerini ve uygulama tercihlerini yönetin.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 min-h-[48px] w-full sm:w-auto
                            ${saved
                                ? 'bg-green-500 text-white shadow-green-200'
                                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-200'
                            }`}
                    >
                        <Save className="w-4 h-4" />
                        {saved ? 'Kaydedildi ✓' : 'Değişiklikleri Kaydet'}
                    </button>
                </div>

                {/* PROFILE AVATAR CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg shadow-primary-200">
                            G
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-primary-400 transition-colors">
                            <Camera className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-base md:text-lg font-bold text-gray-800">{form.restaurantName}</h2>
                        <p className="text-sm text-gray-500 italic mt-0.5">"{form.tagline}"</p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                            <span className="text-xs font-medium bg-primary-50 text-primary-600 border border-primary-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Utensils className="w-3 h-3" /> {form.category}
                            </span>
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {form.openTime}–{form.closeTime}
                            </span>
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Users className="w-3 h-3" /> {form.capacity} Kişi
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 hidden sm:block shrink-0" />
                </div>

                <SectionCard title="Temel Bilgiler" icon={Store}>
                    <Field label="Restoran Adı" value={form.restaurantName} onChange={set('restaurantName')} icon={Store} />
                    <Field label="Slogan" value={form.tagline} onChange={set('tagline')} />
                    <Field label="Kategori" value={form.category} onChange={set('category')} />
                    <Field label="Vergi Kimlik No" value={form.taxId} onChange={set('taxId')} hint="Mali kayıtlarda kullanılır" />
                </SectionCard>

                <SectionCard title="İletişim Bilgileri" icon={Phone}>
                    <Field label="Telefon" value={form.phone} onChange={set('phone')} icon={Phone} type="tel" />
                    <Field label="E-Posta" value={form.email} onChange={set('email')} icon={Mail} type="email" />
                    <Field label="Web Sitesi" value={form.website} onChange={set('website')} icon={Globe} />
                    <Field label="Şehir" value={form.city} onChange={set('city')} icon={MapPin} />
                    <div className="sm:col-span-2">
                        <Field label="Adres" value={form.address} onChange={set('address')} icon={MapPin} />
                    </div>
                </SectionCard>

                <SectionCard title="Çalışma Saatleri & Kapasite" icon={Clock}>
                    <Field label="Açılış Saati" value={form.openTime} onChange={set('openTime')} icon={Clock} type="time" />
                    <Field label="Kapanış Saati" value={form.closeTime} onChange={set('closeTime')} icon={Clock} type="time" />
                    <Field label="Kapasite (kişi)" value={form.capacity} onChange={set('capacity')} icon={Users} type="number" />
                </SectionCard>

                <SectionCard title="Uygulama Tercihleri" icon={Globe}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Para Birimi</label>
                        <select
                            value={form.currency}
                            onChange={e => set('currency')(e.target.value)}
                            className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-300 transition-all min-h-[44px]"
                        >
                            <option value="TRY">🇹🇷 Türk Lirası (₺)</option>
                            <option value="USD">🇺🇸 ABD Doları ($)</option>
                            <option value="EUR">🇪🇺 Euro (€)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Dil</label>
                        <select
                            value={form.language}
                            onChange={e => set('language')(e.target.value)}
                            className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-300 transition-all min-h-[44px]"
                        >
                            <option value="tr">Türkçe</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </SectionCard>

            </div>
        </div>
    );
};
