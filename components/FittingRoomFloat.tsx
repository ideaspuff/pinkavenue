
import React, { useState } from 'react';
import { useFittingRoom } from '../context/FittingRoomContext';
import { X, ShoppingBag, Trash2, CalendarHeart, ChevronRight, User, Phone, Calendar, Clock, Sparkles, Palette, Check, Star } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const FittingRoomFloat: React.FC = () => {
    const { items, isOpen, setIsOpen, removeItem } = useFittingRoom();
    const [showForm, setShowForm] = useState(false);

    // Date Helpers
    const currentYear = new Date().getFullYear(); // Changed to current year
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Helper to get days in month
    const getDaysInMonth = (month: string, year: number) => {
        const monthIndex = months.indexOf(month);
        return new Date(year, monthIndex + 1, 0).getDate();
    };

    // Color Palette
    const dressColors = [
        { name: 'Blanco', hex: '#FFFFFF', border: 'border-gray-200' },
        { name: 'Ivory / Hueso', hex: '#FFFFF0', border: 'border-gray-200' },
        { name: 'Champagne', hex: '#FAD6A5', border: 'border-orange-100' },
        { name: 'Nude / Beige', hex: '#E3C6A8', border: 'border-stone-200' },
        { name: 'Plata', hex: '#C0C0C0', border: 'border-gray-400' },
        { name: 'Dorado', hex: '#FFD700', border: 'border-yellow-500' },
        { name: 'Rosa Pastel', hex: '#FFD1DC', border: 'border-pink-200' },
        { name: 'Rose Gold', hex: '#B76E79', border: 'border-rose-300' },
        { name: 'Fucsia', hex: '#FF00FF', border: 'border-pink-500' },
        { name: 'Rojo', hex: '#FF0000', border: 'border-red-500' },
        { name: 'Vino / Marsala', hex: '#722F37', border: 'border-red-900' },
        { name: 'Lila', hex: '#C8A2C8', border: 'border-purple-300' },
        { name: 'Morado / Uva', hex: '#800080', border: 'border-purple-700' },
        { name: 'Azul Cielo', hex: '#87CEEB', border: 'border-blue-300' },
        { name: 'Azul Rey', hex: '#4169E1', border: 'border-blue-600' },
        { name: 'Azul Marino', hex: '#000080', border: 'border-blue-900' },
        { name: 'Verde Esmeralda', hex: '#50C878', border: 'border-green-600' },
        { name: 'Verde Olivo', hex: '#808000', border: 'border-yellow-800' },
        { name: 'Gris / Acero', hex: '#808080', border: 'border-gray-500' },
        { name: 'Negro', hex: '#000000', border: 'border-gray-800' },
    ];

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: 'Boda', // Boda | XV Años
        dressColor: 'Blanco',

        // Event Date (Context)
        knowsExactDate: false,
        eventDay: '1',
        eventMonth: 'Enero',
        eventYear: currentYear.toString(),

        // Appointment Date (Scheduling)
        apptDay: new Date().getDate().toString(),
        apptMonth: months[new Date().getMonth()],
        apptYear: currentYear.toString(),

        time: ''
    });

    // Calculate Day of Week for Appointment logic
    // Returns 0 (Sun) - 6 (Sat)
    const getAppointmentDayOfWeek = () => {
        const monthIndex = months.indexOf(formData.apptMonth);
        const date = new Date(parseInt(formData.apptYear), monthIndex, parseInt(formData.apptDay));
        return date.getDay();
    };

    // Dynamic Time Slots based on Appointment Date
    const availableSlots = React.useMemo(() => {
        const dayOfWeek = getAppointmentDayOfWeek();

        // Sunday (0)
        if (dayOfWeek === 0) {
            return []; // No regular slots
        }

        // Saturday (6) - 11:00 AM to 4:00 PM
        if (dayOfWeek === 6) {
            return [
                "11:00 AM - 12:00 PM",
                "12:00 PM - 1:00 PM",
                "1:00 PM - 2:00 PM",
                "2:00 PM - 3:00 PM",
                "3:00 PM - 4:00 PM"
            ];
        }

        // Weekdays (1-5) - 11:00 AM to 8:00 PM
        return [
            "11:00 AM - 12:00 PM",
            "12:00 PM - 1:00 PM",
            "1:00 PM - 2:00 PM",
            "2:00 PM - 3:00 PM",
            "3:00 PM - 4:00 PM",
            "4:00 PM - 5:00 PM",
            "5:00 PM - 6:00 PM",
            "6:00 PM - 7:00 PM",
            "7:00 PM - 8:00 PM"
        ];
    }, [formData.apptDay, formData.apptMonth, formData.apptYear]);
    const isSunday = getAppointmentDayOfWeek() === 0;

    // React to slot changes if current selection is invalid
    React.useEffect(() => {
        if (!availableSlots.includes(formData.time) && availableSlots.length > 0) {
            setFormData(prev => ({ ...prev, time: availableSlots[0] }));
        } else if (availableSlots.length === 0) {
            setFormData(prev => ({ ...prev, time: '' }));
        }
    }, [formData.apptDay, formData.apptMonth, formData.apptYear, availableSlots]); // Added availableSlots to dependencies

    // If no items and not open, don't render anything
    if (items.length === 0 && !isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleEventTypeChange = (type: string) => {
        setFormData({ ...formData, eventType: type });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct Event Date String
        let eventDateString = "";
        if (formData.knowsExactDate) {
            eventDateString = `${formData.eventDay} de ${formData.eventMonth} del ${formData.eventYear} `;
        } else {
            eventDateString = `${formData.eventMonth} del ${formData.eventYear} (Fecha Probable)`;
        }

        // Construct Appointment Date String
        const apptDateString = `${formData.apptDay} de ${formData.apptMonth} `;

        const itemList = items.map(i => `- ${i.name} (Ref: ${i.id})`).join('\n');

        const message = `* SOLICITUD DE EXPERIENCIA PRIVATE SHOPPING - PINK AVENUE * 💎\n\n` +
            `Estimados, deseo reservar un espacio en su boutique para probarme las siguientes piezas: \n\n${itemList} \n\n` +
            `* DATOS DEL EVENTO:*\n` +
            `Cliente: * ${formData.name}*\n` +
            `Tipo: * ${formData.eventType}*\n` +
            `Tono del Vestido: * ${formData.dressColor}*\n` +
            `Fecha Evento: * ${eventDateString}*\n\n` +
            `* DETALLES DE LA CITA:*\n` +
            `Fecha Solicitada: * ${apptDateString}*\n` +
            `Horario: * ${formData.time || 'Por definir'}*\n` +
            `Teléfono: * ${formData.phone}*\n\n` +
            `Quedo a la espera de su confirmación.Gracias.`;

        const whatsappNumber = "52" + COMPANY_INFO.phone.replace(/\s+/g, '');
        const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(link, '_blank');
        setShowForm(false);
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && items.length > 0 && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-brand-main transition-all duration-300 flex items-center gap-2 group fade-in"
                >
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-brand-main text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900 group-hover:border-brand-main">
                            {items.length}
                        </span>
                    </div>
                    <span className="hidden md:inline font-sans text-xs font-bold uppercase tracking-wider pr-2">
                        Mi Selección
                    </span>
                </button>
            )}

            {/* Drawer Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                        onClick={() => { setIsOpen(false); setShowForm(false); }}
                    ></div>

                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-[slideInUpFull_0.3s_ease-out] md:animate-[slideInRight_0.3s_ease-out]">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-stone-50">
                            <div>
                                <h2 className="font-display text-xl text-gray-900">SELECCIÓN PRIVADA</h2>
                                <p className="text-xs text-gray-500 font-sans mt-1">Piezas para tu cita en boutique</p>
                            </div>
                            <button
                                onClick={() => { setIsOpen(false); setShowForm(false); }}
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {!showForm ? (
                            <>
                                {/* List View logic remains same, just rendering list */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    {items.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                            <ShoppingBag className="w-12 h-12 opacity-20" />
                                            <p className="font-serif italic">No has seleccionado piezas aún.</p>
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="text-brand-main text-xs uppercase font-bold border-b border-brand-main pb-1"
                                            >
                                                Volver a la colección
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {items.map((item) => (
                                                <div key={item.id} className="flex gap-4 items-center group">
                                                    <div className="w-20 h-24 bg-gray-100 overflow-hidden flex-shrink-0 relative">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        {item.label && <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold"></div>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-serif text-sm text-gray-900 truncate">{item.name}</h4>
                                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{item.category}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {items.length > 0 && (
                                    <div className="p-6 border-t border-gray-100 bg-stone-50">
                                        <p className="text-xs text-gray-500 text-center mb-4 font-light">
                                            Te esperamos en nuestra boutique {COMPANY_INFO.location} para probarte estas piezas y ajustarlas a tu medida.
                                        </p>
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="w-full bg-brand-main text-white py-4 px-6 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                        >
                                            <CalendarHeart className="w-4 h-4" />
                                            Reservar Experiencia
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Appointment Form View */}
                                <div className="flex-1 overflow-y-auto p-6 bg-white animate-[fadeIn_0.3s_ease-out]">
                                    <button onClick={() => setShowForm(false)} className="text-xs text-gray-400 hover:text-gray-900 mb-6 flex items-center gap-1">
                                        <ChevronRight className="w-3 h-3 rotate-180" /> Volver a mi selección
                                    </button>

                                    <h3 className="font-display text-2xl text-gray-900 mb-6">Agenda tu Visita</h3>
                                    <p className="font-sans text-sm text-gray-500 mb-8 font-light">
                                        Reserva un espacio con nuestros estilistas para probarte tu selección.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* Event Type & Personal Info Section */}
                                        <div className="space-y-6 pb-6 border-b border-gray-100">
                                            {/* Event Type */}
                                            <div className="space-y-3">
                                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                                    <Sparkles className="w-4 h-4 text-brand-main" /> Tipo de Evento
                                                </label>
                                                <div className="flex gap-4">
                                                    {['Boda', 'XV Años'].map(type => (
                                                        <button
                                                            key={type}
                                                            type="button"
                                                            onClick={() => handleEventTypeChange(type)}
                                                            className={`flex-1 py-3 text-sm font-serif border transition-all duration-300 ${formData.eventType === type ? 'border-brand-main bg-brand-light text-brand-dark' : 'border-gray-200 bg-white text-gray-600'}`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Contact Info */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Tu Nombre</label>
                                                    <input
                                                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                                                        className="w-full bg-white text-gray-900 border-b border-gray-300 py-2 focus:outline-none focus:border-brand-main transition-colors font-serif"
                                                        placeholder="Nombre Completo"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Teléfono / WhatsApp</label>
                                                    <input
                                                        type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                                                        className="w-full bg-white text-gray-900 border-b border-gray-300 py-2 focus:outline-none focus:border-brand-main transition-colors font-serif"
                                                        placeholder="(744) 000 0000"
                                                    />
                                                </div>
                                            </div>

                                            {/* Dress Color */}
                                            <div>
                                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 mb-3">
                                                    <Palette className="w-4 h-4 text-brand-main" /> Color del Vestido
                                                </label>
                                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                    {dressColors.map((color) => (
                                                        <button
                                                            key={color.name}
                                                            type="button"
                                                            title={color.name}
                                                            onClick={() => setFormData({ ...formData, dressColor: color.name })}
                                                            className={`flex-shrink-0 w-8 h-8 rounded-full border ${color.border} flex items-center justify-center transition-all ${formData.dressColor === color.name ? 'ring-2 ring-offset-2 ring-brand-main scale-110' : ''}`}
                                                            style={{ backgroundColor: color.hex }}
                                                        >
                                                            {formData.dressColor === color.name && (
                                                                <Check className={`w-4 h-4 ${['Blanco', 'Ivory / Hueso', 'Champagne', 'Nude / Beige', 'Rosa Pastel', 'Plata'].includes(color.name) ? 'text-gray-900' : 'text-white'}`} />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-1">Seleccionado: <span className="font-bold text-gray-700">{formData.dressColor}</span></p>
                                            </div>
                                        </div>

                                        {/* Event Date (Context) */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                                <Star className="w-4 h-4 text-brand-main" /> Fecha del Evento
                                            </label>
                                            <div className="bg-stone-50 p-4 rounded-lg space-y-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="knowsExactDate"
                                                        checked={formData.knowsExactDate}
                                                        onChange={handleInputChange}
                                                        className="accent-brand-main w-4 h-4"
                                                        id="exactDate"
                                                    />
                                                    <label htmlFor="exactDate" className="text-[10px] text-gray-500 uppercase cursor-pointer">Ya tengo fecha exacta</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    {formData.knowsExactDate && (
                                                        <select
                                                            name="eventDay"
                                                            value={formData.eventDay}
                                                            onChange={handleInputChange}
                                                            className="w-16 bg-white border border-gray-200 p-2 text-sm focus:border-brand-main outline-none"
                                                        >
                                                            {Array.from({ length: getDaysInMonth(formData.eventMonth, parseInt(formData.eventYear)) }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                                                        </select>
                                                    )}
                                                    <select
                                                        name="eventMonth"
                                                        value={formData.eventMonth}
                                                        onChange={handleInputChange}
                                                        className="flex-1 bg-white border border-gray-200 p-2 text-sm focus:border-brand-main outline-none"
                                                    >
                                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                                    </select>
                                                    <select
                                                        name="eventYear"
                                                        value={formData.eventYear}
                                                        onChange={handleInputChange}
                                                        className="w-20 bg-white border border-gray-200 p-2 text-sm focus:border-brand-main outline-none"
                                                    >
                                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Appointment Scheduling (The real logic) */}
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                                <Calendar className="w-4 h-4 text-brand-main" /> Agendar Cita Showroom
                                            </label>

                                            <div className="grid grid-cols-3 gap-2">
                                                <select
                                                    name="apptDay"
                                                    value={formData.apptDay}
                                                    onChange={handleInputChange}
                                                    className="bg-white border-b-2 border-gray-200 py-2 text-sm focus:border-brand-main outline-none font-serif text-center"
                                                >
                                                    {Array.from({ length: getDaysInMonth(formData.apptMonth, parseInt(formData.apptYear)) }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                                <select
                                                    name="apptMonth"
                                                    value={formData.apptMonth}
                                                    onChange={handleInputChange}
                                                    className="col-span-2 bg-white border-b-2 border-gray-200 py-2 text-sm focus:border-brand-main outline-none font-serif"
                                                >
                                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                                </select>
                                            </div>

                                            {/* Time Slots */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                                                    Horarios Disponibles {isSunday ? '(Domingo)' : ''}
                                                </label>

                                                {availableSlots.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {availableSlots.map(slot => (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, time: slot })}
                                                                className={`py-2 px-1 text-[10px] uppercase font-bold border transition-all ${formData.time === slot ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-main'}`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 bg-orange-50 border border-orange-100 rounded text-center">
                                                        <p className="text-xs text-orange-800 font-sans">
                                                            {isSunday
                                                                ? "Los domingos atendemos únicamente con cita especial confirmada previamente."
                                                                : "No hay horarios disponibles para esta fecha."}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={!formData.time && !isSunday}
                                                className="w-full bg-gray-900 text-white py-4 px-6 text-xs font-bold uppercase tracking-widest hover:bg-brand-main transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Confirmar Agendamiento
                                            </button>
                                            <p className="text-[10px] text-gray-400 text-center mt-3">
                                                Te redirigirá a WhatsApp para finalizar la reserva.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}
        </>
    );
};

export default FittingRoomFloat;