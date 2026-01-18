import React from 'react';
import { Phone, MapPin, Mail, Clock, CalendarCheck } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full h-[50vh] overflow-hidden relative mb-16">
        <img src="/images/showroom_hero.png" alt="Showroom Interior" className="w-full h-full object-cover grayscale-[20%] contrast-110" />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
          <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4">Concierge Service</span>
          <h1 className="font-display text-5xl md:text-6xl tracking-widest drop-shadow-xl text-center">SHOWROOM</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Main Info Side */}
          <div className="lg:col-span-5 fade-in">
            <div className="mb-12">
              <h2 className="font-display text-3xl text-gray-900 mb-6">Tu Cita con el Brillo</h2>
              <div className="w-16 h-px bg-brand-main mb-6"></div>
              <p className="font-sans text-gray-500 font-light text-lg leading-relaxed text-justify">
                La verdadera magia de nuestras piezas se revela al contacto con la piel.
                Te invitamos a nuestro showroom privado en Acapulco, un espacio diseñado para que, con copa en mano, encuentres los accesorios que definirán tu look nupcial o de gala.
              </p>
              <p className="font-sans text-gray-500 font-light text-lg leading-relaxed mt-4 italic">
                Atención exclusivamente personalizada.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-stone-50 text-gray-900 group-hover:bg-brand-main group-hover:text-white transition-colors duration-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Ubicación del Atelier</h3>
                  <p className="font-serif text-xl text-gray-900 leading-snug">{COMPANY_INFO.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-stone-50 text-gray-900 group-hover:bg-brand-main group-hover:text-white transition-colors duration-500">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Reservaciones</h3>
                  <p className="font-serif text-xl text-gray-900 mb-1">{COMPANY_INFO.phone}</p>
                  <p className="font-sans text-sm text-gray-500">concierge@pinkavenue.com.mx</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-stone-50 text-gray-900 group-hover:bg-brand-main group-hover:text-white transition-colors duration-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Horario de Showroom</h3>
                  <ul className="font-serif text-gray-900 space-y-1">
                    <li>Lunes - Sábado: <span className="text-gray-500">10:00 AM - 8:00 PM</span></li>
                    <li>Domingo: <span className="text-brand-main italic">Solo con cita previa</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Visual Side */}
          <div className="lg:col-span-7 relative h-[600px] bg-stone-100 slide-up overflow-hidden group">
            {/* Artistic Map Placeholder */}
            <img src="https://picsum.photos/id/1015/1200/1200" alt="Ubicación Pink Avenue" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
              <div className="bg-white/95 backdrop-blur-md p-8 max-w-md shadow-2xl border-l-4 border-brand-main">
                <h3 className="font-display text-2xl text-gray-900 mb-2">EL DESTINO</h3>
                <p className="font-sans font-light text-gray-600 mb-6 leading-relaxed">
                  Situados en el corazón de la Zona Dorada. Valet parking disponible para tu comodidad durante tu prueba.
                </p>
                <button className="w-full bg-gray-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-brand-main transition-colors font-bold">
                  Abrir Mapa
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;