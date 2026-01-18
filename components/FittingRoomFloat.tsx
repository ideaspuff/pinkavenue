import React, { useState } from 'react';
import { useFittingRoom } from '../context/FittingRoomContext';
import { X, ShoppingBag, Trash2, CalendarHeart, ChevronRight, User, Phone, Calendar, Clock, Sparkles, Palette, Check, Star } from 'lucide-react';

const FittingRoomFloat: React.FC = () => {
  const { items, isOpen, setIsOpen, removeItem } = useFittingRoom();
  const [showForm, setShowForm] = useState(false);
  
  // Date Generation Helpers
  const currentYear = 2026;
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Time Slots (1hr blocks starting at 2pm)
  const timeSlots = [
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM"
  ];

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
    dressColor: 'Blanco', // Default
    knowsExactDate: false,
    
    // Date Components
    day: '1',
    month: 'Enero',
    year: currentYear.toString(),
    
    time: timeSlots[0]
  });

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
    setFormData({...formData, eventType: type});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Date String
    let dateString = "";
    if (formData.knowsExactDate) {
        dateString = `${formData.day} de ${formData.month} del ${formData.year}`;
    } else {
        dateString = `${formData.month} del ${formData.year} (Fecha Probable)`;
    }
    
    // Construct formatting message - More formal for "High End" feel
    const itemList = items.map(i => `- ${i.name} (Ref: ${i.id})`).join('\n');
    
    const message = `*SOLICITUD DE EXPERIENCIA PRIVATE SHOPPING - PINK AVENUE* 💎\n\n` +
                    `Estimados, deseo reservar un espacio en su boutique para probarme las siguientes piezas:\n\n${itemList}\n\n` +
                    `*DATOS DEL EVENTO:*\n` +
                    `Cliente: *${formData.name}*\n` +
                    `Tipo: *${formData.eventType}*\n` +
                    `Tono del Vestido: *${formData.dressColor}*\n` +
                    `Fecha Evento: *${dateString}*\n\n` +
                    `*CITA SOLICITADA:*\n` +
                    `Horario Preferido: *${formData.time}*\n` +
                    `Teléfono de contacto: *${formData.phone}*\n\n` +
                    `Quedo a la espera de su confirmación. Gracias.`;

    // Encode and Open WhatsApp
    const whatsappNumber = "527441605331";
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
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => { setIsOpen(false); setShowForm(false); }}
          ></div>

          {/* Drawer Content */}
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

            {/* Content Switch: List vs Form */}
            {!showForm ? (
                <>
                {/* Items List View */}
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

                {/* Footer Actions */}
                {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-stone-50">
                    <p className="text-xs text-gray-500 text-center mb-4 font-light">
                    Te esperamos en nuestra boutique en Acapulco para probarte estas piezas y ajustarlas a tu medida.
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
                        
                        {/* Event Type Selection */}
                        <div className="space-y-3">
                             <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                <Sparkles className="w-4 h-4 text-brand-main" /> Tipo de Evento
                            </label>
                            <div className="flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => handleEventTypeChange('Boda')}
                                    className={`flex-1 py-3 text-sm font-serif border ${formData.eventType === 'Boda' ? 'border-brand-main bg-brand-light text-brand-dark' : 'border-gray-200 bg-white text-gray-600'}`}
                                >
                                    Boda
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => handleEventTypeChange('XV Años')}
                                    className={`flex-1 py-3 text-sm font-serif border ${formData.eventType === 'XV Años' ? 'border-brand-main bg-brand-light text-brand-dark' : 'border-gray-200 bg-white text-gray-600'}`}
                                >
                                    XV Años
                                </button>
                            </div>
                        </div>

                        {/* Name & Phone */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                    <User className="w-4 h-4 text-brand-main" /> Tu Nombre
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-main transition-colors font-serif"
                                />
                            </div>

                             <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                    <Phone className="w-4 h-4 text-brand-main" /> Teléfono
                                </label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-main transition-colors font-serif"
                                />
                            </div>
                        </div>

                        {/* Dress Color Picker */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                <Palette className="w-4 h-4 text-brand-main" /> Color del Vestido
                            </label>
                            <div className="grid grid-cols-5 gap-3">
                                {dressColors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        title={color.name}
                                        onClick={() => setFormData({ ...formData, dressColor: color.name })}
                                        className={`w-10 h-10 rounded-full border ${color.border} flex items-center justify-center transition-all hover:scale-110 shadow-sm ${formData.dressColor === color.name ? 'ring-2 ring-offset-2 ring-brand-main scale-110' : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {formData.dressColor === color.name && (
                                            <Check className={`w-5 h-5 ${['Blanco', 'Ivory / Hueso', 'Champagne', 'Nude / Beige', 'Rosa Pastel', 'Plata'].includes(color.name) ? 'text-gray-900' : 'text-white'}`} />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 text-right mt-1">Seleccionado: <span className="font-bold text-gray-700">{formData.dressColor}</span></p>
                        </div>

                        {/* Date Logic */}
                        <div className="space-y-3 bg-stone-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                    <Calendar className="w-4 h-4 text-brand-main" /> Fecha Evento
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-gray-500 uppercase">¿Fecha Exacta?</span>
                                    <input 
                                        type="checkbox" 
                                        name="knowsExactDate"
                                        checked={formData.knowsExactDate}
                                        onChange={handleInputChange}
                                        className="accent-brand-main w-4 h-4"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <select 
                                    name="month"
                                    value={formData.month}
                                    onChange={handleInputChange}
                                    className="bg-white text-gray-900 border border-gray-300 p-2 text-sm focus:border-brand-main outline-none"
                                >
                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <select 
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="bg-white text-gray-900 border border-gray-300 p-2 text-sm focus:border-brand-main outline-none"
                                >
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                            
                            {formData.knowsExactDate && (
                                <div className="animate-[fadeIn_0.3s_ease-out]">
                                    <select 
                                        name="day"
                                        value={formData.day}
                                        onChange={handleInputChange}
                                        className="w-full bg-white text-gray-900 border border-gray-300 p-2 text-sm focus:border-brand-main outline-none"
                                    >
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Time Preference */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700">
                                <Clock className="w-4 h-4 text-brand-main" /> Horario Preferido
                            </label>
                            <select 
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-main transition-colors font-sans text-sm"
                            >
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 px-6 text-xs font-bold uppercase tracking-widest hover:bg-brand-main transition-all duration-300 shadow-lg"
                            >
                                Confirmar Cita Presencial
                            </button>
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