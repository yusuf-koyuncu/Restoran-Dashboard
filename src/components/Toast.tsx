import { useAppContext } from '../context/AppContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast = () => {
    const { notifications, removeNotification } = useAppContext();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className={`flex items-start gap-3 px-4 py-3 min-w-[300px] max-w-md rounded-xl shadow-lg border animate-in slide-in-from-right-8 duration-300 ${notif.type === 'success'
                        ? 'bg-green-50 text-green-800 border-green-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                >
                    {notif.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    )}

                    <div className="flex-1 text-sm font-medium">
                        {notif.message}
                    </div>

                    <button
                        onClick={() => removeNotification(notif.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};
