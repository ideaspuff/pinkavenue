import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        image: '/images/slider/slide1.png', // Tiara Wide
        title: 'LUJO LUMINOSO',
        subtitle: 'Piezas que capturan la luz y la transforman en leyenda.',
        link: '/catalogo?cat=Bodas',
        buttonText: 'VER COLECCIÓN',
        position: 'bottom-left'
    },
    {
        id: 2,
        image: '/images/slider/slide2.png', // Crown Prisms
        title: 'INSTANTE RADIANTE',
        subtitle: 'Ilumina tu evento con la intensidad del halógeno.',
        link: '/catalogo?cat=XV Años',
        buttonText: 'VER MÁS',
        position: 'bottom-right'
    },
    {
        id: 3,
        image: '/images/slider/slide3.png', // Rings Stack
        title: 'BRILLO ETERNO',
        subtitle: 'Diseños creados para ser el centro de todas las miradas.',
        link: '/catalogo',
        buttonText: 'EXPLORAR',
        position: 'bottom-right'
    },
    {
        id: 4,
        image: '/images/slider/slide4.png', // Statement Collar
        title: 'ARTE EN LUZ',
        subtitle: 'Joyería statement que no necesita presentación.',
        link: '/nosotros',
        buttonText: 'EL ATELIER',
        position: 'bottom-left'
    },
    {
        id: 5,
        image: '/images/slider/slide5.png', // Bracelet
        title: 'CRISTAL PURO',
        subtitle: 'La claridad absoluta en cada faceta de tu estilo.',
        link: '/catalogo',
        buttonText: 'DESCUBRIR',
        position: 'bottom-left'
    }
];

const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 6000); // 6 seconds per slide for a slow, premium feel
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-white">
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Image with Ken Burns Effect */}
                    <div className={`absolute inset-0 overflow-hidden ${index === currentSlide ? 'animate-ken-burns' : ''}`}>
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Text Overlay - Strict Corner Positioning */}
                    <div className="absolute inset-0">
                        <div className={`
                absolute w-full md:w-auto px-8 md:px-16 pb-12 md:pb-24
                ${slide.position === 'bottom-left' ? 'bottom-0 left-0 text-left' : ''}
                ${slide.position === 'bottom-right' ? 'bottom-0 right-0 text-right' : ''}
             `}>
                            <div className={`flex flex-col gap-6 max-w-lg
                  ${slide.position === 'bottom-right' ? 'ml-auto items-end' : 'items-start'}
               `}>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-2 tracking-widest uppercase drop-shadow-sm leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="font-serif text-lg text-gray-700 italic mb-6 font-light leading-relaxed max-w-md">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    to={slide.link}
                                    className="inline-block bg-gray-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-main transition-colors duration-300 shadow-lg"
                                >
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-gray-400 hover:text-brand-main transition-colors hidden md:block"
            >
                <ChevronLeft className="w-10 h-10" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-gray-400 hover:text-brand-main transition-colors hidden md:block"
            >
                <ChevronRight className="w-10 h-10" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-0 w-full z-20 flex justify-center gap-3">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-12 h-1 transition-all duration-300 ${index === currentSlide ? 'bg-brand-main' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
