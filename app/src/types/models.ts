export type BikeType = 'motorcycle' | 'bicycle';
export type ComponentCategory = 'Engine' | 'Transmission' | 'Brakes' | 'Suspension' | 'Wheels & Tyres' | 'Electrical' | 'Body & Frame';
export type CostRange = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'on-time' | 'due-soon' | 'overdue';
export type BillFlag = 'normal' | 'check' | 'unnecessary';

export type BikeComponent = {
  id: string;
  name: string;
  category: ComponentCategory;
  bikeType: BikeType;
  svgLayerId: string;
  whatItDoes: string;
  whyItMatters: string;
  warningSigns: [string, string, string];
  checkInterval: string;
  costRange: CostRange;
  relatedIds: string[];
  analogy: string;
};

export type Bike = {
  id: string;
  brand: string;
  model: string;
  year: number;
  bikeType: BikeType;
  registration?: string;
  odometerKm: number;
  photoUri?: string;
  healthScore: number;
  createdAt: string;
};

export type CareStep = { title: string; detail: string };
export type Task = {
  id: string;
  bikeType: BikeType;
  name: string;
  description: string;
  intervalDays?: number;
  intervalKm?: number;
  lastDoneAt?: string;
  lastDoneOdometerKm?: number;
  status: TaskStatus;
  estimatedMinutes: number;
  tools: string[];
  steps: CareStep[];
  reminderEnabled: boolean;
};

export type ServiceRecord = {
  id: string;
  bikeId: string;
  date: string;
  odometerKm: number;
  centre: string;
  totalCostInr: number;
  partsChanged: string[];
  billPhotoUri?: string;
  notes?: string;
};

export type BillItem = {
  id: string;
  name: string;
  explanation: string;
  priceInr: number;
  flag: BillFlag;
  reason?: string;
};

export type FuelEntry = {
  id: string;
  bikeId: string;
  date: string;
  litres: number;
  pricePerLitreInr: number;
  totalInr: number;
  odometerKm: number;
  fullTank: boolean;
};

export type Station = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  open: boolean;
  openTime: string;
  closeTime: string;
  fuelTypes: string[];
};

export type UserProfile = {
  id: string;
  name: string;
  city: string;
  avatarUri?: string;
  bikeIds: string[];
};

export type Comment = {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
};

export type Post = {
  id: string;
  author: string;
  avatarUri?: string;
  text: string;
  photoUri?: string;
  likeCount: number;
  commentCount: number;
  group?: string;
  createdAt: string;
};

export type Mod = {
  id: string;
  name: string;
  benefit: string;
  costRange: CostRange;
  difficulty: 1 | 2 | 3;
  legalWarrantyNote: string;
  compatibleBikeTypes: BikeType[];
  wishlist: boolean;
};

export type BillAnalysis = {
  items: BillItem[];
  totalInr: number;
  fairPriceMinInr: number;
  fairPriceMaxInr: number;
};
