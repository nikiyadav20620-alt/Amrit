/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Star, 
  HelpCircle, 
  ThumbsUp, 
  Inbox, 
  AlertCircle, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import { FeedbackMessage } from "../types";

interface CustomerServiceTabProps {
  feedbacks: FeedbackMessage[];
  onAddFeedback: (feedback: Omit<FeedbackMessage, "id" | "date" | "status">) => void;
  onModifyFeedbackStatus: (feedbackId: string, status: "Unresolved" | "In Progress" | "Resolved") => void;
}

export default function CustomerServiceTab({ feedbacks, onAddFeedback, onModifyFeedbackStatus }: CustomerServiceTabProps) {
  // Feedback Form State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [selectedDept, setSelectedDept] = useState("Production");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userComment) return;

    onAddFeedback({
      customerName: userName,
      email: userEmail || "anonymous@gmail.com",
      rating: userRating,
      comment: userComment,
      departmentTarget: selectedDept
    });

    // Reset controls
    setUserName("");
    setUserEmail("");
    setUserComment("");
    setUserRating(5);
    alert("Thank you for your valuable feedback! It has been channeled directly to our Quality Control and Operations managers.");
  };

  // Compile averages
  const resolvedCount = feedbacks.filter(f => f.status === "Resolved").length;
  const pendingCount = feedbacks.filter(f => f.status !== "Resolved").length;
  const avgRating = feedbacks.length
    ? Number((feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1))
    : 5.0;

  return (
    <div className="space-y-6 animate-fade-in text-sans">
      {/* Support division summaries */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">HACCP Satisfaction Score</p>
            <h4 className="text-xl font-bold font-mono text-amber-955 text-stone-850 flex items-center gap-1.5 mt-1">
              {avgRating} <span className="text-amber-500 text-sm">★</span>
            </h4>
            <span className="text-[10px] text-stone-400 font-bold block mt-0.5">Calculated from {feedbacks.length} ratings</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded-lg">
            <Star className="fill-amber-500 text-amber-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">Addressed & Settled cases</p>
            <h4 className="text-xl font-bold font-mono text-emerald-700 mt-1">{resolvedCount} Reviews</h4>
            <span className="text-[10.5px] text-stone-450 text-emerald-750 font-bold block mt-0.5">Closed in CRM database</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium">Active pending redresses</p>
            <h4 className="text-xl font-bold font-mono text-amber-600 mt-1">{pendingCount} Cases</h4>
            <span className="text-[10.5px] text-stone-400 font-bold block mt-0.5">Assigned to Department Heads</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded-lg animate-pulse">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-amber-100/50 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs text-stone-500 font-medium font-bold">Public Relations Channel</p>
            <p className="text-[11px] text-stone-500 mt-1 leading-snug">Every comment is routed directly to corresponding operational supervisor hubs.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Dynamic reviews feedback log panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-1.5">
              <MessageSquare className="w-5 h-5 text-amber-850 text-amber-805" /> Consumer Satisfaction Wall
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Live database of complaints, requests, and compliments issued by household buyers and contract chefs.</p>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 divide-y divide-stone-100">
            {feedbacks.map((f, i) => (
              <div key={f.id} className={`${i > 0 ? "pt-4" : ""} space-y-3 font-sans`}>
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-stone-800">{f.customerName}</h4>
                      <span className="text-[10px] text-stone-400 italic">({f.email})</span>
                    </div>
                    <div className="text-[10.5px] text-stone-400 mt-0.5 font-mono">Date: {f.date}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-lg border border-amber-200/50 bg-amber-50 text-amber-900">
                      Dept: {f.departmentTarget || "General QA"}
                    </span>
                    <span className={`px-2 py-0.5 text-[9.5px] font-bold rounded-full ${
                      f.status === "Resolved" ? "bg-emerald-50 text-emerald-800 border border-emerald-250" :
                      f.status === "In Progress" ? "bg-amber-100 text-amber-800 border border-amber-250" :
                      "bg-rose-50 text-rose-800 border border-rose-250"
                    }`}>
                      {f.status}
                    </span>
                  </div>
                </div>

                <p className="text-stone-700 text-xs leading-relaxed">{f.comment}</p>

                <div className="flex justify-between items-center bg-stone-50 p-2 rounded-lg text-xs">
                  {/* Rating display */}
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-3.5 h-3.5 ${idx < f.rating ? "fill-current" : "text-stone-250-200 text-stone-200"}`} />
                    ))}
                  </div>

                  {/* Operational status modifier buttons */}
                  {f.status !== "Resolved" && (
                    <div className="flex gap-1.5">
                      {f.status === "Unresolved" && (
                        <button
                          onClick={() => onModifyFeedbackStatus(f.id, "In Progress")}
                          className="px-2 py-1 bg-white hover:bg-amber-50 text-[10px] border border-amber-900 rounded font-semibold text-amber-900 cursor-pointer text-[10.5px]"
                        >
                          Mark: Processing
                        </button>
                      )}
                      <button
                        onClick={() => onModifyFeedbackStatus(f.id, "Resolved")}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-[10.5px] font-bold text-white rounded cursor-pointer"
                      >
                        ✓ Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer complaint/feedback input form */}
        <div className="bg-white rounded-xl border border-amber-100/50 p-5 shadow-xs flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-amber-955 text-amber-950 flex items-center gap-1">
              <Send className="w-4 h-4 text-amber-800" /> Share Customer Experience
            </h3>
            <p className="text-xs text-stone-500">Do you have a question or complaint regarding butter, curd, or on-field deliveries?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1 text-xs">
            {/* Customer name */}
            <div className="space-y-1">
              <label className="block font-semibold text-stone-605 text-stone-600">Your Full Name</label>
              <input 
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Insert full name"
                className="w-full text-xs p-2.5 bg-stone-50 border focus:bg-white border-stone-200 rounded-lg outline-hidden font-medium"
                required
              />
            </div>

            {/* Customer email */}
            <div className="space-y-1">
              <label className="block font-semibold text-stone-606 text-stone-600">Email Address (Secure Ledger)</label>
              <input 
                type="email"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                placeholder="Name@domain.com"
                className="w-full text-xs p-2.5 bg-stone-50 border focus:bg-white border-stone-200 rounded-lg outline-hidden font-medium"
              />
            </div>

            {/* Target department select */}
            <div className="space-y-1">
              <label className="block font-semibold text-stone-606 text-stone-600">Channel to Department Head:</label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 rounded-lg border focus:bg-white border-stone-200 outline-hidden font-medium"
              >
                <option value="Production">Production Division (QC, packaging, pasteurization)</option>
                <option value="Procurement">Procurement (Farmers raw supply milk fat)</option>
                <option value="Logistics">Distribution & Logistics (Delivery delay, reefer temperature)</option>
                <option value="Sales & Marketing">Sales & Marketing (Wholesale trades, contracts)</option>
              </select>
            </div>

            {/* Rating Stars Selection input */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-stone-600">Rate your Satisfaction:</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setUserRating(val)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star className={`w-5 h-5 ${val <= userRating ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded ml-1">
                  {userRating} / 5 Score
                </span>
              </div>
            </div>

            {/* Actual comments text */}
            <div className="space-y-1">
              <label className="block font-semibold text-stone-600">Description of Review / Help Inquiry</label>
              <textarea
                value={userComment}
                onChange={e => setUserComment(e.target.value)}
                rows={3}
                placeholder="State your complaint, query, or feedback clearly..."
                className="w-full text-xs p-2.5 bg-stone-50 border focus:bg-white border-stone-200 rounded-lg outline-hidden font-medium"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-lg cursor-pointer text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
            >
              <Inbox className="w-4 h-4" /> Ship Inbound Support Feed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
