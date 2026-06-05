/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Truck, 
  Thermometer, 
  Navigation, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle, 
  Plus, 
  Play, 
  Clock 
} from "lucide-react";
import { DeliveryTruck, SalesOrder } from "../types";

interface LogisticsTabProps {
  fleet: DeliveryTruck[];
  pendingOrders: SalesOrder[];
  onDispatchTruck: (truckId: string, orderId: string, route: string) => void;
  onModifyTruckTemp: (truckId: string, temp: number) => void;
}

export default function LogisticsTab({ fleet, pendingOrders, onDispatchTruck, onModifyTruckTemp }: LogisticsTabProps) {
  // Local Dispatch Selection state
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [transitRoute, setTransitRoute] = useState("");

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTruckId || !selectedOrderId) return;

    const ord = pendingOrders.find(o => o.id === selectedOrderId);
    if (!ord) return;

    const routeLabel = transitRoute || `Plant -> ${ord.customerName} (${ord.customerType})`;
    onDispatchTruck(selectedTruckId, selectedOrderId, routeLabel);

    // Reset controls
    setSelectedTruckId("");
    setSelectedOrderId("");
    setTransitRoute("");
    alert(`Truck dispatched successfully! Delivering order ${ord.id} to ${ord.customerName}.`);
  };

  const handleTempAdjust = (truckId: string, delta: number) => {
    const truck = fleet.find(t => t.id === truckId);
    if (!truck) return;
    const nextTemp = Number((truck.tempCelsius + delta).toFixed(1));
    
    // Bounds check
    if (nextTemp < -25 || nextTemp > 10) return;
    onModifyTruckTemp(truckId, nextTemp);
  };

  const activeDeliveriesCount = fleet.filter(t => t.status === "Out for Delivery").length;
  const maintenanceCount = fleet.filter(t => t.status === "Maintenance").length;

  return (
    <div className="space-y-6 animate-fade-in text-sans">
      {/* Cold Chain metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cold Storage Warehouse Silo */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400">Warehouse Storage</span>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5">
              <Thermometer className="w-5 h-5 text-sky-600" /> Walk-In Freezer Block B
            </h3>
            <p className="text-xs text-stone-500 mt-1">Primary inventory chamber storing wholesale butter bricks and curd packets.</p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-400">Chamber Ambient Temp</p>
              <h4 className="text-2xl font-mono font-black text-sky-850 text-sky-800">-8.4°C</h4>
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> COMPLIANT
            </div>
          </div>
        </div>

        {/* Cold Chain Compliance metrics card */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400">HACCP Inspection</span>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5 animate-pulse">
              <Thermometer className="w-5 h-5 text-emerald-600" /> Frozen Logistics Compliance
            </h3>
            <p className="text-xs text-stone-500 mt-1">Regulatory bounds (fresh milk must transit under 4.0 °C to impede bacterial activation).</p>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-semibold">
            <span className="text-stone-500">Insulated Truck Bounds:</span>
            <span className="font-mono text-stone-800">1.0°C to 5.0°C (Sweet Spot)</span>
          </div>
        </div>

        {/* Dispatch Fleet statistics indicator block */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400">Fleet Overview</span>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5">
              <Truck className="w-5 h-5 text-amber-800" /> Insulated Milk Tanker Stats
            </h3>
            <p className="text-xs text-stone-500 mt-1">Monitoring dynamic GPS status and route load weights.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="p-2 bg-stone-50 rounded-lg">
              <p className="text-[10px] text-stone-400">Total reefers</p>
              <p className="text-md font-bold text-stone-850 font-mono">{fleet.length}</p>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-950 rounded-lg">
              <p className="text-[10px] text-emerald-650">In Transit</p>
              <p className="text-md font-bold font-mono">{activeDeliveriesCount}</p>
            </div>
            <div className="p-2 bg-amber-50 text-amber-955 rounded-lg">
              <p className="text-[10px] text-amber-600">Servicing</p>
              <p className="text-md font-bold font-mono">{maintenanceCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet dispatch interactive portal */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[9px] font-bold uppercase tracking-wider">
              Transit Planner Interface
            </span>
            <h3 className="text-base font-bold text-amber-1000 text-amber-950 flex items-center gap-1.5">
              <Play className="w-4.5 h-4.5 text-amber-700" /> Dispatch Delivery Vehicle
            </h3>
            <p className="text-xs text-stone-500">Route warehouse-loaded packaged goods toward active commercial clients.</p>
          </div>

          {pendingOrders.length === 0 ? (
            <div className="p-4 bg-stone-50 rounded-lg text-center text-xs text-stone-500 py-6">
              No outstanding pending store orders. Go to the <strong>Customer Store Front</strong> emulator to place mock transactions and populate pending deliveries!
            </div>
          ) : (
            <form onSubmit={handleDispatch} className="space-y-4">
              {/* Select order log */}
              <div className="space-y-1 text-xs">
                <label className="block font-semibold text-stone-600 pb-0.5">1. Trace Pending Order</label>
                <select
                  value={selectedOrderId}
                  onChange={e => setSelectedOrderId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 rounded-lg border focus:bg-white border-stone-200 outline-hidden font-medium"
                  required
                >
                  <option value="">-- Choose outstanding order --</option>
                  {pendingOrders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.id}: {o.customerName} (₹{o.totalAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select available truck */}
              <div className="space-y-1 text-xs">
                <label className="block font-semibold text-stone-600 pb-0.5">2. Appoint Available Truck</label>
                <select
                  value={selectedTruckId}
                  onChange={e => setSelectedTruckId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 rounded-lg border focus:bg-white border-stone-200 outline-hidden font-medium"
                  required
                >
                  <option value="">-- Choose free reefer vehicle --</option>
                  {fleet.filter(t => t.status === "Available").map(t => (
                    <option key={t.id} value={t.id}>
                      {t.id} - {t.driverName} ({t.truckNo})
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom destination route description */}
              <div className="space-y-1 text-xs">
                <label className="block font-semibold text-stone-600 pb-0.5">3. Delivery Route Tag (Optional)</label>
                <input 
                  type="text" 
                  value={transitRoute}
                  onChange={e => setTransitRoute(e.target.value)}
                  placeholder="e.g., Highway Route 1 -> St. Mary School"
                  className="w-full text-xs p-2.5 bg-stone-50 rounded-lg border focus:bg-white border-stone-200 outline-hidden font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedOrderId || !selectedTruckId}
                className="w-full py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center"
              >
                Sign Waybill & Dispatch Reefer
              </button>
            </form>
          )}
        </div>

        {/* Real-time Fleet Vehicles Table status logs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-4 mb-2 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-amber-950">Active Insulated Transit Fleet</h3>
              <p className="text-xs text-stone-500">Real-time telemetry reports reflecting chiller chamber temperatures, driver assignments, and routes.</p>
            </div>
          </div>

          <div className="space-y-3">
            {fleet.map(vehicle => {
              const isCoolerOk = vehicle.tempCelsius <= 5.0 && vehicle.tempCelsius >= -5.0;
              const isDeepFreeze = vehicle.tempCelsius < -5.0;
              const isChamberHot = vehicle.tempCelsius > 5.0;

              return (
                <div key={vehicle.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Left segment */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${
                      vehicle.status === "Out for Delivery" ? "bg-amber-900 text-amber-50" :
                      vehicle.status === "Maintenance" ? "bg-red-50 text-red-700 border border-red-200" :
                      "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-850 text-stone-800">{vehicle.driverName}</h4>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white text-stone-500 border border-stone-150 border-stone-200">{vehicle.truckNo}</span>
                      </div>
                      <p className="text-xs mt-1 text-stone-500 font-sans flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" /> Route: <strong className="text-stone-700">{vehicle.route}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Temperature adjustment controls right */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-transparent pt-3 md:pt-0 border-stone-200 flex-wrap">
                    
                    {/* Temperature sensor badge */}
                    <div className="text-right">
                      <p className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">Insulation Reading</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-sm font-mono font-bold ${
                          isChamberHot ? "text-red-650 font-extrabold text-red-600" :
                          isDeepFreeze ? "text-blue-600" : "text-emerald-700 font-bold"
                        }`}>{vehicle.tempCelsius}°C</span>

                        <span className={`px-1.5 py-0.5 text-[8.5px] font-bold rounded ${
                          isChamberHot ? "bg-red-50 text-red-600 border border-red-250 animate-pulse" :
                          isDeepFreeze ? "bg-blue-50 text-blue-800 border border-blue-200" :
                          "bg-emerald-50 text-emerald-800"
                        }`}>
                          {isChamberHot ? "WARNING HOT" : isDeepFreeze ? "DEEP FREEZE" : "STABLE"}
                        </span>
                      </div>
                    </div>

                    {/* Quick Thermostat modifiers */}
                    {vehicle.status !== "Maintenance" && (
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-stone-400 font-mono pb-1">Thermostat Adj</span>
                        <div className="flex items-center border rounded bg-white overflow-hidden text-xs font-semibold">
                          <button
                            onClick={() => handleTempAdjust(vehicle.id, -0.5)}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-700 font-bold cursor-pointer transition-colors"
                            title="Decrease cold storage chamber temperature"
                          >
                            -0.5°
                          </button>
                          <span className="px-1.5 font-mono text-[10px] text-stone-500 bg-stone-50">{vehicle.id}</span>
                          <button
                            onClick={() => handleTempAdjust(vehicle.id, 0.5)}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-700 font-bold cursor-pointer transition-colors"
                            title="Increase temperature"
                          >
                            +0.5°
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Dispatch operational status tag */}
                    <div className="text-right">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-bold inline-block border ${
                        vehicle.status === "Out for Delivery" ? "bg-amber-100 text-amber-800 border-amber-250 font-semibold" :
                        vehicle.status === "Maintenance" ? "bg-red-50 text-red-8D0 border-red-200" :
                        "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
