/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Search, 
  Milk, 
  Coins, 
  Settings, 
  Layers, 
  Megaphone, 
  ShoppingCart, 
  DollarSign, 
  Truck, 
  MessageSquare, 
  Sparkles,
  ClipboardList,
  Compass,
  ArrowRight
} from "lucide-react";

// Imports child Tab components
import OverviewTab from "./components/OverviewTab";
import ProcurementTab from "./components/ProcurementTab";
import ProductionTab from "./components/ProductionTab";
import SalesMarketingTab from "./components/SalesMarketingTab";
import StoreEmulator from "./components/StoreEmulator";
import AccountsTab from "./components/AccountsTab";
import LogisticsTab from "./components/LogisticsTab";
import CustomerServiceTab from "./components/CustomerServiceTab";

// Imports types & initial datasets
import { 
  Farmer, 
  CollectionLog, 
  ProductStock, 
  ProductionBatch, 
  Retailer, 
  SalesOrder, 
  DeliveryTruck, 
  MarketingCampaign, 
  FeedbackMessage 
} from "./types";

import { 
  INITIAL_FARMERS, 
  INITIAL_COLLECTIONS, 
  INITIAL_STOCKS, 
  INITIAL_BATCHES, 
  INITIAL_RETAILERS, 
  INITIAL_ORDERS, 
  INITIAL_FLEET, 
  INITIAL_CAMPAIGNS, 
  INITIAL_FEEDBACK 
} from "./data";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Core Database States synced with localStorage
  const [rawMilkLiters, setRawMilkLiters] = useState<number>(() => {
    const saved = localStorage.getItem("amrit_raw_milk");
    return saved ? Number(saved) : 380; // realistic starting litres
  });

  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem("amrit_farmers");
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [collections, setCollections] = useState<CollectionLog[]>(() => {
    const saved = localStorage.getItem("amrit_collections");
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [productStocks, setProductStocks] = useState<ProductStock[]>(() => {
    const saved = localStorage.getItem("amrit_stocks");
    return saved ? JSON.parse(saved) : INITIAL_STOCKS;
  });

  const [batches, setBatches] = useState<ProductionBatch[]>(() => {
    const saved = localStorage.getItem("amrit_batches");
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [retailers, setRetailers] = useState<Retailer[]>(() => {
    const saved = localStorage.getItem("amrit_retailers");
    return saved ? JSON.parse(saved) : INITIAL_RETAILERS;
  });

  const [orders, setOrders] = useState<SalesOrder[]>(() => {
    const saved = localStorage.getItem("amrit_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [fleet, setFleet] = useState<DeliveryTruck[]>(() => {
    const saved = localStorage.getItem("amrit_fleet");
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(() => {
    const saved = localStorage.getItem("amrit_campaigns");
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackMessage[]>(() => {
    const saved = localStorage.getItem("amrit_feedbacks");
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  // Watchers to persist updates automatically
  useEffect(() => {
    localStorage.setItem("amrit_raw_milk", rawMilkLiters.toString());
  }, [rawMilkLiters]);

  useEffect(() => {
    localStorage.setItem("amrit_farmers", JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem("amrit_collections", JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem("amrit_stocks", JSON.stringify(productStocks));
  }, [productStocks]);

  useEffect(() => {
    localStorage.setItem("amrit_batches", JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem("amrit_retailers", JSON.stringify(retailers));
  }, [retailers]);

  useEffect(() => {
    localStorage.setItem("amrit_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("amrit_fleet", JSON.stringify(fleet));
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem("amrit_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem("amrit_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Handler: Add a fresh Milk collection weigh
  const handleAddCollection = (newLog: Omit<CollectionLog, "id" | "date">) => {
    const freshId = `COL-${Math.floor(100 + Math.random() * 900)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const logRecord: CollectionLog = {
      id: freshId,
      date: todayStr,
      ...newLog
    };

    // Prepend to list
    setCollections(prev => [logRecord, ...prev]);
    // Addition raw milk silos
    setRawMilkLiters(prev => prev + newLog.quantityLiters);
    
    // Accumulate total metrics on the farmer profile
    setFarmers(prev => prev.map(f => {
      if (f.name === newLog.farmerName) {
        return { ...f, totalSuppliedLitres: f.totalSuppliedLitres + newLog.quantityLiters };
      }
      return f;
    }));
  };

  // Handler: Onboard a micro-farm supplier
  const handleAddFarmer = (newFarmer: Omit<Farmer, "id" | "totalSuppliedLitres">) => {
    const fId = `F-${farmers.length + 1}`;
    const rec: Farmer = {
      id: fId,
      totalSuppliedLitres: 0,
      ...newFarmer
    };
    setFarmers(prev => [...prev, rec]);
  };

  // Handler: Create a finished packaged product line (Paneer, Ghee, Curd etc.)
  const handleProduceBatch = (newBatch: Omit<ProductionBatch, "id" | "date">): boolean => {
    if (newBatch.rawMilkConsumed > rawMilkLiters) {
      return false; // safety validation constraint
    }

    const bId = `BAT-${Math.floor(200 + Math.random() * 300)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const batchRecord: ProductionBatch = {
      id: bId,
      date: todayStr,
      ...newBatch
    };

    // Add to history list
    setBatches(prev => [batchRecord, ...prev]);
    // Deduct silo milk feedstock raw fluid levels
    setRawMilkLiters(prev => prev - newBatch.rawMilkConsumed);

    // Increase specific finished commodity stock levels
    setProductStocks(prev => prev.map(p => {
      if (p.name === newBatch.productName) {
        return { ...p, stockLevel: p.stockLevel + newBatch.quantityProduced };
      }
      return p;
    }));

    return true;
  };

  // Handler: Add marketing promotion budget
  const handleAddCampaign = (newCamp: Omit<MarketingCampaign, "id">) => {
    const cId = `MKT-${campaigns.length + 1}`;
    const rec: MarketingCampaign = {
      id: cId,
      ...newCamp
    };
    setCampaigns(prev => [rec, ...prev]);
  };

  // Handler: Register bulk commercial partner
  const handleAddRetailer = (newRet: Omit<Retailer, "id" | "monthlyVolumeKg">) => {
    const rId = `RET-${retailers.length + 1}`;
    const rec: Retailer = {
      id: rId,
      monthlyVolumeKg: 200 + Math.floor(Math.random() * 700),
      ...newRet
    };
    setRetailers(prev => [...prev, rec]);
  };

  // Handler: Place a mock retail/household storefront cart order
  const handlePlaceOrder = (newOrder: {
    customerName: string;
    customerType: string;
    productsBought: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
  }) => {
    const oId = `ORD-${Math.floor(600 + Math.random() * 400)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const finalOrderRecord: SalesOrder = {
      id: oId,
      date: todayStr,
      paymentStatus: "Paid",
      deliveryStatus: "Pending Dispatch",
      ...newOrder
    };

    // 1. Add order to sales database log
    setOrders(prev => [finalOrderRecord, ...prev]);

    // 2. Decrement physical commodity packaged reserves
    setProductStocks(prev => prev.map(p => {
      const matchInBasket = newOrder.productsBought.find(pBought => pBought.productId === p.id);
      if (matchInBasket) {
        return { ...p, stockLevel: Math.max(0, p.stockLevel - matchInBasket.quantity) };
      }
      return p;
    }));
  };

  // Handler: Dispatch insulated delivery tanker/truck
  const handleDispatchTruck = (truckId: string, orderId: string, route: string) => {
    // Mark truck Out for delivery
    setFleet(prev => prev.map(t => {
      if (t.id === truckId) {
        return { ...t, status: "Out for Delivery" as const, route };
      }
      return t;
    }));

    // Mark corresponding order "In Transit"
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, deliveryStatus: "In Transit" as const };
      }
      return o;
    }));
  };

  // Handler: Manually tune thermostat sensors on delivery vehicles
  const handleModifyTruckTemp = (truckId: string, temp: number) => {
    setFleet(prev => prev.map(t => {
      if (t.id === truckId) {
        return { ...t, tempCelsius: temp };
      }
      return t;
    }));
  };

  // Handler: Submit consumer feedback inquiries
  const handleAddFeedback = (newF: Omit<FeedbackMessage, "id" | "date" | "status">) => {
    const fId = `FDB-${Math.floor(950 + Math.random() * 50)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const rec: FeedbackMessage = {
      id: fId,
      date: todayStr,
      status: "Unresolved",
      ...newF
    };
    setFeedbacks(prev => [rec, ...prev]);
  };

  // Handler: Modify feedback complaint case status
  const handleModifyFeedbackStatus = (fId: string, status: "Unresolved" | "In Progress" | "Resolved") => {
    setFeedbacks(prev => prev.map(f => {
      if (f.id === fId) {
        return { ...f, status };
      }
      return f;
    }));
  };

  // Help calculate financials for accounts ledger integration
  const totalInvoicedSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Dynamic Navigation definitions
  const sidebarItems = [
    { id: "overview", label: "Business Hub", icon: Compass, subText: "Vision & Org Structure" },
    { id: "procurement", label: "Procurement", icon: Milk, subText: "Collect Farm Milk" },
    { id: "production", label: "Production", icon: Layers, subText: "Pasteurize & Product Line" },
    { id: "sales", label: "Sales & Marketing", icon: Megaphone, subText: "Accounts & Ad Campaigns" },
    { id: "store", label: "Online Store Front", icon: ShoppingCart, subText: "Place Mock Orders" },
    { id: "finance", label: "Finance & Accounts", icon: Coins, subText: "Income Ledgers & Payroll" },
    { id: "logistics", label: "Cold Logistics", icon: Truck, subText: "Vehicles & Dispatches" },
    { id: "customerService", label: "Customer Desk", icon: MessageSquare, subText: "Reviews & Feedback CRM" }
  ];

  const handleResetData = () => {
    if (confirm("Reset operations database to default anchor levels? Clear all session transactions.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-stone-800 flex flex-col md:flex-row antialiased select-none font-sans">
      {/* 1. Left Corporate Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-amber-950 text-white flex flex-col justify-between p-5 md:fixed md:h-full border-r border-amber-900 shadow-md md:z-10 z-0">
        <div className="space-y-6">
          {/* Company branding header block */}
          <div className="flex items-center gap-3 pb-4 border-b border-amber-900/60">
            <div className="p-2.5 bg-amber-50 text-amber-950 rounded-xl shadow-inner font-extrabold flex items-center justify-center">
              <Milk className="w-5 h-5 text-amber-900 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-amber-100">Amrit Dairy</h2>
              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Governance Portal</p>
            </div>
          </div>

          {/* Navigation links array */}
          <nav className="space-y-1">
            {sidebarItems.map(item => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-2.5 px-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer font-sans select-none group ${
                    isActive 
                      ? "bg-amber-900 text-amber-50 font-bold border-l-4 border-l-amber-400 pl-4" 
                      : "text-amber-250 hover:bg-amber-900/30 text-stone-300 hover:text-white"
                  }`}
                >
                  <IconComponent className={`w-4.5 h-4.5 group-hover:scale-110 transition-transform ${isActive ? "text-amber-400" : "text-amber-300/60"}`} />
                  <div>
                    <p className="text-[12.5px] tracking-wide leading-tight">{item.label}</p>
                    <p className="text-[9.5px] opacity-70 font-mono tracking-tight">{item.subText}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footers controls: active indicators & resets */}
        <div className="pt-4 border-t border-amber-900/65 mt-6 space-y-3 font-sans">
          <div className="p-3 bg-amber-900/20 border border-amber-900/30 rounded-xl space-y-1.5">
            <div className="flex justify-between text-[11px] text-stone-300">
              <span>Silo Raw Storage:</span>
              <span className="font-mono font-bold text-amber-300">{rawMilkLiters.toFixed(0)} L</span>
            </div>
            <div className="flex justify-between text-[11px] text-stone-300">
              <span>Receivables:</span>
              <span className="font-mono font-bold text-amber-300">₹{totalInvoicedSales.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleResetData}
            title="Reset system simulated database"
            className="w-full text-center py-1.5 bg-amber-900/40 hover:bg-red-900/20 hover:text-red-300 text-stone-400 border border-transparent hover:border-red-900/30 text-[10.5px] font-bold rounded-lg cursor-pointer transition-all"
          >
            ↺ Reinitialize System Memory
          </button>
        </div>
      </aside>

      {/* 2. Main Content Portal Canvas */}
      <main className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Upper mini Header status bar */}
        <header className="bg-white border-b border-stone-200/60 p-4 px-6 md:px-8 mt-0 w-full flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-stone-500 font-medium">
            <span className="text-xs font-semibold text-stone-400">AMRIT DAIRY GROUP</span>
            <span className="text-xs text-stone-300">/</span>
            <span className="text-xs font-bold text-amber-900 uppercase font-mono tracking-wider">
              {activeTab === "customerService" ? "Customer Help Desk" : activeTab}
            </span>
          </div>

          {/* Environmental telemetry tags */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 font-mono text-[11px] bg-sky-50 text-sky-800 p-1 px-2.5 rounded-full border border-sky-200">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span> Cold Logistics: STABLE
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] bg-emerald-50 text-emerald-800 p-1 px-2.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> FSSAI Compliance Checklist Signed
            </span>
          </div>
        </header>

        {/* Dynamic Inner Tab routing blocks */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeTab === "overview" && (
            <OverviewTab 
              farmers={farmers} 
              productStocks={productStocks} 
              totalSales={totalInvoicedSales} 
              onNavigate={(tabId) => setActiveTab(tabId)} 
            />
          )}

          {activeTab === "procurement" && (
            <ProcurementTab 
              farmers={farmers} 
              collections={collections} 
              onAddCollection={handleAddCollection} 
              onAddFarmer={handleAddFarmer} 
            />
          )}

          {activeTab === "production" && (
            <ProductionTab 
              rawMilkLiters={rawMilkLiters} 
              productStocks={productStocks} 
              batches={batches} 
              onProduceBatch={handleProduceBatch} 
            />
          )}

          {activeTab === "sales" && (
            <SalesMarketingTab 
              retailers={retailers} 
              campaigns={campaigns} 
              orders={orders} 
              onAddCampaign={handleAddCampaign} 
              onAddRetailer={handleAddRetailer} 
            />
          )}

          {activeTab === "store" && (
            <StoreEmulator 
              productStocks={productStocks} 
              retailers={retailers} 
              onPlaceOrder={handlePlaceOrder} 
            />
          )}

          {activeTab === "finance" && (
            <AccountsTab 
              collections={collections} 
              orders={orders} 
              campaigns={campaigns} 
            />
          )}

          {activeTab === "logistics" && (
            <LogisticsTab 
              fleet={fleet} 
              pendingOrders={orders.filter(o => o.deliveryStatus === "Pending Dispatch")} 
              onDispatchTruck={handleDispatchTruck} 
              onModifyTruckTemp={handleModifyTruckTemp} 
            />
          )}

          {activeTab === "customerService" && (
            <CustomerServiceTab 
              feedbacks={feedbacks} 
              onAddFeedback={handleAddFeedback} 
              onModifyFeedbackStatus={handleModifyFeedbackStatus} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
