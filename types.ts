export type ProductTone = 'Plata' | 'Dorado';
export type ProductType = 'Tiara' | 'Corona' | 'Aretes' | 'Collar' | 'Pulsera';

export interface Product {
  id: number;
  name: string;
  category: 'Bodas' | 'XV Años' | 'Gala' | 'Casual'; // Contexto del evento
  type: ProductType; // Tipo físico del producto
  tone: ProductTone; // Metal base
  image: string;
  description: string;
  featured: boolean;
  label?: 'Pieza Única' | 'Edición Limitada' | 'Nueva Colección';
}

export interface NavigationItem {
  label: string;
  path: string;
}