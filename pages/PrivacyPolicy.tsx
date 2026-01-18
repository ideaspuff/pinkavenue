import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../constants';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-8 text-center uppercase tracking-widest">
                    Aviso de Privacidad
                </h1>

                <div className="prose prose-stone mx-auto font-sans text-gray-600 font-light text-justify">
                    <p className="mb-6">
                        <strong>{COMPANY_INFO.name}</strong>, con domicilio en <strong>{COMPANY_INFO.fullAddress}</strong>, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">¿Para qué fines utilizaremos sus datos personales?</h2>
                    <p>
                        Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Verificar y confirmar su identidad.</li>
                        <li>Proveer los servicios y productos que ha solicitado (venta y/o ajuste de joyería).</li>
                        <li>Agendar citas en nuestro showroom o atención personalizada.</li>
                        <li>Facturación y cobro.</li>
                        <li>Dar cumplimiento a obligaciones contraídas con nuestros clientes.</li>
                    </ul>
                    <p>
                        De manera adicional, utilizaremos su información personal para las siguientes finalidades que <strong>no son necesarias</strong> para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Envío de promociones y nuevas colecciones.</li>
                        <li>Evaluación de la calidad del servicio.</li>
                    </ul>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h2>
                    <p>
                        Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
                    </p>
                    <p className="mt-4">
                        Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del siguiente medio:
                    </p>
                    <p className="mt-4 font-bold text-center bg-gray-50 p-4 border border-gray-100">
                        Correo electrónico: <a href={`mailto:${COMPANY_INFO.privacyEmail}`} className="text-brand-main hover:underline">{COMPANY_INFO.privacyEmail}</a>
                    </p>
                    <p className="mt-4">
                        Con relación al procedimiento y requisitos para el ejercicio de sus derechos ARCO, le informamos lo siguiente:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Acreditación de identidad: A través de identificación oficial vigente.</li>
                        <li>Medio de respuesta: Correo electrónico.</li>
                        <li>Plazo de respuesta: 20 días hábiles.</li>
                    </ul>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">Uso de tecnologías de rastreo en nuestro portal de Internet</h2>
                    <p>
                        Le informamos que en nuestra página de Internet utilizamos cookies, web beacons y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de Internet, brindarle un mejor servicio y experiencia de usuario al navegar en nuestra página.
                    </p>

                    <h2 className="font-serif text-xl text-gray-800 mt-8 mb-4">Cambios en este aviso de privacidad</h2>
                    <p>
                        El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
                    </p>
                    <p className="mt-4">
                        Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de nuestro sitio web oficial.
                    </p>

                    <p className="text-xs text-gray-400 mt-12 border-t border-gray-100 pt-4 text-center">
                        Última actualización: Enero 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
