import React from 'react';
import { Phone, MapPin, Facebook, Instagram, Diamond } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 border-t border-brand-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5 text-brand-main" />
              <h3 className="font-display text-lg tracking-widest text-gray-900">PINK AVENUE</h3>
            </div>
            <p className="text-gray-500 text-sm font-sans leading-relaxed max-w-xs">
              Elegancia que perdura. Joyería fina de fantasía especializada en hacer brillar tus momentos más importantes.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-gray-900 tracking-wider mb-4 border-b border-brand-main pb-2 inline-block">EXPLORAR</h4>
            <ul className="space-y-2 font-sans text-gray-600 text-sm">
              <li><a href="#/catalogo" className="hover:text-brand-main transition-colors">Colección Bodas</a></li>
              <li><a href="#/catalogo" className="hover:text-brand-main transition-colors">Colección XV Años</a></li>
              <li><a href="#/nosotros" className="hover:text-brand-main transition-colors">Nuestra Historia</a></li>
              <li><a href="#/contacto" className="hover:text-brand-main transition-colors">Visítanos</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-gray-900 tracking-wider mb-4 border-b border-brand-main pb-2 inline-block">CONTACTO</h4>
            <div className="space-y-3 font-sans text-gray-600 text-sm">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-brand-main" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start text-left">
                <MapPin className="w-4 h-4 text-brand-main mt-1" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:text-brand-main hover:shadow-md transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={`https://instagram.com/${COMPANY_INFO.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:text-brand-main hover:shadow-md transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="font-sans text-xs text-gray-400 tracking-widest">
            &copy; {new Date().getFullYear()} PINK AVENUE JOYERÍA. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;