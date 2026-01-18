import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond, Crown, Sparkles, PenTool, Gem, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="pt-24 pb-0 bg-white">

            {/* 1. HERO EDITORIAL: Impacto Visual Inmediato */}
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img
                    src="/images/atelier_hero.png"
                    alt="Atelier Pink Avenue Detalle"
                    className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white fade-in px-4 max-w-4xl">
                        <span className="text-xs font-bold uppercase tracking-[0.5em] mb-6 block text-brand-light">Alta Joyería de Fantasía</span>
                        <h1 className="font-display text-6xl md:text-8xl mb-8 leading-tight drop-shadow-2xl">
                            EL ARTE DEL<br />DETALLE
                        </h1>
                        <p className="font-serif italic text-xl md:text-3xl font-light text-white/90">
                            "En Acapulco, redefinimos el significado de la elegancia nupcial."
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. MANIFIESTO: La Razón de Ser */}
            <section className="py-24 px-6 max-w-5xl mx-auto text-center slide-up">
                <Diamond className="w-8 h-8 text-brand-main mx-auto mb-8" />
                <h2 className="font-display text-3xl md:text-5xl text-gray-900 mb-8 leading-tight">
                    NO VENDEMOS ACCESORIOS,<br />CREAMOS LEGADOS.
                </h2>
                <div className="w-24 h-1 bg-gray-900 mx-auto mb-10"></div>
                <div className="prose prose-lg mx-auto text-gray-600 font-sans font-light leading-loose text-justify md:text-center">
                    <p>
                        Pink Avenue nació de una observación silenciosa: en los momentos más trascendentales de una mujer, los detalles a menudo pasaban desapercibidos.
                        Entendimos que una novia o una quinceañera no busca simplemente "algo brillante"; busca una pieza que esté a la altura de sus sueños,
                        una joya que capture la luz de los reflectores y la sostenga eternamente en las fotografías.
                    </p>
                    <p className="mt-6">
                        Situados en el corazón de la Zona Dorada de Acapulco, nuestro Atelier es un refugio contra lo ordinario.
                        Aquí, la <strong>curaduría es nuestra forma de arte</strong>. No somos fabricantes masivos; somos guardianes de un estilo sofisticado
                        que fusiona la tradición europea con la vibrante energía de la costa.
                    </p>
                </div>
            </section>

            {/* 3. SAVOIR-FAIRE (EL SABER HACER): Calidad Técnica */}
            <section className="bg-stone-50 py-24 border-y border-stone-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Visual Side */}
                        <div className="relative h-[600px] group overflow-hidden shadow-2xl">
                            <img src="https://picsum.photos/id/119/800/1000" alt="Materiales Premium" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 max-w-xs border-l-4 border-brand-main">
                                <span className="font-display text-2xl text-gray-900 block mb-2">CRISTAL AUSTRIACO</span>
                                <p className="font-sans text-xs text-gray-600 uppercase tracking-widest">Claridad VVS • 56 Facetas</p>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div>
                            <span className="text-brand-main text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Nuestro Savoir-Faire</span>
                            <h3 className="font-display text-4xl text-gray-900 mb-8">LA CIENCIA DEL BRILLO</h3>
                            <p className="font-sans text-gray-600 font-light mb-10 text-lg leading-relaxed">
                                Lo que distingue a una pieza de Pink Avenue no es solo su diseño, sino su construcción.
                                Trabajamos exclusivamente con materiales seleccionados para resistir el escrutinio de la alta definición.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-brand-main">
                                        <Gem className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-gray-900 mb-2">Corte & Refracción</h4>
                                        <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                                            Nuestros cristales no son vidrio moldeado. Son cortados con precisión láser para garantizar que la luz
                                            no solo pase a través de ellos, sino que baile en su interior.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-brand-main">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-gray-900 mb-2">Baño de Metales Nobles</h4>
                                        <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                                            Olvida la joyería que mancha la piel. Nuestras bases de aleación ligera reciben un triple baño de
                                            Plata .925 o Rodio, asegurando un acabado hipoalergénico y duradero.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-brand-main">
                                        <Crown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-gray-900 mb-2">Arquitectura Estructural</h4>
                                        <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                                            Una tiara debe ser cómoda. Diseñamos estructuras ergonómicas que se distribuyen suavemente
                                            sobre el peinado, permitiendo que las uses durante horas sin molestia.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <Link to="/catalogo" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-main transition-colors">
                                    Explorar Colección Técnica <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EL RITUAL (CUSTOMER JOURNEY): Exclusividad */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">El Proceso</span>
                    <h2 className="font-display text-4xl md:text-5xl text-gray-900">EL RITUAL PINK AVENUE</h2>
                    <p className="mt-6 font-serif text-gray-500 italic text-xl">"Porque la elección es tan memorable como el evento"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gray-200 -z-10"></div>

                    {/* Step 1 */}
                    <div className="bg-white p-6 text-center relative group">
                        <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border border-brand-light flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                            <span className="font-display text-3xl text-brand-main">01</span>
                        </div>
                        <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-4">La Inspiración</h3>
                        <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">
                            Exploras nuestra <strong>Galería Digital</strong> o realizas nuestro Diagnóstico de Estilo. Seleccionas las piezas que resuenan con tu visión.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 text-center relative group">
                        <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border border-brand-light flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                            <span className="font-display text-3xl text-brand-main">02</span>
                        </div>
                        <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-4">La Cita Privada</h3>
                        <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">
                            Te recibimos en nuestro <strong>Showroom en Acapulco</strong>. Una sesión a puerta cerrada, solo para ti y tus acompañantes, con asesoría experta.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 text-center relative group">
                        <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border border-brand-light flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                            <span className="font-display text-3xl text-brand-main">03</span>
                        </div>
                        <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-4">La Prueba de Luz</h3>
                        <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">
                            Probamos las piezas con diferentes iluminaciones y ángulos. Ajustamos estructuras y combinamos elementos (tiara + aretes) para perfeccionar el ajuar.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-6 text-center relative group">
                        <div className="w-24 h-24 mx-auto bg-stone-50 rounded-full border border-brand-light flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                            <span className="font-display text-3xl text-brand-main">04</span>
                        </div>
                        <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-4">El Legado</h3>
                        <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">
                            Te llevas una pieza lista para brillar. No es solo un accesorio para un día; es una joya que podrás heredar o reutilizar en momentos especiales.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Link to="/contacto" className="inline-block border-b border-gray-900 pb-1 text-sm uppercase tracking-widest hover:text-brand-main hover:border-brand-main transition-all">
                        Agendar mi Cita Privada
                    </Link>
                </div>
            </section>

            {/* 5. VISUAL BREAK / EMOTIONAL ANCHOR */}
            <section className="relative py-32 bg-gray-900 overflow-hidden">
                <img src="https://picsum.photos/id/838/1920/800" alt="Novia Pink Avenue" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <Sparkles className="w-10 h-10 text-brand-gold mx-auto mb-6 animate-pulse" />
                    <h2 className="font-serif italic text-3xl md:text-5xl text-white leading-relaxed mb-8">
                        "La joyería tiene el poder de ser esa pequeña cosa que te hace sentir única."
                    </h2>
                    <p className="text-white/60 font-sans uppercase tracking-[0.2em] text-xs">
                        — Jennie Kwon (Inspiración)
                    </p>
                </div>
            </section>

            {/* 6. FOUNDER / CLOSING */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 overflow-hidden">
                        {/* Placeholder for Founder Image if available, otherwise stylistic icon */}
                        <div className="w-full h-full flex items-center justify-center bg-brand-light text-brand-dark">
                            <span className="font-display text-2xl font-bold">PA</span>
                        </div>
                    </div>
                    <p className="font-display text-2xl md:text-3xl text-gray-900 max-w-2xl mx-auto leading-relaxed mb-6">
                        "Te invitamos a descubrir el secreto mejor guardado de Acapulco."
                    </p>
                    <p className="font-sans font-light text-gray-500 mb-10 leading-relaxed">
                        Ya sea para una boda íntima en la playa o una fastuosa celebración de XV años en salón,
                        nuestro equipo está listo para recibirte con una copa de champagne y la colección más exquisita del estado.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link to="/catalogo" className="px-8 py-3 border border-gray-200 uppercase tracking-widest text-xs font-bold hover:border-brand-main hover:text-brand-main transition-colors">
                            Ver Galería
                        </Link>
                        <Link to="/contacto" className="px-8 py-3 bg-brand-main text-white border border-brand-main uppercase tracking-widest text-xs font-bold hover:bg-brand-dark transition-colors">
                            Visitar Showroom
                        </Link>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <span className="font-signature text-4xl text-gray-300">Pink Avenue Team</span>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;