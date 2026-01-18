import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex flex-col items-center">
      {/* Image Container with Overlay */}
      <Link to={`/producto/${product.id}`} className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-6 cursor-pointer block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
        
        {/* View Icon Overlay (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="bg-white/90 p-4 rounded-full backdrop-blur-sm">
                <Eye className="w-6 h-6 text-brand-main" />
             </div>
        </div>

        {/* Category Tag (Left) */}
        <div className="absolute top-4 left-0 bg-white/90 px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase font-sans text-gray-800 shadow-sm backdrop-blur-sm">
            {product.category}
        </div>

        {/* Exclusivity Badge (Right) - Point 9 */}
        {product.label && (
            <div className={`absolute top-4 right-0 px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase font-display font-bold shadow-sm backdrop-blur-sm 
                ${product.label === 'Pieza Única' ? 'bg-brand-gold text-white bg-[#d4af37]' : 
                  product.label === 'Edición Limitada' ? 'bg-gray-900 text-white' : 
                  'bg-brand-main text-white'}`}>
                {product.label}
            </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="text-center w-full px-2">
        <h3 className="font-serif text-lg text-gray-900 group-hover:text-brand-main transition-colors duration-300 truncate">
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="w-8 h-px bg-brand-light mx-auto my-3 group-hover:bg-brand-main transition-colors duration-300"></div>
        <p className="text-gray-500 text-xs font-sans font-light tracking-wide line-clamp-2 mb-4 h-8">
            {product.description}
        </p>
        
        <Link 
            to={`/producto/${product.id}`}
            className="inline-block border border-gray-300 px-6 py-2 text-xs uppercase tracking-widest font-sans text-gray-600 hover:bg-brand-main hover:border-brand-main hover:text-white transition-all duration-300"
        >
            Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;