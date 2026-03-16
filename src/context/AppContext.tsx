import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// --- TYPES ---
export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
    unitCost: number;
}

export interface Menu {
    id: number;
    name: string;
    category: string;
    salePrice: number;
    recipe: Ingredient[];
}

export interface Material {
    id: number;
    name: string;
    category: string;
    unit: string;
    currentAmt: number;
    limit: number;
    lastPurchase: string;
    unitPrice: number;
}

export interface RecentOrder {
    id: number;
    item: string;
    time: string;
    consumption: string;
}

export interface Notification {
    type: 'success' | 'error';
    message: string;
    id: number;
}

interface AppContextType {
    inventory: Material[];
    menus: Menu[];
    recentOrders: RecentOrder[];
    notifications: Notification[];
    simulateOrder: (menuId: number) => void;
    removeNotification: (id: number) => void;
    resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- INITIAL MOCK DATA ---
const initialInventory: Material[] = [
    { id: 1, name: 'Un', category: 'Kuru Gıda', unit: 'kg', currentAmt: 5, limit: 20, lastPurchase: '2023-10-15', unitPrice: 15 },
    { id: 2, name: 'Dana Kıyma', category: 'Et', unit: 'kg', currentAmt: 15, limit: 10, lastPurchase: '2023-10-24', unitPrice: 350 },
    { id: 3, name: 'Ayçiçek Yağı', category: 'Yağ', unit: 'Litre', currentAmt: 8, limit: 15, lastPurchase: '2023-10-10', unitPrice: 45 },
    { id: 4, name: 'Domates', category: 'Sebze', unit: 'kg', currentAmt: 2, limit: 10, lastPurchase: '2023-10-25', unitPrice: 25 },
    { id: 5, name: 'Kaşar Peyniri', category: 'Süt Ürünleri', unit: 'kg', currentAmt: 4, limit: 5, lastPurchase: '2023-10-20', unitPrice: 180 },
    { id: 6, name: 'Hamburger Ekmeği', category: 'Kuru Gıda', unit: 'Adet', currentAmt: 50, limit: 20, lastPurchase: '2023-10-26', unitPrice: 8 },
    { id: 7, name: 'Marul', category: 'Sebze', unit: 'kg', currentAmt: 3, limit: 2, lastPurchase: '2023-10-26', unitPrice: 15 },
    { id: 8, name: 'Zeytinyağı', category: 'Yağ', unit: 'Litre', currentAmt: 4, limit: 10, lastPurchase: '2023-09-28', unitPrice: 250 },
    { id: 9, name: 'Tavuk Göğsü', category: 'Et', unit: 'kg', currentAmt: 6, limit: 10, lastPurchase: '2023-10-22', unitPrice: 140 },
    { id: 10, name: 'Kruton', category: 'Kuru Gıda', unit: 'kg', currentAmt: 2, limit: 1, lastPurchase: '2023-10-20', unitPrice: 40 }
];

const initialMenus: Menu[] = [
    {
        id: 1,
        name: 'Hamburger Menü',
        category: 'Ana Yemek',
        salePrice: 150,
        recipe: [
            { id: 101, name: 'Dana Kıyma', amount: 0.15, unit: 'kg', unitCost: 350 },
            { id: 102, name: 'Hamburger Ekmeği', amount: 1, unit: 'Adet', unitCost: 8 },
            { id: 103, name: 'Domates', amount: 0.03, unit: 'kg', unitCost: 25 },
            { id: 104, name: 'Marul', amount: 0.02, unit: 'kg', unitCost: 15 },
        ]
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        category: 'Ana Yemek',
        salePrice: 140,
        recipe: [
            { id: 201, name: 'Un', amount: 0.2, unit: 'kg', unitCost: 15 },
            { id: 202, name: 'Kaşar Peyniri', amount: 0.1, unit: 'kg', unitCost: 180 },
            { id: 203, name: 'Domates', amount: 0.1, unit: 'kg', unitCost: 25 },
            { id: 204, name: 'Zeytinyağı', amount: 0.02, unit: 'Litre', unitCost: 250 },
        ]
    },
    {
        id: 3,
        name: 'Sezar Salata',
        category: 'Salata',
        salePrice: 110,
        recipe: [
            { id: 301, name: 'Tavuk Göğsü', amount: 0.15, unit: 'kg', unitCost: 140 },
            { id: 302, name: 'Marul', amount: 0.1, unit: 'kg', unitCost: 15 },
            { id: 303, name: 'Zeytinyağı', amount: 0.01, unit: 'Litre', unitCost: 250 },
            { id: 304, name: 'Kruton', amount: 0.05, unit: 'kg', unitCost: 40 },
        ]
    }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [inventory, setInventory] = useState<Material[]>(initialInventory);
    const [menus, setMenus] = useState<Menu[]>(initialMenus);
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = (type: 'success' | 'error', message: string) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { type, message, id }]);
        setTimeout(() => removeNotification(id), 4000); // Auto dismiss after 4s
    };

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const simulateOrder = (menuId: number) => {
        const menu = menus.find(m => m.id === menuId);
        if (!menu) return;

        // VALIDATION: Check if enough stock exists for all ingredients
        let errorMsg = '';
        for (const ingredient of menu.recipe) {
            const material = inventory.find(i => i.name === ingredient.name);
            if (!material) {
                errorMsg = `Hata: Envanterde '${ingredient.name}' bulunamadı!`;
                break;
            }
            if (material.currentAmt < ingredient.amount) {
                errorMsg = `Hata: Yetersiz '${ingredient.name}' stoğu! (Gereken: ${ingredient.amount}${ingredient.unit}, Mevcut: ${material.currentAmt.toFixed(2)}${material.unit})`;
                break;
            }
        }

        if (errorMsg) {
            showNotification('error', errorMsg);
            return;
        }

        // SUCCESS: Deduct from inventory
        setInventory(prevInventory =>
            prevInventory.map(item => {
                const consumedIngredient = menu.recipe.find(ing => ing.name === item.name);
                if (consumedIngredient) {
                    return { ...item, currentAmt: parseFloat((item.currentAmt - consumedIngredient.amount).toFixed(2)) };
                }
                return item;
            })
        );

        // LOG ORDER
        const consumptionSummary = menu.recipe.map(ing => `-${ing.amount}${ing.unit} ${ing.name}`).join(', ');
        const newOrder: RecentOrder = {
            id: Date.now(),
            item: `1x ${menu.name}`,
            time: 'Şimdi',
            consumption: consumptionSummary
        };

        setRecentOrders(prev => [newOrder, ...prev].slice(0, 10)); // Keep last 10
        showNotification('success', `Başarılı: 1x ${menu.name} satıldı. Depo güncellendi.`);
    };

    const resetDemo = () => {
        setInventory(initialInventory);
        setMenus(initialMenus);
        setRecentOrders([]);
        setNotifications([]);
        showNotification('success', 'Demo sıfırlandı! Tüm veriler başlangıç haline döndürüldü.');
    };

    return (
        <AppContext.Provider value={{
            inventory,
            menus,
            recentOrders,
            notifications,
            simulateOrder,
            removeNotification,
            resetDemo
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
