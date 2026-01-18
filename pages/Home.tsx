import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { PRODUCTS } from '../data/products';
import StyleQuiz from '../components/StyleQuiz';

const Home: React.FC = () => {
  // Show 12 items to make it look like a substantial collection, but leaving room for more
  const featuredProducts = PRODUCTS.slice(0, 12);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="w-full bg-white pt-24">
      <StyleQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* 1. HERO CINEGRÁFICO: Minimalista y de Alto Impacto */}
      <HeroSlider />

      {/* 2. CATEGORÍAS EDITORIALES (VISUAL NAVIGATION) */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* BODAS */}
        <div className="relative group overflow-hidden cursor-pointer h-[50vh] md:h-auto">
          <Link to="/catalogo?cat=Bodas" className="absolute inset-0 block">
            <img
              src="/images/categories/bridal.png"
              alt="Colección Nupcial"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-transparent transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end text-gray-900 p-6 pb-12 transition-transform duration-500 group-hover:-translate-y-2">
              <h2 className="font-display text-4xl md:text-5xl tracking-widest mb-2">BODAS</h2>
              <span className="font-serif italic text-lg text-gray-600">
                Elegancia Atemporal
              </span>
            </div>
          </Link>
        </div>

        {/* XV AÑOS */}
        <div className="relative group overflow-hidden cursor-pointer h-[50vh] md:h-auto">
          <Link to="/catalogo?cat=XV Años" className="absolute inset-0 block">
            <img
              src="/images/categories/xv.png"
              alt="Colección XV Años"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-transparent transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end text-gray-900 p-6 pb-12 transition-transform duration-500 group-hover:-translate-y-2">
              <h2 className="font-display text-4xl md:text-5xl tracking-widest mb-2">XV AÑOS</h2>
              <span className="font-serif italic text-lg text-gray-600">
                Tu Momento Real
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. STATEMENT & TEASER */}
      <section className="py-24 md:py-32 bg-stone-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 text-brand-gold mx-auto mb-8 animate-pulse" />
          <h3 className="font-display text-3xl md:text-5xl text-gray-900 mb-8 leading-tight">
            LA DISTINCIÓN NO SE EXPLICA,<br />SE SIENTE.
          </h3>
          <p className="font-sans text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            En un mundo de producción masiva, Pink Avenue es un retorno a la curaduría personal.
            Cada tiara y gargantilla en nuestro archivo ha sido seleccionada por su capacidad de capturar la luz.
          </p>
          <Link
            to="/nosotros"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-900 pb-1 hover:text-brand-main hover:border-brand-main transition-all"
          >
            Descubre El Atelier <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. CURATED COLLECTION (Producto) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Centrado y Elegante */}
          <div className="text-center mb-20">
            <span className="text-brand-main text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Nuevos Arribos</span>
            <h3 className="font-display text-4xl md:text-6xl text-gray-900 mb-6">COLECCIÓN 2026</h3>
            <div className="w-16 h-px bg-gray-200 mx-auto"></div>
          </div>

          {/* Grid de 12 Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Strong "Show More" Indicator */}
          <div className="mt-24 text-center border-t border-gray-100 pt-16">
            <p className="font-serif italic text-gray-400 text-lg mb-6">"La verdadera joya es la que aún no has descubierto..."</p>
            <Link
              to="/catalogo"
              className="inline-flex flex-col items-center gap-2 group"
            >
              <span className="bg-gray-900 text-white px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold group-hover:bg-brand-main transition-all duration-300 shadow-lg">
                Explorar Archivo Completo
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 group-hover:text-brand-main transition-colors">
                Ver más de 50 piezas exclusivas
              </span>
            </Link>
          </div>

        </div>
      </section>

      {/* 5. QUIZ / CALL TO ACTION */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <Sparkles className="w-12 h-12 text-brand-gold mb-6" />
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">¿INDECISA SOBRE TU LOOK?</h2>
          <p className="font-serif text-white/80 text-xl italic mb-10 max-w-2xl">
            "Déjanos guiarte hacia las piezas que complementarán perfectamente el tono de tu vestido y la esencia de tu evento."
          </p>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="bg-white text-brand-dark px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-2xl"
          >
            Iniciar Diagnóstico de Estilo
          </button>
        </div>
      </section>

      {/* 6. CONCIERGE TEASER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-stone-100">
        <div className="order-2 lg:order-1 relative h-[400px] lg:h-auto">
          <img src="/images/concierge.png" alt="Showroom" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="order-1 lg:order-2 flex items-center justify-center p-12 lg:p-24 bg-white">
          <div className="max-w-md">
            <span className="text-brand-main text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Concierge Service</span>
            <h3 className="font-display text-3xl text-gray-900 mb-6">TU CITA PRIVADA</h3>
            <p className="font-sans text-gray-500 font-light mb-8 leading-relaxed">
              Creemos que la joyería debe probarse con calma y una copa en mano.
              Agenda tu visita a nuestro showroom {COMPANY_INFO.location} para una sesión de estilismo personalizada.
            </p>
            <Link to="/contacto" className="inline-block bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-brand-main transition-colors">
              Reservar Showroom
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;