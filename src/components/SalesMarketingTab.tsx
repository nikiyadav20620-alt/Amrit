/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend, 
  LineChart, 
  Line 
} from "recharts";
import { 
  Building2, 
  Flame, 
  TrendingUp, 
  Megaphone, 
  Handshake, 
  ShoppingBag, 
  Plus, 
  DollarSign, 
  Sparkles, 
  Tag 
} from "lucide-react";
import { Retailer, MarketingCampaign, SalesOrder } from "../types";

interface SalesMarketingTabProps {
  retailers: Retailer[];
  campaigns: MarketingCampaign[];
  orders: SalesOrder[];
  onAddCampaign: (campaign: Omit<MarketingCampaign, "id">) => void;
  onAddRetailer: (retailer: Omit<Retailer, "id" | "monthlyVolumeKg">) => void;
}

export default function SalesMarketingTab({ retailers, campaigns, orders, onAddCampaign, onAddRetailer }: SalesMarketingTabProps) {
  // Campaign Form State
  const [showCampForm, setShowCampForm] = useState(false);
  const [campName, setCampName] = useState("");
  const [campCost, setCampCost] = useState<number>(3000);
  const [campReach, setCampReach] = useState("");
  const [campImpact, setCampImpact] = useState<number>(1.2);

  // Retailer Partner Form State
  const [showRetForm, setShowRetForm] = useState(false);
  const [retName, setRetName] = useState("");
  const [retType, setRetType] = useState<"Restaurant" | "Café" | "Grocery Store" | "School">("Restaurant");
  const [retContact, setRetContact] = useState("");
  const [retAddress, setRetAddress] = useState("");

  const handleCampSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName) return;

    onAddCampaign({
      name: campName,
      cost: campCost,
      reach: campReach || "5,000 neighborhood households",
      status: "Active",
      impactFactor: campImpact
    });

    setCampName("");
    setCampCost(3000);
    setCampReach("");
    setCampImpact(1.2);
    setShowCampForm(false);
  };

  const handleRetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retName) return;

    onAddRetailer({
      name: retName,
      type: retType,
      contact: retContact,
      address: retAddress
    });

    setRetName("");
    setRetContact("");
    setRetAddress("");
    setShowRetForm(false);
  };

  // Compile monthly bar chart metrics based on historical mock data + currently compiled live orders
  const chartData = [
    { name: "Jan", Sales: 85000, Procurement: 55000 },
    { name: "Feb", Sales: 92000, Procurement: 61000 },
    { name: "Mar", Sales: 104000, Procurement: 68000 },
    { name: "Apr", Sales: 112000, Procurement: 72000 },
    { name: "May", Sales: 125000, Procurement: 78000 },
    { name: "Jun (Est)", Sales: 138000 + orders.reduce((sum, o) => sum + o.totalAmount, 0), Procurement: 84000 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Visual Analytics Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-4 mb-2 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-amber-955 text-amber-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-800" /> Revenue & Cost Projections
              </h3>
              <p className="text-xs text-stone-500">Comparing bulk farm milk purchases vs pasteurized product revenues (monthly).</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-805 bg-amber-900 border"></span> Sales</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-150-300 bg-amber-300"></span> Procurement Cost</span>
            </div>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ffd8a8", fontSize: "12px" }}
                  formatter={(value: any) => [`₹${value.toLocaleString()}`]}
                />
                <Bar dataKey="Sales" fill="#78350f" radius={[4, 4, 0, 0]} barSize={35} />
                <Bar dataKey="Procurement" fill="#fcd34d" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Marketing Active Campaigns */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5">
                <Megaphone className="w-5 h-5 text-amber-800" /> Active Marketing
              </h3>
              <p className="text-xs text-stone-500">Propagates the Amrit Dairy purity slogan.</p>
            </div>
            <button
              onClick={() => { setShowCampForm(!showCampForm); setShowRetForm(false); }}
              className="p-1 px-2.5 hover:bg-stone-50 text-stone-800 text-[11px] border border-stone-200 hover:border-amber-900 rounded-lg cursor-pointer transition-colors font-bold"
            >
              + Launch
            </button>
          </div>

          {showCampForm && (
            <form onSubmit={handleCampSubmit} className="p-3.5 bg-amber-50/50 border border-amber-155-100 rounded-lg space-y-3 font-sans animate-fade-in text-xs">
              <p className="font-bold text-amber-900 uppercase text-[10px]">Prepare Ad Campaign</p>
              <div>
                <label className="block text-[10px] text-stone-500 font-semibold pb-1">Campaign Title</label>
                <input 
                  type="text"
                  value={campName}
                  onChange={e => setCampName(e.target.value)}
                  placeholder="e.g. Free Paneer Cubes tasting booth"
                  className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-stone-500 font-semibold pb-1">Budget Cost (₹)</label>
                  <input 
                    type="number"
                    value={campCost}
                    onChange={e => setCampCost(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 font-semibold pb-1">Store Multiplier</label>
                  <select 
                    value={campImpact}
                    onChange={e => setCampImpact(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                  >
                    <option value={1.15}>+15% Order Rate</option>
                    <option value={1.30}>+30% Order Rate</option>
                    <option value={1.50}>+50% Booster</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 font-semibold pb-1">Estimated Reach</label>
                <input 
                  type="text"
                  value={campReach}
                  onChange={e => setCampReach(e.target.value)}
                  placeholder="e.g. 15,000 WhatsApp subscribers"
                  className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-1.5 bg-amber-900 hover:bg-amber-950 text-white rounded font-bold cursor-pointer text-xs"
              >
                Incorporate Campaign
              </button>
            </form>
          )}

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {campaigns.map(camp => (
              <div key={camp.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200/50 hover:bg-amber-50/10 transition-colors flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-full bg-white text-amber-800 shadow-xs">
                      <Tag className="w-3 h-3" />
                    </span>
                    <h4 className="text-xs font-bold text-stone-800">{camp.name}</h4>
                  </div>
                  <p className="text-[10px] text-stone-500 font-sans leading-tight">Reach: {camp.reach}</p>
                  <p className="text-[9.5px] font-mono text-stone-400 font-bold">Execution Cost: ₹{camp.cost.toLocaleString()}</p>
                </div>
                <div className="text-right flex flex-col items-end justify-between self-stretch">
                  <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${
                    camp.status === "Active" ? "bg-amber-100 text-amber-800 font-semibold" : "bg-stone-200 text-stone-700"
                  }`}>
                    {camp.status}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 mt-2">
                    {Math.round((camp.impactFactor - 1) * 100)}% Boost
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distributor and Retail Partners */}
      <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-amber-800 animate-pulse" /> Corporate Distributor Partnerships
            </h3>
            <p className="text-xs text-stone-500">Retail partners placing standing contracts for bulk Butter and Paneer.</p>
          </div>
          <button
            onClick={() => { setShowRetForm(!showRetForm); setShowCampForm(false); }}
            className="px-3.5 py-1.5 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          >
            + Onboard Retail Partner
          </button>
        </div>

        {showRetForm && (
          <form onSubmit={handleRetSubmit} className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-3 font-sans max-w-2xl animate-fade-in text-xs">
            <p className="font-bold text-amber-900 uppercase text-[11px]">Partner Agreement Contract</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-stone-500 font-semibold pb-1">Corporate Client Name</label>
                <input 
                  type="text"
                  value={retName}
                  onChange={e => setRetName(e.target.value)}
                  placeholder="e.g. Apex Convent School"
                  className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 font-semibold pb-1">Client Segment</label>
                <select 
                  value={retType}
                  onChange={e => setRetType(e.target.value as any)}
                  className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                >
                  <option value="Restaurant">Restaurant/Hotel</option>
                  <option value="Café">Cozy Café</option>
                  <option value="Grocery Store">Supermarket/Store</option>
                  <option value="School">Academy/Institution</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 font-semibold pb-1">Primary Contacts</label>
                <input 
                  type="text"
                  value={retContact}
                  onChange={e => setRetContact(e.target.value)}
                  placeholder="Name and Phone number"
                  className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-stone-500 font-semibold pb-1">Delivery Address</label>
              <input 
                type="text"
                value={retAddress}
                onChange={e => setRetAddress(e.target.value)}
                placeholder="Sector or Street detail"
                className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setShowRetForm(false)}
                className="px-3.5 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-lg cursor-pointer"
              >
                Sign Contract
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {retailers.map(ret => (
            <div key={ret.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200/50 hover:bg-amber-50/5 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-white text-[10px] border font-bold text-stone-700 shadow-xs rounded">
                    {ret.type}
                  </span>
                  <span className="font-mono text-[9px] text-stone-400 font-bold">Contract {ret.id}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-800 pt-1 leading-tight">{ret.name}</h4>
                <p className="text-[10.5px] text-stone-500 leading-snug">{ret.address}</p>
                <p className="text-[10px] text-stone-400 italic">Contact: {ret.contact}</p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-200/50 flex justify-between items-center">
                <span className="text-[10px] font-medium text-stone-500">Standing Order:</span>
                <span className="text-xs font-bold text-amber-950 font-mono">~{ret.monthlyVolumeKg} Kg/Mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
