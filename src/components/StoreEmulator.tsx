/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Building2, 
  ShoppingBag, 
  ShoppingCart, 
  Trash2, 
  CheckCircle, 
  ChevronRight, 
  HelpCircle, 
  Coins 
} from "lucide-react";
import { ProductStock, Retailer } from "../types";

interface StoreEmulatorProps {
  productStocks: ProductStock[];
  retailers: Retailer[];
  onPlaceOrder: (order: {
    customerName: string;
    customerType: string;
    productsBought: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
  }) => void;
}

interface CartItem {
  product: ProductStock;
  quantity: number;
}

export default function StoreEmulator({ productStocks, retailers, onPlaceOrder }: StoreEmulatorProps) {
  const [customerType, setCustomerType] = useState<string>("Household");
  const [customerName, setCustomerName] = useState<string>("Sanjay Kumar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [success, setSuccess] = useState(false);

  // Helper: sync typical defaults when choosing client types
  const handleTypeChange = (type: string) => {
    setCustomerType(type);
    if (type === "Household") {
      setCustomerName("Sanjiv Sharma");
    } else if (type === "Restaurant") {
      setCustomerName("Chef Vivek (Grand Imperial)");
    } else if (type === "Café") {
      setCustomerName("Royal Bakers Admin");
    } else if (type === "Grocery Store") {
      setCustomerName("Bala Ji Wholesale Store");
    } else {
      setCustomerName("Government Primary School");
    }
  };

  const handleAddToCart = (product: ProductStock, count: number) => {
    if (count <= 0) return;
    
    // Check stock constraints
    if (product.stockLevel < count) {
      alert(`Cannot add ${count} units. Only ${product.stockLevel} units currently available in packaging storage.`);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + count;
        if (product.stockLevel < nextQty) {
          alert(`Aggregate constraint: Cannot support ${nextQty} units in cart. Exceeds packaged stocks.`);
          return prev;
        }
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: nextQty } : item);
      }
      return [...prev, { product, quantity: count }];
    });
    setSuccess(false);
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    const p = productStocks.find(item => item.id === productId);
    if (!p) return;

    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
      return;
    }

    if (p.stockLevel < newQty) {
      alert(`Cannot adjust to ${newQty} units. Exceeds available packed stock level of ${p.stockLevel}.`);
      return;
    }

    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQty } : item));
  };

  const handleRemove = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.pricePerUnit * item.quantity), 0);
  const cartTax = Number((cartSubtotal * 0.05).toFixed(2)); // 5% GST on processed milk derivative items
  const cartTotal = Number((cartSubtotal + cartTax).toFixed(2));

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    onPlaceOrder({
      customerName,
      customerType,
      productsBought: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.pricePerUnit
      })),
      totalAmount: cartTotal
    });

    // Reset shopping session
    setCart([]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-900/15 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
            Client Commerce Emulator
          </span>
          <h2 className="text-xl font-bold text-amber-950 mt-1 tracking-tight">Virtual Order Placement Front</h2>
          <p className="text-stone-605 text-stone-600 text-xs mt-0.5 max-w-2xl">
            Simulate a distributor, hotel chef, or household buyer purchase. Emits immediate sales orders, updates packaged inventories, and logs corporate receivables directly.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="p-2 px-3 bg-white hover:bg-stone-50 border text-stone-805 text-xs font-semibold rounded-xl shadow-xs">
            🧾 Auto Syncs with Ledger & Cold Chain Log
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products lists column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Customer profile configure card */}
          <div className="bg-white rounded-xl border border-amber-100/50 p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-800">1. Customer Placement Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-400 pb-1">Customer Category</label>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {["Household", "Restaurant", "Café", "Grocery Store"].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTypeChange(t)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        customerType === t 
                          ? "bg-amber-900 text-amber-50 font-bold" 
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-stone-400 pb-1">Ordering Client Name / Label</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Insert company or individual tag"
                  className="w-full text-xs p-2 bg-stone-50 rounded-lg border focus:bg-white outline-hidden font-medium border-stone-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Grid of buying products */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">2. Select Premium Dairy Commodities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productStocks.map(p => {
                const isOutOfStock = p.stockLevel <= 0;
                const isLow = p.stockLevel < p.minStockThreshold;

                return (
                  <ProductItemCard 
                    key={p.id} 
                    product={p} 
                    isOutOfStock={isOutOfStock} 
                    isLow={isLow} 
                    onAdd={handleAddToCart} 
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Checkout Card */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-2 pb-2.5 border-b border-stone-100">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5">
              <ShoppingCart className="w-5 h-5 text-amber-800" /> Procurement Basket
            </h3>
            <p className="text-xs text-stone-500">Receipt computations dynamic with selected dairy lines.</p>
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-250 border-l-4 border-l-emerald-500 rounded text-xs leading-relaxed animate-fade-in font-medium">
              <strong className="block text-sm">Order Dispatched Successfully!</strong>
              The warehouse team was notified, raw logs were synced, and a refrigerated truck is being assigned! View progress in Logistics & Accounts.
            </div>
          )}

          {cart.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-stone-300 stroke-1" />
              <p className="text-xs font-semibold">Your shopping basket is active and empty.</p>
              <p className="text-[11px] text-stone-450 text-stone-500">Pick premium butter, shuddh ghee, or soft paneer from the catalog list to populate checkout.</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-stone-100">
                {cart.map(item => (
                  <div key={item.product.id} className="pt-3 flex justify-between items-start text-xs font-medium">
                    <div className="space-y-0.5 flex-1 pr-1.5">
                      <h4 className="font-bold text-stone-800 leading-snug">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-450 text-stone-500">₹{item.product.pricePerUnit} / {item.product.unit}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg bg-stone-50 border-stone-250-100 overflow-hidden">
                        <button 
                          onClick={() => handleUpdateCartQty(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-amber-950">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateCartQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button 
                        type="button"
                        onClick={() => handleRemove(item.product.id)}
                        className="p-1 hover:bg-rose-50 text-rose-600 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Math computation receipt */}
              <div className="pt-3 border-t border-dashed border-stone-200 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-stone-550 text-stone-550 text-stone-500">
                  <span>Basket subtotal:</span>
                  <span className="font-mono">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-550 text-stone-500">
                  <span>State Dairy GST (5%):</span>
                  <span className="font-mono">₹{cartTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-850 pt-1.5 border-t border-stone-100 text-stone-800">
                  <span>Gross Billing Cost:</span>
                  <span className="font-mono text-amber-950">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-2 pt-2">
                <p className="text-[10px] text-stone-400 italic">
                  Dispatch Agent: Immediate dispatch to <strong>{customerName}</strong> via cold-route network.
                </p>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-lg cursor-pointer text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <Coins className="w-4 h-4" /> Transact & Deliver Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Internal reusable item select card
interface ProductItemCardProps {
  key?: string;
  product: ProductStock;
  isOutOfStock: boolean;
  isLow: boolean;
  onAdd: (product: ProductStock, count: number) => void;
}

function ProductItemCard({ product, isOutOfStock, isLow, onAdd }: ProductItemCardProps) {
  const [inputCount, setInputCount] = useState<number>(5);

  return (
    <div className={`p-4 rounded-xl border bg-white flex flex-col justify-between space-y-4 shadow-xs transition-all relative overflow-hidden ${
      isOutOfStock ? "opacity-60 border-stone-200" :
      isLow ? "border-amber-200" : "border-stone-150 border-stone-200 hover:border-amber-900/30"
    }`}>
      {/* Decorative tag for Category */}
      <div className="absolute top-0 right-0 p-1.5 px-3 bg-amber-500/10 text-[9px] font-mono text-amber-900 rounded-bl-xl font-bold uppercase">
        {product.category}
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-stone-800 leading-tight pr-14">{product.name}</h4>
        
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-base font-extrabold text-amber-950 font-mono">₹{product.pricePerUnit}</span>
          <span className="text-[11px] text-stone-500 font-medium">per {product.unit}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="font-mono">
            Packaged Stock: <strong className={`${isOutOfStock ? "text-rose-600 font-extrabold" : isLow ? "text-amber-600" : "text-stone-700"}`}>
              {isOutOfStock ? "SOLD OUT" : `${product.stockLevel} ${product.unit}s`}
            </strong>
          </span>
          
          {isLow && !isOutOfStock && (
            <span className="text-[9.5px] px-1.5 py-0.5 font-bold uppercase rounded bg-amber-50 text-amber-800 animate-pulse">
              Replenishing
            </span>
          )}
        </div>
      </div>

      {/* Select buttons and triggers */}
      {!isOutOfStock && (
        <div className="flex items-center gap-2 pt-1">
          {/* Quick counter inputs */}
          <select
            value={inputCount}
            onChange={e => setInputCount(Number(e.target.value))}
            className="text-xs p-1.5 px-2.5 rounded bg-stone-50 border outline-none font-semibold text-stone-700 focus:bg-white"
          >
            {[1, 2, 5, 10, 20, 50].map(c => (
              <option key={c} value={c}>{c} Units</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onAdd(product, inputCount)}
            className="flex-1 py-1.5 bg-amber-900 hover:bg-amber-950 text-white rounded text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1"
          >
            Add To Cart <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
