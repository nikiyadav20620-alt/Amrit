/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Heart, 
  ArrowRight, 
  Milk, 
  Sparkles, 
  MapPin, 
  Target, 
  CheckCircle2, 
  Layers
} from "lucide-react";
import { ProductStock, Farmer } from "../types";

interface OverviewTabProps {
  farmers: Farmer[];
  productStocks: ProductStock[];
  totalSales: number;
  onNavigate: (tabId: string) => void;
}

export default function OverviewTab({ farmers, productStocks, totalSales, onNavigate }: OverviewTabProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>("Overview");

  // Detailed organizational department list
  const departments = [
    {
      id: "procurement",
      name: "Procurement Department",
      description: "Connects with local pastoral farmers to collect high-quality raw milk daily. Assures rigorous fat/SNF safety grading.",
      roles: ["Farmer Relationship Executive", "Milk Quality Inspector", "Chilling Center Supervisor"],
      metric: `${farmers.length} active registered farmers`,
      bg: "bg-amber-50 hover:bg-amber-100/80 border-amber-200"
    },
    {
      id: "production",
      name: "Production Department",
      description: "Operates clean-room pasteurization, fat separation, vacuum boiling, and automated packing of high-value dairy foods like paneer and ghee.",
      roles: ["Dairy Processing Engineer", "Quality Control Chemist", "Packaging Machine Operator"],
      metric: "State-of-the-Art Homogenizers",
      bg: "bg-blue-50 hover:bg-blue-100/80 border-blue-200"
    },
    {
      id: "sales",
      name: "Sales & Marketing Department",
      description: "Builds retail partners, handles modern trade relationships, boosts brand exposure, and leads neighborhood outreach programs.",
      roles: ["Corporate Key Accounts Manager", "Route Sales Representative", "Digital Brand Specialist"],
      metric: `₹${totalSales.toLocaleString()} processed pipeline`,
      bg: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200"
    },
    {
      id: "finance",
      name: "Finance & Accounts Department",
      description: "Drives accurate milk pricing payables, performs vendor auditing, calculates margins, and coordinates regulatory dairy taxation.",
      roles: ["Senior Cost Accountant", "Accounts Receivable Clerk", "Dairy Tax Consultant"],
      metric: "100% Tax Compliant Books",
      bg: "bg-purple-50 hover:bg-purple-100/80 border-purple-200"
    },
    {
      id: "logistics",
      name: "Distribution & Logistics",
      description: "Spearheads insulated milk tanker routing, cold storage temperature compliance, and automated distributor supply.",
      roles: ["Cold-Chain Dispatch Planner", "Reefer Vehicle Operator", "Warehouse Inventory Manager"],
      metric: "Active Insulated Fleet Monitoring",
      bg: "bg-sky-50 hover:bg-sky-100/80 border-sky-200"
    },
    {
      id: "customerService",
      name: "Customer Service Division",
      description: "Takes direct feedback via support lines, ensures prompt response to milk supply delays, and coordinates consumer loyalty initiatives.",
      roles: ["Customer Relations Lead", "Grievance Redressal Assistant", "Product Feedback Recorder"],
      metric: "Average 4.4★ Customer Rating",
      bg: "bg-rose-50 hover:bg-rose-100/80 border-rose-200"
    }
  ];

  const targetCustomers = [
    { title: "Households", desc: "Premium quality milk, curd, and lassi for daily morning delivery", icon: Heart, count: "500+ Homes" },
    { title: "Restaurants & Hotels", desc: "Wholesale packages of butter and paneer for gourmet chefs", icon: Building2, count: "25+ Outlets" },
    { title: "Cafés", desc: "Highly stable full-fat milk for espresso foaming and frothing", icon: Sparkles, count: "12+ Points" },
    { title: "Grocery Stores & Hypermarkets", desc: "Branded ghee tins and packaged paneer with cold shelf support", icon: TrendingUp, count: "40+ Vendors" },
    { title: "Schools & Institutions", desc: "Fortified milks and healthy low-sugar beverages for students", icon: Users, count: "8 Academies" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white p-8 md:p-12 shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-300/10 rounded-full blur-2xl -ml-20 -mb-20"></div>
        
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-amber-500/10">
            <Milk className="w-3.5 h-3.5" /> Estd. 2024
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-amber-50">
            Amrit Dairy <span className="font-light text-stone-300">Operations Portal</span>
          </h1>
          <p className="text-stone-200 text-base md:text-lg leading-relaxed max-w-2xl">
            Welcome to the centralized enterprise management environment. Here, we track our farm relationships, real-time milk pasteurization cycles, refrigerated fleet metrics, customer orders, and financial profit ledgers.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-amber-200">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 / h-4 text-emerald-400" /> State-of-the-art Cold Chain</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Supporting Rural Farmers</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Preservative-Free Quality</span>
          </div>
        </div>
      </div>

      {/* Grid: Vision & Quick Stocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Vision & Pitch */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-amber-100/50 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-50 rounded-lg text-amber-800">
                <Target className="w-5 h-5 animate-pulse" />
              </span>
              <h2 className="text-xl font-bold text-amber-900 tracking-tight">Our Mission & Corporate Vision</h2>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              At <strong className="text-stone-800">Amrit Dairy</strong>, we bridge the gap between dairy farmers and modern urban households. By paying fair competitive prices to our local micro-farmers dynamic with raw milk milk fat volume, we incentivize premium hygiene and animal husbandry.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our modern processing unit filters, pasteurizes, and packagings products in sterile pouches and containers. Every batch is certified with advanced SNF (Solid Not Fat) sensors to ensure zero adulteration, serving pure health to families.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-stone-50 rounded-xl">
              <p className="text-xs text-stone-500 font-medium">Daily Supply</p>
              <p className="text-lg md:text-xl font-bold text-amber-900">12,500 L</p>
            </div>
            <div className="text-center p-3 bg-stone-50 rounded-xl">
              <p className="text-xs text-stone-500 font-medium">Registered Farmers</p>
              <p className="text-lg md:text-xl font-bold text-amber-900">{farmers.length} Rural</p>
            </div>
            <div className="text-center p-3 bg-stone-50 rounded-xl">
              <p className="text-xs text-stone-500 font-medium">Products Offered</p>
              <p className="text-lg md:text-xl font-bold text-amber-900">{productStocks.length} Items</p>
            </div>
          </div>
        </div>

        {/* Quick Stock Levels Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-amber-100/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-amber-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-700" /> Packing & Stock Levels
            </h3>
            <button 
              onClick={() => onNavigate("production")}
              className="text-amber-800 hover:text-amber-950 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              Adjust <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3 pt-1">
            {productStocks.map((p) => {
              const perc = Math.min((p.stockLevel / (p.minStockThreshold * 5)) * 100, 100);
              const isLow = p.stockLevel <= p.minStockThreshold;
              return (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-stone-700">{p.name}</span>
                    <span className={`font-mono font-semibold ${isLow ? "text-amber-600" : "text-stone-600"}`}>
                      {p.stockLevel} {p.unit}s
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isLow ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} 
                      style={{ width: `${perc}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Organizational Structure (Block Map) */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-amber-100/50 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            Governance Flow
          </span>
          <h2 className="text-2xl font-bold text-amber-950 tracking-tight">Enterprise Org Structure</h2>
          <p className="text-stone-500 text-xs md:text-sm">
            Click on any organizational department block to review its real management, target roles, operational responsibilities, and key metrics.
          </p>
        </div>

        {/* Corporate Hierarchy tree visualizer */}
        <div className="relative pt-4 flex flex-col items-center">
          {/* Owner Box */}
          <div 
            onClick={() => setSelectedDept("Overview")}
            className={`cursor-pointer max-w-xs w-full text-center p-4 rounded-xl border transition-all shadow-xs duration-200 ${
              selectedDept === "Overview" 
                ? "bg-amber-950 text-white border-amber-950 ring-4 ring-amber-100" 
                : "bg-white text-stone-800 border-amber-200 hover:border-amber-400"
            }`}
          >
            <p className="text-[10px] uppercase font-mono tracking-wider opacity-80">Top Executive</p>
            <h4 className="text-base font-bold">Owner / Managing Director</h4>
            <p className="text-xs mt-1 font-medium opacity-90">Strategic & Financial Decisions</p>
          </div>

          {/* Connective Line */}
          <div className="w-0.5 h-6 bg-amber-200"></div>

          {/* Horizontal Branch Bar */}
          <div className="hidden md:block w-5/6 h-0.5 bg-amber-200"></div>

          {/* Under-Structure Multi-Division Array */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 mt-4 w-full md:pt-2">
            {departments.map((dept) => {
              const isActive = selectedDept === dept.id;
              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`pointer-events-auto cursor-pointer p-3 rounded-lg border text-center transition-all duration-200 flex flex-col justify-between ${dept.bg} ${
                    isActive ? "ring-3 ring-amber-800/20 border-amber-800 font-semibold" : ""
                  }`}
                >
                  <p className="text-xs font-bold leading-tight break-words text-stone-800">{dept.name}</p>
                  <p className="text-[10px] font-mono mt-2 text-stone-600 block">{dept.metric}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card based on selection */}
        <div className="mt-4 p-5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-4 transition-all duration-300">
          {selectedDept === "Overview" ? (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-amber-900">Office of the Managing Director</h4>
              <p className="text-stone-700 text-sm">
                The MD manages relations with government agencies, registers patent formulas, directs product expansion timelines, and oversees fiscal budgeting of the dairy plant.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100/60 text-amber-900 rounded-md">Policy Setter</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100/60 text-amber-900 rounded-md">Stakeholder Management</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100/60 text-amber-900 rounded-md">Audit Approval</span>
              </div>
            </div>
          ) : (
            (() => {
              const dept = departments.find(d => d.id === selectedDept);
              if (!dept) return null;
              return (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-amber-950">{dept.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white text-stone-700 border border-stone-200 text-xs font-mono font-bold">
                      {dept.metric}
                    </span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">{dept.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-wide">Key Regional Roles & Staffing:</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.roles.map((r, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-white text-stone-700 border border-stone-100 rounded-md shadow-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate(dept.id)}
                      className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      Acess Live Department Module <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* Target Customers Section */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-amber-100/50 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-amber-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-800" /> Target Markets & Customers Served
          </h3>
          <p className="text-stone-500 text-xs md:text-sm mt-0.5">
            Amrit Dairy supplies pasteurized liquids and solids to varied consumer categories with customized supply frequencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {targetCustomers.map((cust, i) => {
            const IconComponent = cust.icon;
            return (
              <div key={i} className="p-4 rounded-xl bg-stone-50 hover:bg-amber-50/20 border border-stone-100 hover:border-amber-200/50 transition-all duration-200 group flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded-lg text-amber-800 w-fit shadow-xs group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-800 leading-tight">{cust.title}</h4>
                  <p className="text-stone-500 text-[11px] leading-relaxed">{cust.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-150-50 text-[10px] font-mono text-amber-900 font-bold">
                  {cust.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
