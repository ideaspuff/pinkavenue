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
                Te invitamos a nuestro showroom privado en Acapulco, un espacio diseñado para que, con asesoría experta, encuentres los accesorios que definirán tu look nupcial o de gala.
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
                    <li>{COMPANY_INFO.hours.weekdays}</li>
                    <li>{COMPANY_INFO.hours.saturday}</li>
                    <li className="text-brand-main italic">{COMPANY_INFO.hours.other}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Visual Side */}
          <div className="lg:col-span-7 relative h-[600px] bg-stone-100 slide-up overflow-hidden group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1909.1220610237033!2d-99.88790296367944!3d16.863814157867264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ca581fd1787beb%3A0xf0cc86bc98991494!2sPINK%20AVENUE%20JOYER%C3%8DA!5e0!3m2!1sen!2sus!4v1768781230408!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>

            {/* Overlay Title (Keeping simple) */}
            <div className="absolute top-6 right-6 pointer-events-none">
              <div className="bg-white/90 backdrop-blur px-6 py-3 border-l-2 border-brand-main shadow-lg">
                <span className="font-display text-gray-900 tracking-widest text-sm">UBICACIÓN</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;