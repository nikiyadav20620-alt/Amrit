/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Farmer {
  id: string;
  name: string;
  location: string;
  phone: string;
  totalSuppliedLitres: number;
  qualityRating: number; // 1 to 5 stars
}

export interface CollectionLog {
  id: string;
  date: string;
  farmerName: string;
  quantityLiters: number;
  fatPercentage: number;
  snfPercentage: number;
  pricePerLiter: number;
  totalCost: number;
  qualityGrade: "A" | "B" | "C";
}

export interface ProductStock {
  id: string;
  name: string;
  category: "milk" | "curd" | "ghee" | "paneer" | "butter" | "beverage";
  unit: string; // e.g. Litre, Box, Kg
  stockLevel: number;
  minStockThreshold: number;
  pricePerUnit: number;
}

export interface ProductionBatch {
  id: string;
  date: string;
  productName: string;
  quantityProduced: number;
  rawMilkConsumed: number; // in liters
  qualityStatus: "Passed" | "Pending Analysis" | "Flagged";
  operator: string;
}

export interface Retailer {
  id: string;
  name: string;
  type: "Household" | "Restaurant" | "Café" | "Grocery Store" | "School";
  contact: string;
  monthlyVolumeKg: number;
  address: string;
}

export interface SalesOrder {
  id: string;
  date: string;
  customerName: string;
  customerType: string;
  productsBought: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  deliveryStatus: "Pending Dispatch" | "In Transit" | "Delivered";
}

export interface FeedbackMessage {
  id: string;
  date: string;
  customerName: string;
  email: string;
  rating: number; // 1-5
  comment: string;
  status: "Unresolved" | "In Progress" | "Resolved";
  departmentTarget?: string; // Procurement, Logistics etc.
}

export interface DeliveryTruck {
  id: string;
  driverName: string;
  truckNo: string;
  capacityLiters: number;
  tempCelsius: number; // For cold storage representation
  status: "Available" | "Out for Delivery" | "Maintenance";
  route: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  cost: number;
  reach: string;
  status: "Active" | "Planned" | "Completed";
  impactFactor: number; // multiplier on general store orders
}
