import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { PRODUCTS } from '../data/products';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'Todas';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    // Sync state if URL param changes externally
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: category });
    }
  };

  const filteredProducts = selectedCategory === 'Todas'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Editorial Style */}
        <div className="text-center mb-16 fade-in pt-10">
          <span className="text-brand-main text-xs font-bold uppercase tracking-[0.3em] block mb-3">Colección 2026</span>
          <h1 className="font-display text-4xl md:text-6xl text-gray-900 mb-6">LA GALERÍA</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-500 font-sans font-light leading-relaxed text-lg">
              Una curaduría de piezas statement y clásicos reinventados. <br className="hidden md:block" />
              Cada diseño ha sido seleccionado por su capacidad de capturar la luz y transformar un instante en un recuerdo eterno.
            </p>
            <p className="mt-4 text-xs text-brand-dark uppercase tracking-widest font-bold">
              Disponibilidad limitada en Showroom
            </p>
          </div>
        </div>

        {/* Filters - Minimalist */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20 border-t border-b border-gray-100 py-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${selectedCategory === category
                  ? 'text-gray-900 font-bold scale-110'
                  : 'text-gray-400 hover:text-brand-main'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.id} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50">
            <p className="text-gray-400 font-serif italic text-xl">Colección privada agotada.</p>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Contacte a concierge para piezas bajo pedido.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;