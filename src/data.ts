/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Farmer, CollectionLog, ProductStock, ProductionBatch, Retailer, SalesOrder, DeliveryTruck, MarketingCampaign, FeedbackMessage } from "./types";

export const INITIAL_FARMERS: Farmer[] = [
  { id: "F-1", name: "Ramesh Choudhary", location: "Kishanpur Village", phone: "+91 98765 43210", totalSuppliedLitres: 1240, qualityRating: 5 },
  { id: "F-2", name: "Suresh Prasad", location: "Samanpur Village", phone: "+91 98765 87654", totalSuppliedLitres: 920, qualityRating: 4 },
  { id: "F-3", name: "Sunita Yadav", location: "Meerapur Village", phone: "+91 91234 56789", totalSuppliedLitres: 1540, qualityRating: 5 },
  { id: "F-4", name: "Rajesh Mahto", location: "Kishanpur Village", phone: "+91 95551 23456", totalSuppliedLitres: 680, qualityRating: 3 },
  { id: "F-5", name: "Gita Devi", location: "Hardiya Basti", phone: "+91 94321 09876", totalSuppliedLitres: 1100, qualityRating: 4 }
];

export const INITIAL_COLLECTIONS: CollectionLog[] = [
  {
    id: "COL-001",
    date: "2026-06-04",
    farmerName: "Ramesh Choudhary",
    quantityLiters: 120,
    fatPercentage: 4.8,
    snfPercentage: 8.6,
    pricePerLiter: 43.10,
    totalCost: 5172,
    qualityGrade: "A"
  },
  {
    id: "COL-002",
    date: "2026-06-04",
    farmerName: "Sunita Yadav",
    quantityLiters: 150,
    fatPercentage: 4.5,
    snfPercentage: 8.5,
    pricePerLiter: 41.50,
    totalCost: 6225,
    qualityGrade: "A"
  },
  {
    id: "COL-003",
    date: "2026-06-04",
    farmerName: "Rajesh Mahto",
    quantityLiters: 80,
    fatPercentage: 3.8,
    snfPercentage: 8.2,
    pricePerLiter: 37.60,
    totalCost: 3008,
    qualityGrade: "C"
  },
  {
    id: "COL-004",
    date: "2026-06-05",
    farmerName: "Gita Devi",
    quantityLiters: 95,
    fatPercentage: 4.2,
    snfPercentage: 8.4,
    pricePerLiter: 39.90,
    totalCost: 3790.5,
    qualityGrade: "B"
  }
];

export const INITIAL_STOCKS: ProductStock[] = [
  { id: "P-MILK", name: "Fresh Pasteurized Milk (1L)", category: "milk", unit: "Packet", stockLevel: 450, minStockThreshold: 100, pricePerUnit: 60 },
  { id: "P-CURD", name: "Premium Curd/Yogurt (500g)", category: "curd", unit: "Cup", stockLevel: 280, minStockThreshold: 50, pricePerUnit: 45 },
  { id: "P-GHEE", name: "Shuddh Desi Ghee (1L)", category: "ghee", unit: "Tin", stockLevel: 85, minStockThreshold: 15, pricePerUnit: 680 },
  { id: "P-PANEER", name: "Fresh Soft Paneer (200g)", category: "paneer", unit: "Block", stockLevel: 180, minStockThreshold: 30, pricePerUnit: 85 },
  { id: "P-BUTTER", name: "Creamy Table Butter (500g)", category: "butter", unit: "Pack", stockLevel: 120, minStockThreshold: 20, pricePerUnit: 240 },
  { id: "P-LASSI", name: "Refreshing Sweet Lassi (250ml)", category: "beverage", unit: "Bottle", stockLevel: 310, minStockThreshold: 80, pricePerUnit: 30 }
];

export const INITIAL_BATCHES: ProductionBatch[] = [
  { id: "BAT-101", date: "2026-06-03", productName: "Shuddh Desi Ghee (1L)", quantityProduced: 30, rawMilkConsumed: 600, qualityStatus: "Passed", operator: "Anil Kumar (Supervisor)" },
  { id: "BAT-102", date: "2026-06-04", productName: "Fresh Pasteurized Milk (1L)", quantityProduced: 350, rawMilkConsumed: 350, qualityStatus: "Passed", operator: "Anil Kumar (Supervisor)" },
  { id: "BAT-103", date: "2026-06-04", productName: "Fresh Soft Paneer (200g)", quantityProduced: 120, rawMilkConsumed: 240, qualityStatus: "Passed", operator: "Anjali Kumari (QC Chemist)" },
  { id: "BAT-104", date: "2026-06-05", productName: "Premium Curd/Yogurt (500g)", quantityProduced: 150, rawMilkConsumed: 150, qualityStatus: "Pending Analysis", operator: "Anil Kumar (Supervisor)" }
];

