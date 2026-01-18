import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../constants';

const Terms: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-8 text-center uppercase tracking-widest">
                    Términos y Condiciones
                </h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600 font-light text-justify">
                    <p className="mb-6">
                        Bienvenido a <strong>{COMPANY_INFO.name}</strong>. Al acceder y utilizar este sitio web y nuestros servicios de showroom, usted acepta estar sujeto a los siguientes términos y condiciones. Por favor, léalos cuidadosamente.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">1. Productos y Disponibilidad</h2>
                    <p>
                        Nuestras piezas son de joyería de fantasía fina y accesorios nupciales/sociales. Nos esforzamos por mostrar con la mayor precisión posible los colores y características de nuestros productos. Sin embargo, no podemos garantizar que la visualización en su monitor sea exacta. Todas las piezas están sujetas a disponibilidad.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">2. Citas y Showroom</h2>
                    <p>
                        La atención en nuestro showroom es exclusivamente bajo cita previa confirmada. Nos reservamos el derecho de admisión. Solicitamos puntualidad para garantizar la mejor experiencia para todos nuestros clientes.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">3. Precios y Pagos</h2>
                    <p>
                        Los precios mostrados en comunicaciones directas o en tienda física están en Pesos Mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de modificar los precios sin previo aviso.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">4. Políticas de Cambios y Devoluciones</h2>
                    <p>
                        Por higiene y la naturaleza de nuestros productos (accesorios de uso personal para eventos), <strong>no aceptamos devoluciones</strong> una vez que la mercancía ha salido de nuestras instalaciones.
                    </p>
                    <p>
                        Únicamente se aceptarán cambios por defectos de fabricación detectados al momento de la entrega en nuestro showroom. Le solicitamos revisar minuciosamente su pieza antes de retirarse.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">5. Propiedad Intelectual</h2>
                    <p>
                        Todo el contenido de este sitio (imágenes, logotipos, textos, diseños) es propiedad de <strong>{COMPANY_INFO.name}</strong> y está protegido por las leyes de propiedad intelectual aplicables.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">6. Limitación de Responsabilidad</h2>
                    <p>
                        <strong>{COMPANY_INFO.name}</strong> no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos. El cuidado de la joyería (evitar perfumes, agua, caídas) es responsabilidad total del cliente.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">7. Contacto</h2>
                    <p>
                        Para cualquier duda o aclaración sobre estos términos, por favor contáctenos a: <a href={`mailto:${COMPANY_INFO.email}`} className="text-brand-main hover:underline">{COMPANY_INFO.email}</a>.
                    </p>

                    <p className="text-xs text-gray-400 mt-12 border-t border-gray-100 pt-4 text-center">
                        Última actualización: Enero 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
