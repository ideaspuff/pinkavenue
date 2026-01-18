import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface FittingRoomContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearRoom: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FittingRoomContext = createContext<FittingRoomContextType | undefined>(undefined);

export const FittingRoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pink_avenue_fitting_room');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse fitting room data");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('pink_avenue_fitting_room', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      // Automatically open the drawer when adding an item for feedback
      setIsOpen(true);
      return [...prev, product];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearRoom = () => {
    setItems([]);
  };

  return (
    <FittingRoomContext.Provider value={{ items, addItem, removeItem, clearRoom, isOpen, setIsOpen }}>
      {children}
    </FittingRoomContext.Provider>
  );
};

export const useFittingRoom = () => {
  const context = useContext(FittingRoomContext);
  if (context === undefined) {
    throw new Error('useFittingRoom must be used within a FittingRoomProvider');
  }
  return context;
};