export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
}

export interface PrintSpecification {
  fileName: string;
  copies: number;
  paperSize: "A4" | "A3" | "Letter";
  color: "Black & White" | "Color";
  notes?: string;
  twoSided: boolean;
}

export interface PrintOrder extends PrintSpecification {
  id: string;
  userId: string;
  status: "Pending" | "Printing" | "Ready for Pickup" | "Completed" | "Cancelled";
  orderDate: string; // ISO string
  estimatedPrice?: number;
}

export interface CartItemBase {
  id: string; // Unique ID for the cart item itself
  quantity: number;
}

export interface ProductCartItem extends CartItemBase {
  type: "product";
  product: Product;
}

export interface PrintCartItem extends CartItemBase {
  type: "print";
  printJob: PrintOrder; // Using PrintOrder structure for details
}

export type CartItem = ProductCartItem | PrintCartItem;


export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Completed" | "Cancelled"; // Added Completed for print orders
  orderDate: string; // ISO string
  shippingAddress?: string; // Optional
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "admin";
}

export interface ShopStatus {
  isOpen: boolean;
  message?: string; // e.g. "Closed for holidays"
}
