/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Milk, 
  MapPin, 
  Plus, 
  UserPlus, 
  Search, 
  Star, 
  TrendingUp, 
  Calculator, 
  History, 
  Coins 
} from "lucide-react";
import { Farmer, CollectionLog } from "../types";

interface ProcurementTabProps {
  farmers: Farmer[];
  collections: CollectionLog[];
  onAddCollection: (log: Omit<CollectionLog, "id" | "date">) => void;
  onAddFarmer: (farmer: Omit<Farmer, "id" | "totalSuppliedLitres">) => void;
}

export default function ProcurementTab({ farmers, collections, onAddCollection, onAddFarmer }: ProcurementTabProps) {
  // Collection Form State
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>("");
  const [quantityLiters, setQuantityLiters] = useState<number>(50);
  const [fatPercentage, setFatPercentage] = useState<number>(4.2);
  const [snfPercentage, setSnfPercentage] = useState<number>(8.5);

  // Farmer Form State
  const [showFarmerForm, setShowFarmerForm] = useState(false);
  const [newFarmerName, setNewFarmerName] = useState("");
  const [newFarmerLoc, setNewFarmerLoc] = useState("");
  const [newFarmerPhone, setNewFarmerPhone] = useState("");
  const [newFarmerRating, setNewFarmerRating] = useState(5);

  // Filter/Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic Pricing math based on Fat and SNF
  // Pricing Formula: (Fat * 5.20) + (SNF * 3.10) => Standard Indian cooperative pricing index
  const pricePerLiter = Number(((fatPercentage * 5.20) + (snfPercentage * 3.15)).toFixed(2));
  const estimatedTotalCost = Number((quantityLiters * pricePerLiter).toFixed(2));

  // Determine Grade
  let computedGrade: "A" | "B" | "C" = "B";
  if (fatPercentage >= 4.5 && snfPercentage >= 8.5) {
    computedGrade = "A";
  } else if (fatPercentage < 3.8 || snfPercentage < 8.0) {
    computedGrade = "C";
  }

  const handleCollectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmerId) return;

    const farmer = farmers.find(f => f.id === selectedFarmerId);
    if (!farmer) return;

    onAddCollection({
      farmerName: farmer.name,
      quantityLiters,
      fatPercentage,
      snfPercentage,
      pricePerLiter,
      totalCost: estimatedTotalCost,
      qualityGrade: computedGrade
    });

    // Reset Form
    setQuantityLiters(50);
    setFatPercentage(4.2);
    setSnfPercentage(8.5);
  };

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmerName) return;

    onAddFarmer({
      name: newFarmerName,
      location: newFarmerLoc || "Kishanpur Village",
      phone: newFarmerPhone || "+91 99999 11111",
      qualityRating: newFarmerRating
    });

    // Reset Form
    setNewFarmerName("");
    setNewFarmerLoc("");
    setNewFarmerPhone("");
    setNewFarmerRating(5);
    setShowFarmerForm(false);
  };

  // Filter farmers
  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalLitersCollected = collections.reduce((acc, curr) => acc + curr.quantityLiters, 0);
  const totalSpend = collections.reduce((acc, curr) => acc + curr.totalCost, 0);
  const avgFat = collections.length 
    ? (collections.reduce((acc, curr) => acc + curr.fatPercentage, 0) / collections.length).toFixed(2)
    : "0.0";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-800 rounded-lg">
            <Milk className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Liters Collected Today</p>
            <h4 className="text-xl font-bold font-mono text-stone-800">{totalLitersCollected.toFixed(1)} L</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Total Procurement Payout</p>
            <h4 className="text-xl font-bold font-mono text-stone-800">₹{totalSpend.toLocaleString()}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-800 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Avg Fat Concentration</p>
            <h4 className="text-xl font-bold font-mono text-stone-800">{avgFat}% <span className="text-xs font-normal text-stone-500">SNF 8.4%</span></h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-800 rounded-lg">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Registered Suppliers</p>
            <h4 className="text-xl font-bold font-mono text-stone-800">{farmers.length} Farmers</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Logs and registration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Cooperatives Farmer Directory */}
          <div className="bg-white rounded-xl border border-amber-100/50 p-5 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                  Supplier Farmer Network
                </h3>
                <p className="text-xs text-stone-500">List of smallholders supplying pasteurization grade milk.</p>
              </div>
              <button 
                onClick={() => setShowFarmerForm(!showFarmerForm)}
                className="px-3 py-1.5 bg-amber-950 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Onboard Farmer
              </button>
            </div>

            {/* Farmer Registration Form */}
            {showFarmerForm && (
              <form onSubmit={handleFarmerSubmit} className="p-4 rounded-lg bg-amber-50/50 border border-amber-100 space-y-3 animate-fade-in">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Register Rural Milk Farmer</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 pb-1">Farmer Name</label>
                    <input 
                      type="text" 
                      value={newFarmerName} 
                      onChange={e => setNewFarmerName(e.target.value)}
                      placeholder="e.g., Mohan Shrestha"
                      className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 pb-1">Village Location</label>
                    <input 
                      type="text" 
                      value={newFarmerLoc} 
                      onChange={e => setNewFarmerLoc(e.target.value)}
                      placeholder="e.g., Ramnagar Village"
                      className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-stone-500 pb-1">Mobile Contact No</label>
                    <input 
                      type="text" 
                      value={newFarmerPhone} 
                      onChange={e => setNewFarmerPhone(e.target.value)}
                      placeholder="e.g., +91 99887 76655"
                      className="w-full text-xs p-2 bg-white rounded border border-stone-200 outline-hidden font-medium"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowFarmerForm(false)}
                    className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-3 py-1.5 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Save & Register
                  </button>
                </div>
              </form>
            )}

            {/* Farmer filter bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search farmer name or village..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 bg-stone-50 focus:bg-white rounded-lg border border-stone-200 outline-hidden font-medium"
              />
            </div>

            {/* Farmer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredFarmers.map(farmer => (
                <div key={farmer.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-stone-800">{farmer.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100/50 text-amber-950 font-semibold font-mono">{farmer.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {farmer.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-150-50">
                    <span className="text-[11px] font-mono text-stone-600">Supplied: <strong>{farmer.totalSuppliedLitres}L</strong></span>
                    <div className="flex text-amber-500">
                      {[...Array(farmer.qualityRating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Logs History */}
          <div className="bg-white rounded-xl border border-amber-100/50 p-5 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <History className="w-4.5 h-4.5 text-amber-700" /> Recent Collection Logs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                    <th className="p-2 table-cell">ID</th>
                    <th className="p-2 table-cell">Date</th>
                    <th className="p-2 table-cell">Farmer Name</th>
                    <th className="p-2 table-cell text-right">Liters</th>
                    <th className="p-2 table-cell text-center">FAT% / SNF%</th>
                    <th className="p-2 table-cell text-right">Rate/L</th>
                    <th className="p-2 table-cell text-right">Total Payout</th>
                    <th className="p-2 table-cell text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {collections.map(log => (
                    <tr key={log.id} className="hover:bg-amber-50/10">
                      <td className="p-2 font-mono text-stone-500 font-semibold">{log.id}</td>
                      <td className="p-2 text-stone-650">{log.date}</td>
                      <td className="p-2 font-semibold text-stone-800">{log.farmerName}</td>
                      <td className="p-2 text-right font-mono font-semibold">{log.quantityLiters} L</td>
                      <td className="p-2 text-center font-mono text-stone-650">{log.fatPercentage}% / {log.snfPercentage}%</td>
                      <td className="p-2 text-right font-mono">₹{log.pricePerLiter.toFixed(2)}</td>
                      <td className="p-2 text-right font-mono font-bold text-emerald-700">₹{log.totalCost.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.qualityGrade === "A" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          log.qualityGrade === "B" ? "bg-sky-50 text-sky-800 border border-sky-200" :
                          "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}>
                          Grade {log.qualityGrade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Milk Weighing & FAT Calculator Form */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <Calculator className="w-4.5 h-4.5 text-amber-700 font-bold" /> Digital Weighing Scales
            </h3>
            <p className="text-xs text-stone-500">Record a real milk bucket collection here. The system assesses fat & solids to derive a fair payout.</p>
          </div>

          <form onSubmit={handleCollectSubmit} className="space-y-4 pt-1">
            {/* Farmer Select */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-stone-600">Selecting Farmer</label>
              <select 
                value={selectedFarmerId}
                onChange={e => setSelectedFarmerId(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 rounded-lg border border-stone-200 focus:bg-white outline-hidden font-medium"
                required
              >
                <option value="">-- Choose registered farmer --</option>
                {farmers.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                ))}
              </select>
            </div>

            {/* Litre Qty Weight */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-stone-600">Raw Milk Volume</label>
                <span className="text-xs font-mono font-bold text-amber-900">{quantityLiters} L</span>
              </div>
              <input 
                type="range"
                min="5"
                max="300"
                step="5"
                value={quantityLiters}
                onChange={e => setQuantityLiters(Number(e.target.value))}
                className="w-full accent-amber-900 cursor-pointer h-1 bg-stone-100 rounded-lg"
              />
            </div>

            {/* Fat level */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-stone-600">Fat Percentage (%)</label>
                <span className="text-xs font-mono font-bold text-amber-900">{fatPercentage.toFixed(1)}%</span>
              </div>
              <input 
                type="range"
                min="3.0"
                max="6.5"
                step="0.1"
                value={fatPercentage}
                onChange={e => setFatPercentage(Number(e.target.value))}
                className="w-full accent-amber-900 cursor-pointer h-1 bg-stone-100 rounded-lg"
              />
            </div>

            {/* SNF solids */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-stone-600">Solid Not Fat (%)</label>
                <span className="text-xs font-mono font-bold text-amber-900">{snfPercentage.toFixed(1)}%</span>
              </div>
              <input 
                type="range"
                min="7.5"
                max="9.5"
                step="0.1"
                value={snfPercentage}
                onChange={e => setSnfPercentage(Number(e.target.value))}
                className="w-full accent-amber-900 cursor-pointer h-1 bg-stone-100 rounded-lg"
              />
            </div>

            {/* Price Preview section */}
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-250-100 text-xs space-y-1.5 font-sans">
              <div className="flex justify-between border-b border-dashed border-stone-250-200 pb-1.5">
                <span className="text-stone-500 font-medium">Calculated Rate:</span>
                <span className="font-mono font-bold text-stone-850">₹{pricePerLiter.toFixed(2)} / Litre</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-stone-700">Estimated Compensation:</span>
                <span className="font-mono text-emerald-800">₹{estimatedTotalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>Calculated Milk Grade:</span>
                <span className="font-semibold text-amber-800">Quality {computedGrade}</span>
              </div>
            </div>

            {/* Weighing sensor submit */}
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Milk className="w-4 h-4" /> Save Collection Weigh
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
