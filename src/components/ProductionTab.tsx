/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  Package, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle, 
  Layers 
} from "lucide-react";
import { ProductStock, ProductionBatch } from "../types";

interface ProductionTabProps {
  rawMilkLiters: number;
  productStocks: ProductStock[];
  batches: ProductionBatch[];
  onProduceBatch: (newBatch: Omit<ProductionBatch, "id" | "date">) => boolean;
}

export default function ProductionTab({ rawMilkLiters, productStocks, batches, onProduceBatch }: ProductionTabProps) {
  // Pasteurizer simulation state
  const [pasteurizing, setPasteurizing] = useState(false);
  const [stage, setStage] = useState<"idle" | "heating" | "holding" | "cooling" | "completed">("idle");
  const [temp, setTemp] = useState(4.0);
  const [cycleProgress, setCycleProgress] = useState(0);

  // Batch Form State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qtyToMake, setQtyToMake] = useState<number>(20);
  const [operator, setOperator] = useState<string>("Anil Kumar (Supervisor)");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Calculate Milk consumption multipliers for Indian Dairy yields
  const getMilkDemanded = (productId: string, qty: number): number => {
    switch (productId) {
      case "P-MILK": return qty * 1;      // 1 L fresh milk needs 1 L raw milk
      case "P-CURD": return qty * 1;      // 1 pack yoghurt (500g) needs 1 L raw milk
      case "P-GHEE": return qty * 20;     // 1 tin ghee (1L) needs 20 L raw milk
      case "P-PANEER": return qty * 2;    // 1 brick paneer (200g) needs 2 L raw milk
      case "P-BUTTER": return qty * 10;   // 1 pack table butter (500g) needs 10 L raw milk
      case "P-LASSI": return qty * 0.5;   // 1 bottle lassi (250ml) needs 0.5 L raw milk
      default: return 0;
    }
  };

  const selectedProduct = productStocks.find(p => p.id === selectedProductId);
  const demandedMilk = selectedProductId ? getMilkDemanded(selectedProductId, qtyToMake) : 0;

  // Pasteurizer temperature simulation tick
  useEffect(() => {
    let interval: any;
    if (pasteurizing) {
      interval = setInterval(() => {
        setCycleProgress(prev => {
          const next = prev + 1.5;
          if (next >= 100) {
            setPasteurizing(false);
            setStage("completed");
            setTemp(3.6);
            return 100;
          }

          // Cycle state sequence mathematically aligned to 100%
          if (next < 35) {
            setStage("heating");
            // Warm up from 4.0 °C to 72.0 °C
            setTemp(parseFloat((4.0 + (next / 35) * 68).toFixed(1)));
          } else if (next >= 35 && next < 70) {
            setStage("holding");
            // Hold steady pasteurization plateau of 72.0 °C
            setTemp(72.2);
          } else {
            setStage("cooling");
            // Plunge temperature rapidly down below 4.0 °C
            const coolFrac = (next - 70) / 30;
            setTemp(parseFloat((72.2 - coolFrac * 68.6).toFixed(1)));
          }

          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [pasteurizing]);

  const handleStartPasteurize = () => {
    if (rawMilkLiters < 50) {
      alert("Insufficient raw milk in silos to initiate automated HTST pasteurization loop (Minimum 50L needed).");
      return;
    }
    setCycleProgress(0);
    setTemp(4.0);
    setStage("heating");
    setPasteurizing(true);
  };

  const handleResetPasteurize = () => {
    setPasteurizing(false);
    setStage("idle");
    setTemp(4.0);
    setCycleProgress(0);
  };

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!selectedProductId) return;

    if (demandedMilk > rawMilkLiters) {
      setErrorMsg(`Insufficient raw milk in storage. Silos contain ${rawMilkLiters.toFixed(1)}L, but this batch demands ${demandedMilk.toFixed(1)}L.`);
      return;
    }

    const created = onProduceBatch({
      productName: selectedProduct?.name || "",
      quantityProduced: qtyToMake,
      rawMilkConsumed: demandedMilk,
      qualityStatus: "Passed",
      operator
    });

    if (created) {
      setSuccessMsg(`Successfully processed and loaded ${qtyToMake} units of ${selectedProduct?.name}!`);
      setQtyToMake(20);
    } else {
      setErrorMsg("Failed to log production batch. Unknown state.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Silo Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Raw Milk Silo Card */}
        <div className="col-span-1 bg-white rounded-xl border border-amber-100/50 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Raw Input Silo A</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-bold font-mono text-stone-800">{rawMilkLiters.toFixed(1)}</h3>
              <span className="text-sm text-stone-500 font-bold">Liters</span>
            </div>
            <p className="text-xs text-stone-500 mt-2">Chilled storage level. Direct feedstock retrieved from local micro-farming hubs.</p>
          </div>

          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-stone-600">
              <span>Silo Storage Capacity Log:</span>
              <span>{(rawMilkLiters / 2000 * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-700 to-amber-900 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((rawMilkLiters / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>Reserve: Min 100L</span>
              <span>Max: 2,000L</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pasteurization Visualizer Loop */}
        <div className="md:col-span-2 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 rounded-xl p-6 text-white flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono leading-none tracking-wide flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-400" /> Co-Processor: Thermo-Link v4
              </span>
              <h3 className="text-lg font-bold text-amber-50 leading-tight">HTST Pasteurization Thermal Loop</h3>
            </div>
            
            {/* Real-time Temperature readout */}
            <div className="text-right">
              <p className="text-xs text-stone-400 font-mono">Sensor Temp</p>
              <p className={`text-2xl md:text-3xl font-mono font-bold tracking-tight transition-colors ${
                stage === "heating" ? "text-amber-400 animate-pulse" :
                stage === "holding" ? "text-red-400 font-extrabold" :
                stage === "cooling" ? "text-sky-400 animate-pulse" :
                stage === "completed" ? "text-emerald-400" : "text-stone-300"
              }`}>{temp.toFixed(1)}°C</p>
            </div>
          </div>

          {/* Interactive Steps of HTST Pasteurization (72°C for 15s) */}
          <div className="grid grid-cols-4 gap-2 pt-4 md:pt-2">
            <div className={`p-2.5 rounded-lg border text-center transition-all ${
              stage === "idle" ? "bg-white/10 border-white/20 text-white" : "opacity-30 border-transparent bg-transparent"
            }`}>
              <p className="text-[10px] font-mono font-bold uppercase">Phase 1</p>
              <p className="text-xs font-semibold mt-1">Chilled Feed</p>
              <p className="text-[9px] text-stone-400 mt-0.5 font-mono">4.0°C</p>
            </div>

            <div className={`p-2.5 rounded-lg border text-center transition-all ${
              stage === "heating" ? "bg-amber-600/20 border-amber-500 text-amber-300" : "opacity-30 border-transparent bg-transparent"
            }`}>
              <p className="text-[10px] font-mono font-bold uppercase">Phase 2</p>
              <p className="text-xs font-semibold mt-1">Heating</p>
              <p className="text-[9px] text-amber-400 mt-0.5 font-mono">Up to 72°C</p>
            </div>

            <div className={`p-2.5 rounded-lg border text-center transition-all ${
              stage === "holding" ? "bg-red-600/20 border-red-500 text-red-300" : "opacity-30 border-transparent bg-transparent"
            }`}>
              <p className="text-[10px] font-mono font-bold uppercase">Phase 3</p>
              <p className="text-xs font-semibold mt-1">Hold Board</p>
              <p className="text-[9px] text-red-400 mt-0.5 font-mono">15 Sec Hold</p>
            </div>

            <div className={`p-2.5 rounded-lg border text-center transition-all ${
              stage === "cooling" ? "bg-sky-600/20 border-sky-500 text-sky-300" :
              stage === "completed" ? "bg-emerald-600/20 border-emerald-500 text-emerald-300" : "opacity-30 border-transparent bg-transparent"
            }`}>
              <p className="text-[10px] font-mono font-bold uppercase">Phase 4</p>
              <p className="text-xs font-semibold mt-1">Rapid Cool</p>
              <p className="text-[9px] text-sky-400 mt-0.5 font-mono">Sub-4.0°C</p>
            </div>
          </div>

          {/* Trigger Control Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs font-mono text-stone-400 mb-1">
                <span>Cycle Progress:</span>
                <span>{cycleProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-350"
                  style={{ width: `${cycleProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              {stage === "completed" && (
                <button
                  onClick={handleResetPasteurize}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
              {pasteurizing ? (
                <button
                  onClick={() => setPasteurizing(false)}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" /> Pause Cycle
                </button>
              ) : (
                stage !== "completed" && (
                  <button
                    onClick={handleStartPasteurize}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" /> Dispatch Pasteurize Cycle
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Batch setup */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                <Package className="w-4.5 h-4.5 text-amber-700" /> Pack & Refine Production Line
              </h3>
              <p className="text-xs text-stone-500 mt-1">Transform liquid bulk raw milk in silos into individual high-value retail commodities.</p>
            </div>

            <form onSubmit={handleBatchSubmit} className="space-y-3 pt-1">
              {/* Product Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-600">Finished Product Target</label>
                <select
                  value={selectedProductId}
                  onChange={e => {
                    setSelectedProductId(e.target.value);
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="w-full text-xs p-2 bg-stone-50 rounded-lg border border-stone-200 outline-hidden font-medium"
                  required
                >
                  <option value="">-- Choose dairy product --</option>
                  {productStocks.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Unit: {p.unit})</option>
                  ))}
                </select>
              </div>

              {/* Litre Qty Weight */}
              {selectedProductId && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="text-xs font-semibold text-stone-600">Production Yield Quantity</label>
                    <span className="text-xs font-mono font-bold text-amber-900">{qtyToMake} {selectedProduct?.unit}s</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={qtyToMake}
                    onChange={e => setQtyToMake(Number(e.target.value))}
                    className="w-full accent-amber-900 cursor-pointer h-1 bg-stone-100 rounded-lg"
                  />
                  <p className="text-[10.5px] text-stone-500 font-mono italic">
                    Ratio: 1 {selectedProduct?.unit} demands {getMilkDemanded(selectedProductId, 1)}L raw milk.
                  </p>
                </div>
              )}

              {/* Operator */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-600">Supervising Operator</label>
                <input 
                  type="text"
                  value={operator}
                  onChange={e => setOperator(e.target.value)}
                  placeholder="Employee name"
                  className="w-full text-xs p-2 bg-stone-50 rounded focus:bg-white border border-stone-200 outline-hidden font-medium"
                  required
                />
              </div>

              {/* Alert Feedback Messaging */}
              {errorMsg && (
                <div className="p-3 bg-amber-50 text-amber-800 border-l-4 border-amber-500 text-xs rounded font-medium shadow-xs">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500 text-xs rounded font-medium shadow-xs">
                  {successMsg}
                </div>
              )}

              {selectedProductId && (
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/50 flex justify-between text-xs items-center">
                  <span className="text-stone-500 font-medium">Silo Silage Drawdown:</span>
                  <span className="font-mono font-bold text-amber-900">{demandedMilk.toFixed(1)} Liters of Milk</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Launch Yield Compounding & Packaging
              </button>
            </form>
          </div>
        </div>

        {/* Packing batch history logs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-amber-100/50 p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-amber-700" /> Historic Production Batches
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-2.5">Batch ID</th>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Output Product</th>
                    <th className="p-2.5 text-right">Yield Qty</th>
                    <th className="p-2.5 text-right">Raw Drawdown</th>
                    <th className="p-2.5 text-center">QC Status</th>
                    <th className="p-2.5">Supervised By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {batches.map(b => (
                    <tr key={b.id} className="hover:bg-amber-50/10 text-stone-750">
                      <td className="p-2.5 font-mono text-stone-500 font-extrabold">{b.id}</td>
                      <td className="p-2.5 text-[11px] text-stone-600">{b.date}</td>
                      <td className="p-2.5 font-bold text-stone-900">{b.productName}</td>
                      <td className="p-2.5 text-right font-mono font-bold">{b.quantityProduced} units</td>
                      <td className="p-2.5 text-right font-mono text-stone-650">{b.rawMilkConsumed} L</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          b.qualityStatus === "Passed" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          b.qualityStatus === "Flagged" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                          "bg-purple-50 text-purple-850 border border-purple-200"
                        }`}>
                          {b.qualityStatus}
                        </span>
                      </td>
                      <td className="p-2.5 text-stone-600 text-xs">{b.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
