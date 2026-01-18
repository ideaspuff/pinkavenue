import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RefreshCcw, Palette } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductTone } from '../types';
import ProductCard from './ProductCard';
import { useFittingRoom } from '../context/FittingRoomContext';

interface StyleQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState<'Bodas' | 'XV Años' | null>(null);
  const [dressColor, setDressColor] = useState<string | null>(null);
  const [metalSuggestion, setMetalSuggestion] = useState<ProductTone>('Plata');
  const [styleVibe, setStyleVibe] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  
  const { addItem } = useFittingRoom();

  if (!isOpen) return null;

  const resetQuiz = () => {
    setStep(0);
    setEventType(null);
    setDressColor(null);
    setStyleVibe(null);
    setResults([]);
  };

  const handleEventSelect = (type: 'Bodas' | 'XV Años') => {
    setEventType(type);
    setStep(1);
  };

  const handleDressSelect = (colorGroup: string, suggestedMetal: ProductTone) => {
    setDressColor(colorGroup);
    setMetalSuggestion(suggestedMetal);
    setStep(2);
  };

  const handleStyleSelect = (vibe: string) => {
    setStyleVibe(vibe);
    generateResults(eventType!, vibe, metalSuggestion);
    setStep(3);
  };

  const generateResults = (type: string, vibe: string, metal: ProductTone) => {
    // 1. Filter by Event Category (Relaxed: include 'Gala' too)
    let filtered = PRODUCTS.filter(p => p.category === type || p.category === 'Gala');
    
    // 2. Filter by Tone (Strict)
    filtered = filtered.filter(p => p.tone === metal);

    // 3. Filter by Vibe (Keywords)
    if (vibe === 'Glamour Total') {
        filtered = filtered.filter(p => p.type === 'Corona' || p.featured || p.description.toLowerCase().includes('dramática'));
    } else if (vibe === 'Romántico / Floral') {
        filtered = filtered.filter(p => p.description.toLowerCase().includes('floral') || p.description.toLowerCase().includes('hoja') || p.description.toLowerCase().includes('delicad'));
    } else if (vibe === 'Minimalista / Moderno') {
        filtered = filtered.filter(p => p.type !== 'Corona' && (p.description.toLowerCase().includes('simple') || p.description.toLowerCase().includes('modern') || p.description.toLowerCase().includes('sutil')));
    }

    // Fallback if filter is too aggressive
    if (filtered.length < 2) {
        filtered = PRODUCTS.filter(p => p.tone === metal);
    }

    // Shuffle and take 3
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setResults(shuffled.slice(0, 3));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl min-h-[600px] shadow-2xl overflow-hidden flex flex-col fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10">
            <X className="w-6 h-6" />
        </button>

        {/* Step 0: Event Type */}
        {step === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s_ease-out]">
                <Sparkles className="w-12 h-12 text-brand-main mb-6" />
                <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">¿Cuál es tu Gran Evento?</h2>
                <p className="font-serif italic text-gray-500 mb-12">Para comenzar a diseñar tu brillo, primero dinos qué celebras.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
                    <button 
                        onClick={() => handleEventSelect('Bodas')}
                        className="group relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center hover:shadow-xl transition-all"
                    >
                        <img src="https://picsum.photos/id/106/500/500" alt="Boda" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                        <span className="relative z-10 font-display text-2xl tracking-widest bg-white/90 px-6 py-3">BODA</span>
                    </button>
                    <button 
                        onClick={() => handleEventSelect('XV Años')}
                        className="group relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center hover:shadow-xl transition-all"
                    >
                        <img src="https://picsum.photos/id/342/500/500" alt="XV" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                        <span className="relative z-10 font-display text-2xl tracking-widest bg-white/90 px-6 py-3">XV AÑOS</span>
                    </button>
                </div>
            </div>
        )}

        {/* Step 1: Dress Color */}
        {step === 1 && (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s_ease-out]">
                <Palette className="w-12 h-12 text-brand-main mb-6" />
                <h2 className="font-display text-3xl text-gray-900 mb-2">El Tono de tu Vestido</h2>
                <p className="font-serif italic text-gray-500 mb-10">Esto nos ayuda a sugerir el metal ideal (Plata vs. Dorado).</p>

                <div className="grid grid-cols-1 gap-4 w-full max-w-xl">
                    <button 
                        onClick={() => handleDressSelect('Fríos', 'Plata')}
                        className="flex items-center justify-between p-6 border border-gray-200 hover:border-brand-main hover:bg-stone-50 transition-all text-left group"
                    >
                        <div>
                            <span className="block font-serif text-lg text-gray-900">Blanco Puro / Plata / Azul / Tonos Fríos</span>
                            <span className="text-xs text-gray-500">Sugerencia: Accesorios Plateados</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
                    </button>

                    <button 
                        onClick={() => handleDressSelect('Cálidos', 'Dorado')}
                        className="flex items-center justify-between p-6 border border-gray-200 hover:border-brand-main hover:bg-stone-50 transition-all text-left group"
                    >
                        <div>
                            <span className="block font-serif text-lg text-gray-900">Ivory / Champagne / Beige / Tonos Cálidos</span>
                            <span className="text-xs text-gray-500">Sugerencia: Accesorios Dorados</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#fceabb] border border-[#d4af37]"></div>
                    </button>
                    
                    <button 
                        onClick={() => handleDressSelect('Vibrante', 'Plata')}
                        className="flex items-center justify-between p-6 border border-gray-200 hover:border-brand-main hover:bg-stone-50 transition-all text-left group"
                    >
                        <div>
                            <span className="block font-serif text-lg text-gray-900">Rojo / Negro / Colores Vibrantes</span>
                            <span className="text-xs text-gray-500">Sugerencia: Cristal Transparente / Plata</span>
                        </div>
                         <div className="w-8 h-8 rounded-full bg-red-800 border border-gray-800"></div>
                    </button>
                </div>
                
                 <button onClick={() => setStep(0)} className="mt-8 text-xs text-gray-400 hover:text-gray-900 border-b border-gray-300 pb-1">
                    Volver
                </button>
             </div>
        )}

        {/* Step 2: Vibe */}
        {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s_ease-out]">
                <h2 className="font-display text-3xl text-gray-900 mb-2">Define tu Estilo</h2>
                <p className="font-serif italic text-gray-500 mb-10">¿Cómo imaginas tu look final?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                    {[
                        { label: 'Romántico / Floral', desc: 'Encaje, flores, suavidad.' },
                        { label: 'Glamour Total', desc: 'Brillo intenso, coronas altas, impacto.' },
                        { label: 'Minimalista / Moderno', desc: 'Líneas limpias, sofisticación discreta.' }
                    ].map((opt) => (
                        <button 
                            key={opt.label}
                            onClick={() => handleStyleSelect(opt.label)}
                            className="border border-gray-200 p-8 hover:border-brand-main hover:bg-rose-50 transition-all text-left group"
                        >
                            <span className="block font-display text-lg mb-2 group-hover:text-brand-main">{opt.label}</span>
                            <span className="font-sans text-xs text-gray-500">{opt.desc}</span>
                        </button>
                    ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-8 text-xs text-gray-400 hover:text-gray-900 border-b border-gray-300 pb-1">
                    Volver al paso anterior
                </button>
            </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
            <div className="flex-1 flex flex-col p-8 animate-[fadeIn_0.5s_ease-out] overflow-y-auto">
                <div className="text-center mb-8">
                    <span className="text-brand-main text-xs font-bold uppercase tracking-widest">Tu Selección Personalizada</span>
                    <h2 className="font-display text-3xl text-gray-900 mt-2">Estilo {styleVibe}</h2>
                    <p className="font-sans text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                        Para combinar con tu vestido de tonos {dressColor?.toLowerCase()}, hemos seleccionado piezas en acabado <strong>{metalSuggestion}</strong> con el estilo {styleVibe?.toLowerCase()}.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
                    {results.map(product => (
                        <div key={product.id} className="flex flex-col">
                            <ProductCard product={product} />
                            <button 
                                onClick={() => addItem(product)}
                                className="mt-2 text-center bg-gray-900 text-white text-xs py-2 uppercase tracking-widest hover:bg-brand-main transition-colors"
                            >
                                Agregar a Prueba
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-6 mt-auto pt-8 border-t border-gray-100">
                    <button onClick={resetQuiz} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-brand-main">
                        <RefreshCcw className="w-4 h-4" /> Reiniciar Quiz
                    </button>
                    <button onClick={onClose} className="flex items-center gap-2 text-xs uppercase tracking-widest bg-brand-main text-white px-6 py-3 font-bold hover:bg-brand-dark transition-colors">
                        Ver Catálogo Completo <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StyleQuiz;