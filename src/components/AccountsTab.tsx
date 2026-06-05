/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  CheckSquare, 
  Coins, 
  DollarSign, 
  Download, 
  FileSpreadsheet, 
  HandCoins, 
  TrendingDown, 
  TrendingUp, 
  Wallet 
} from "lucide-react";
import { CollectionLog, SalesOrder, MarketingCampaign } from "../types";

interface AccountsTabProps {
  collections: CollectionLog[];
  orders: SalesOrder[];
  campaigns: MarketingCampaign[];
}

export default function AccountsTab({ collections, orders, campaigns }: AccountsTabProps) {
  // Payout simulators
  const [payrollStatus, setPayrollStatus] = useState<"Pending Disbursal" | "Disbursed">("Pending Disbursal");
  const [auditSigned, setAuditSigned] = useState(false);

  // Dynamic ledger bookkeeping math
  const orderRevenues = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const procurementCosts = collections.reduce((sum, c) => sum + c.totalCost, 0);
  const marketingCosts = campaigns.reduce((sum, camp) => sum + camp.cost, 0);
  
  // Set realistic administrative defaults + link dynamic additions
  const FIXED_OPERATIONS_COST = 14500; // Pasteurization electricity & sterile packaging
  const LOGISTICS_FUEL_COST = 5400;     // Reefer transport fueling
  const EMP_SALARIES_COST = 24000;      // Plant operators & MD stipend

  const totalRevenues = 420000 + orderRevenues; // historical anchor + active orders
  const totalOperatingCosts = 195000 + procurementCosts + marketingCosts + FIXED_OPERATIONS_COST + LOGISTICS_FUEL_COST + EMP_SALARIES_COST;
  const netEarnings = totalRevenues - totalOperatingCosts;
  const netMarginPercentage = Number(((netEarnings / totalRevenues) * 100).toFixed(1));

  // Dynamic Cash Flow Chart representation
  const ledgerChart = [
    { month: "Jan", Inflow: 310000, Outflow: 180000 },
    { month: "Feb", Inflow: 340000, Outflow: 195000 },
    { month: "Mar", Inflow: 375000, Outflow: 215005 },
    { month: "Apr", Inflow: 390000, Outflow: 220000 },
    { month: "May", Inflow: 410000, Outflow: 245000 },
    { month: "Jun (Est)", Inflow: totalRevenues, Outflow: totalOperatingCosts }
  ];

  // Audit list
  const complianceSteps = [
    { text: "Deducted TDS on milk payments above limits", checked: true },
    { text: "Assigned 5% GST to processed paneer and curd", checked: true },
    { text: "Revenues synchronized securely with state bank nodes", checked: true },
    { text: "Verified farmer weighing logs with quality grades", checked: true },
    { text: "Employee Provident Fund contribution accrued", checked: payrollStatus === "Disbursed" }
  ];

  const handleDisbursePayroll = () => {
    setPayrollStatus("Disbursed");
    alert("₹24,000 corporate payroll disbursed successfully to dairy operators, chilling center supervisors, and logistics professionals!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Visual Balance Sheet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">Aggregate Inflows</p>
            <h4 className="text-xl font-extrabold font-mono text-emerald-700 mt-1">₹{totalRevenues.toLocaleString()}</h4>
            <span className="text-[10px] text-stone-450 text-stone-500 flex items-center gap-0.5 mt-1"><TrendingUp className="w-3 h-3" /> Historical + Live Orders</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">Operating Outflows</p>
            <h4 className="text-xl font-extrabold font-mono text-amber-700 mt-1">₹{totalOperatingCosts.toLocaleString()}</h4>
            <span className="text-[10px] text-stone-450 text-stone-500 flex items-center gap-0.5 mt-1"><TrendingDown className="w-3 h-3" /> Raw Materials + Plant Opex</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded-lg">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">Net Profit Margin</p>
            <h4 className="text-xl font-extrabold font-mono text-amber-955 text-amber-950 mt-1">₹{netEarnings.toLocaleString()}</h4>
            <span className="text-[10px] text-stone-400 font-bold mt-1 block">Yielding {netMarginPercentage}% Net Margin</span>
          </div>
          <div className="p-3 bg-amber-950/5 text-amber-950 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/50 flex flex-col justify-between shadow-xs h-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-stone-500 font-medium">Operational Status:</span>
            <span className={`px-2 py-0.5 text-[9.5px] font-bold rounded-full ${
              payrollStatus === "Disbursed" ? "bg-emerald-50 text-emerald-850" : "bg-purple-50 text-purple-800 animate-pulse"
            }`}>
              {payrollStatus}
            </span>
          </div>
          <button
            onClick={handleDisbursePayroll}
            disabled={payrollStatus === "Disbursed"}
            className="w-full py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-lg text-xs font-bold font-sans cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center transition-all shadow-xs mt-3"
          >
            Disburse operator salary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash flow Recharts graph */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-4 mb-2 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-amber-950">Active Capital Inflows & Outflows</h3>
              <p className="text-xs text-stone-500">Visualization of monthly cash trends (accumulative operations, logistics, chilling expenses).</p>
            </div>
            
            <button 
              onClick={() => alert("Excel sheet formatted statement exported successfully!")}
              className="text-amber-800 hover:text-amber-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> CSV Sheet
            </button>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ledgerChart} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b45309" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e5e5e5", fontSize: "12px" }}
                  formatter={(value: any) => [`₹${value.toLocaleString()}`]}
                />
                <Area type="monotone" dataKey="Inflow" stroke="#047857" fillOpacity={1} fill="url(#colorInflow)" strokeWidth={2} />
                <Area type="monotone" dataKey="Outflow" stroke="#b45309" fillOpacity={1} fill="url(#colorOutflow)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regulatory Audit Checklist */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[9px] font-bold uppercase tracking-wider">
              Legal Compliance Audit
            </span>
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1">
              FSSAI & Financial Guardrails
            </h3>
            <p className="text-xs text-stone-500">Ensure audit and statutory standards are tracked by MD ledger keys.</p>
          </div>

          <div className="space-y-3 pt-1">
            {complianceSteps.map((chk, i) => (
              <div key={i} className="flex gap-2.5 items-start text-xs text-stone-700">
                <span className={`p-0.5 rounded-full ${chk.checked ? "text-emerald-700 bg-emerald-50" : "text-stone-400 bg-stone-50 animate-pulse"}`}>
                  <CheckSquare className="w-4 h-4" />
                </span>
                <span className="font-medium leading-tight">{chk.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100">
            <button
              onClick={() => { setAuditSigned(true); alert("Statutory accounting statement signed and securely transmitted to auditors."); }}
              disabled={auditSigned}
              className={`w-full py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                auditSigned 
                  ? "bg-stone-100 text-stone-550 italic pointer-events-none text-stone-500" 
                  : "bg-amber-950 text-white hover:bg-stone-900"
              }`}
            >
              {auditSigned ? "✓ Report Transmitted & Locked" : "Sign & Lock Quarterly Financial Audit"}
            </button>
          </div>
        </div>
      </div>

      {/* Structured ledger breakdown sheet */}
      <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-800" /> Operational Ledgers Sheet (Line Items)
          </h3>
          <p className="text-xs text-stone-500 mt-1">Detailed, granular breakdown of income and expenses calculated dynamically from live system transactions.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-2.5">Ledger Segment</th>
                <th className="p-2.5">Specific Ledger Item</th>
                <th className="p-2.5">Category Type</th>
                <th className="p-2.5 text-right">Value Amount</th>
                <th className="p-2.5">Transaction Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {/* Income Rows */}
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-stone-900">REVENUES</td>
                <td className="p-2.5 text-stone-750">Anchor Corporate Distributor Contracts</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">Inflow-Static</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-emerald-700">₹420,000.00</td>
                <td className="p-2.5 text-stone-500 italic">Historical pre-picket trade invoices</td>
              </tr>
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-stone-900">REVENUES</td>
                <td className="p-2.5 text-stone-750 font-bold text-amber-950">Active Emulator Storefront Orders</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">Inflow-Live</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-emerald-750">₹{orderRevenues.toLocaleString()}</td>
                <td className="p-2.5 text-stone-550 text-stone-600">Calculated dynamic from client shopping carts</td>
              </tr>

              {/* Expense rows */}
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-amber-900">EXPENDITURES</td>
                <td className="p-2.5 text-stone-750 font-bold">Dynamic Milk Procurement Payments</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">Operational</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-amber-700">-₹{procurementCosts.toLocaleString()}</td>
                <td className="p-2.5 text-stone-500 italic">Disbursed automatically on weighing raw milk batches</td>
              </tr>
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-amber-900">EXPENDITURES</td>
                <td className="p-2.5 text-stone-750">Active Marketing & Neighbor Advertising</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">Discretionary</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-amber-700">-₹{marketingCosts.toLocaleString()}</td>
                <td className="p-2.5 text-stone-500">Propagating brand awareness inside societies</td>
              </tr>
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-amber-900">EXPENDITURES</td>
                <td className="p-2.5 text-stone-650">Plant Electricity & Pasteurization fuel</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">Fixed Overhead</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-amber-700">-₹{FIXED_OPERATIONS_COST.toLocaleString()}</td>
                <td className="p-2.5 text-stone-500 italic">HTST thermal coils & steam sterilizers utility opex</td>
              </tr>
              <tr className="hover:bg-amber-50/5">
                <td className="p-2.5 font-bold text-amber-900">EXPENDITURES</td>
                <td className="p-2.5 text-stone-650">Integrated Employee Payroll</td>
                <td className="p-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">Staff Payroll</span></td>
                <td className="p-2.5 text-right font-mono font-bold text-amber-700">-₹{EMP_SALARIES_COST.toLocaleString()}</td>
                <td className="p-2.5 text-stone-500">QC Chemists, Truck Pilots, and Dairy Engineers salaries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
