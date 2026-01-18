import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, X, ZoomIn, ShoppingBag, ChevronLeft, ChevronRight, ArrowLeft, Star, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useFittingRoom } from '../context/FittingRoomContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useFittingRoom();

  // Find current product index
  const currentIndex = PRODUCTS.findIndex(p => p.id === Number(id));
  const product = PRODUCTS[currentIndex];

  // Calculate Prev/Next (Looping)
  const prevProduct = currentIndex > 0 ? PRODUCTS[currentIndex - 1] : PRODUCTS[PRODUCTS.length - 1];
  const nextProduct = currentIndex < PRODUCTS.length - 1 ? PRODUCTS[currentIndex + 1] : PRODUCTS[0];

  // State for visual effects
  const [zoom, setZoom] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Refs
  const imageRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Sticky Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      if (actionsRef.current) {
        const rect = actionsRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="font-display text-2xl text-gray-900 mb-4">Pieza no disponible</h2>
        <button onClick={() => navigate('/catalogo')} className="text-brand-main border-b border-brand-main">Volver a La Galería</button>
      </div>
    );
  }

  // Handle Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // --- CROSS SELLING LOGIC ---
  // 1. Must match TONE (Plata vs Dorado)
  // 2. Must be DIFFERENT TYPE (Don't show another Tiara if looking at a Tiara)
  // 3. Prioritize same Category if possible, but Tone is king.
  const complementProducts = PRODUCTS.filter(p =>
    p.id !== product.id && // Not self
    p.tone === product.tone && // Same metal
    p.type !== product.type // Different item type (Complete the look)
  ).sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 4); // Take 4

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24 items-start">

          {/* LEFT: Image Section */}
          <div className="relative fade-in select-none sticky top-24">
            <div
              ref={imageRef}
              className="aspect-square bg-white border border-gray-100 overflow-hidden relative cursor-zoom-in shadow-sm mb-4"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-200"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: zoom ? 'scale(2)' : 'scale(1)'
                }}
              />
              {!zoom && (
                <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </div>
              )}
              {product.label && (
                <div className={`absolute top-0 left-0 px-4 py-2 text-xs tracking-[0.2em] uppercase font-bold text-white shadow-md z-10 
                    ${product.label === 'Pieza Única' ? 'bg-[#d4af37]' : 'bg-brand-main'}`}>
                  {product.label}
                </div>
              )}
            </div>

            {/* THUMBNAIL STRIP (MOCKED) */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-square border cursor-pointer overflow-hidden ${i === 1 ? 'border-brand-main ring-1 ring-brand-main' : 'border-gray-100 opacity-60 hover:opacity-100'}`}>
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
              Detalle en Alta Resolución • Click para expandir
            </p>
          </div>

          {/* RIGHT: Info & Actions */}
          <div className="flex flex-col slide-up h-full">

            {/* Product Nav */}
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-100">
              <Link to={`/catalogo?cat=${product.category}`} className="group flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-main transition-colors">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Volver a {product.category}
              </Link>

              <div className="flex items-center gap-4">
                <Link to={`/producto/${prevProduct.id}`} className="p-2 hover:bg-gray-50 rounded-full transition-colors group" title="Anterior">
                  <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                </Link>
                <div className="h-3 w-px bg-gray-200"></div>
                <Link to={`/producto/${nextProduct.id}`} className="p-2 hover:bg-gray-50 rounded-full transition-colors group" title="Siguiente">
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                </Link>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-brand-main text-xs font-bold uppercase tracking-widest">
                {product.tone} Collection
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="font-serif text-lg text-gray-500 italic mb-8 font-light">Ref. Catálogo: {product.id.toString().padStart(4, '0')}</p>

            <div className="prose prose-stone mb-10">
              <p className="font-sans text-gray-600 font-light leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Tech Specs */}
            <div className="mt-4 mb-12 border-t border-gray-100 pt-8">
              <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-6 gap-x-4">
                <dt className="font-serif italic text-gray-400 text-sm">Tipo de Pieza</dt>
                <dd className="font-sans text-sm text-gray-800 font-light uppercase tracking-wide">
                  {product.type}
                </dd>

                <dt className="font-serif italic text-gray-400 text-sm">Acabado</dt>
                <dd className="font-sans text-sm text-gray-800 font-light leading-relaxed">
                  {product.tone === 'Plata' ? 'Baño de Plata .925' : 'Baño de Oro 18k'} con Cristal Austriaco.
                </dd>

                <dt className="font-serif italic text-gray-400 text-sm">Dimensiones</dt>
                <dd className="font-sans text-sm text-gray-800 font-light leading-relaxed">
                  {product.type === 'Tiara' || product.type === 'Corona' ? 'Ajustable a peinado.' : 'Medida estándar con extensibles.'}
                </dd>
              </dl>
            </div>

            {/* Action */}
            <div ref={actionsRef} className="flex flex-col gap-4 mb-8 mt-auto">
              <button
                onClick={() => addItem(product)}
                className="w-full bg-gray-900 text-white py-5 px-8 text-center uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-main transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                <Star className="w-4 h-4" />
                Añadir a Selección Personal
              </button>
              <p className="text-center text-[10px] text-gray-400 font-sans uppercase tracking-widest mt-2">
                Agregue piezas a su lista para reservar una sesión de estilismo privada.
              </p>
            </div>
          </div>
        </div>

        {/* Cross Selling: "Completa el Ajuar" */}
        <div className="border-t border-gray-100 pt-16 bg-stone-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="font-display text-2xl text-gray-900 mb-2">COMPLEMENTOS IDEALES</h3>
                <p className="font-serif italic text-gray-500 text-sm">
                  Sugerencias en {product.tone} para completar tu ajuar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {complementProducts.map(p => (
                <div key={p.id} className="group bg-white p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[4/5] overflow-hidden mb-4 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={() => addItem(p)}
                      className="absolute bottom-2 right-2 bg-white text-brand-main p-2 rounded-full shadow-md hover:bg-brand-main hover:text-white transition-colors"
                      title="Añadir a Selección"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {/* Mini Type Tag */}
                    <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[0.5rem] uppercase tracking-widest">
                      {p.type}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm text-gray-900 mb-1 truncate">{p.name}</h4>
                  <Link to={`/producto/${p.id}`} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-main">Examinar</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X className="w-10 h-10" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Sticky Action Bar */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transform transition-transform duration-300 z-30 flex items-center justify-between ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="hidden sm:block">
          <p className="font-serif text-sm text-gray-900 truncate max-w-[200px]">{product.name}</p>
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full sm:w-auto bg-gray-900 text-white py-3 px-6 text-center uppercase tracking-widest text-xs font-bold hover:bg-brand-main transition-colors flex items-center justify-center gap-2"
        >
          <Star className="w-4 h-4" />
          Seleccionar
        </button>
      </div>

    </div>
  );
};

export default ProductDetail;