export const INITIAL_RETAILERS: Retailer[] = [
  { id: "RET-1", name: "Royal Bakers & Cafés", type: "Café", contact: "Mohit Taneja (+91 99998 88811)", monthlyVolumeKg: 450, address: "Sector 15 Main Market" },
  { id: "RET-2", name: "Shree Bala Ji Groceries", type: "Grocery Store", contact: "Aalok Gupta (+91 98887 77722)", monthlyVolumeKg: 850, address: "Vikas Nagar Plaza" },
  { id: "RET-3", name: "Grand Imperial Hotel & Resorts", type: "Restaurant", contact: "Chef Vivek (+91 97776 66633)", monthlyVolumeKg: 1200, address: "Mall Road, Civil Lines" },
  { id: "RET-4", name: "St. Mary Senior Secondary School", type: "School", contact: "Admin Incharge (+91 96665 55544)", monthlyVolumeKg: 300, address: "Greenwood Valley Enclave" }
];

export const INITIAL_ORDERS: SalesOrder[] = [
  {
    id: "ORD-501",
    date: "2026-06-04",
    customerName: "Grand Imperial Hotel & Resorts",
    customerType: "Restaurant",
    productsBought: [
      { productId: "P-GHEE", productName: "Shuddh Desi Ghee (1L)", quantity: 15, price: 680 },
      { productId: "P-PANEER", productName: "Fresh Soft Paneer (200g)", quantity: 50, price: 85 }
    ],
    totalAmount: 14450,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered"
  },
  {
    id: "ORD-502",
    date: "2026-06-04",
    customerName: "Shree Bala Ji Groceries",
    customerType: "Grocery Store",
    productsBought: [
      { productId: "P-MILK", productName: "Fresh Pasteurized Milk (1L)", quantity: 100, price: 60 },
      { productId: "P-CURD", productName: "Premium Curd/Yogurt (500g)", quantity: 50, price: 45 },
      { productId: "P-LASSI", productName: "Refreshing Sweet Lassi (250ml)", quantity: 60, price: 30 }
    ],
    totalAmount: 10050,
    paymentStatus: "Pending",
    deliveryStatus: "In Transit"
  },
  {
    id: "ORD-503",
    date: "2026-06-05",
    customerName: "Mohan Sharma (Household)",
    customerType: "Household",
    productsBought: [
      { productId: "P-MILK", productName: "Fresh Pasteurized Milk (1L)", quantity: 5, price: 60 },
      { productId: "P-BUTTER", productName: "Creamy Table Butter (500g)", quantity: 2, price: 240 }
    ],
    totalAmount: 780,
    paymentStatus: "Paid",
    deliveryStatus: "Pending Dispatch"
  }
];

export const INITIAL_FLEET: DeliveryTruck[] = [
  { id: "TRK-01", driverName: "Kartar Singh", truckNo: "HR-55B-8977", capacityLiters: 1200, tempCelsius: 3.4, status: "Out for Delivery", route: "Sector 15 -> Vikas Nagar" },
  { id: "TRK-02", driverName: "Devender Yadav", truckNo: "HR-55C-4050", capacityLiters: 1500, tempCelsius: 4.1, status: "Available", route: "Idle (Ready for dispatch)" },
  { id: "TRK-03", driverName: "Sohan Verma", truckNo: "HR-55G-1109", capacityLiters: 800, tempCelsius: -12.5, status: "Maintenance", route: "Workshop (Chamber servicing)" },
  { id: "TRK-04", driverName: "Satish Kumar", truckNo: "HR-55B-5421", capacityLiters: 1000, tempCelsius: 3.8, status: "Available", route: "Idle (Ready for dispatch)" }
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  { id: "MKT-1", name: "Pure Morning Purity Banner Ad", cost: 3500, reach: "10,000+ local families via newspaper inserts", status: "Completed", impactFactor: 1.15 },
  { id: "MKT-2", name: "Ghee Tasting Booth at Housing Societies", cost: 6000, reach: "1,500 active cooks engaged directly", status: "Active", impactFactor: 1.30 },
  { id: "MKT-3", name: "Healthy Summer Lassi Free Distribution", cost: 12000, reach: "5,000 students and athletes", status: "Planned", impactFactor: 1.45 }
];

export const INITIAL_FEEDBACK: FeedbackMessage[] = [
  {
    id: "FDB-901",
    date: "2026-06-03",
    customerName: "Chef Vivek Chand",
    email: "chef.vivek@grandimperial.com",
    rating: 5,
    comment: "The paneer quality delivered this week is incredibly soft and flavorful. Highly appreciated by our hotel guests!",
    status: "Resolved",
    departmentTarget: "Production"
  },
  {
    id: "FDB-902",
    date: "2026-06-04",
    customerName: "Meena Joshi",
    email: "meena.joshi29@gmail.com",
    rating: 3,
    comment: "The fresh milk delivery was delayed by 30 minutes yesterday. The temperature was still cold, but timing is important for breakfast.",
    status: "In Progress",
    departmentTarget: "Logistics"
  },
  {
    id: "FDB-903",
    date: "2026-06-04",
    customerName: "Raj Groceries",
    email: "info@rajgroceries.in",
    rating: 4,
    comment: "Lassi is highly in-demand. Can we schedule a larger delivery batch on weekends?",
    status: "Resolved",
    departmentTarget: "Sales & Marketing"
  }
];
