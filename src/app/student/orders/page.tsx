"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Order, CartItem } from "@/types";
import { useState, useEffect } from "react";
import { History, PackageOpen, FileText, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Mock order data
const mockOrders: Order[] = [
  {
    id: "ord1",
    orderNumber: "CAMPUS-001",
    userId: "s1",
    items: [
      { id: "ci1", type: "product", product: { id: "1", name: "Spiral Notebook", price: 2.50, stock:10, description:"test", category: "Notebooks" }, quantity: 2 },
      { id: "ci2", type: "print", printJob: { id:"p1", userId:"s1", fileName: "Essay.pdf", copies: 1, paperSize: "A4", color: "B&W", twoSided: false, status: "Completed", orderDate: new Date().toISOString(), estimatedPrice: 0.50 }, quantity: 1 },
    ],
    totalAmount: 5.50,
    status: "Completed",
    orderDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "ord2",
    orderNumber: "CAMPUS-002",
    userId: "s1",
    items: [
      { id: "ci3", type: "product", product: { id: "2", name: "Pen Pack", price: 1.75, stock:10, description:"test", category: "Pens"}, quantity: 1 },
    ],
    totalAmount: 1.75,
    status: "Processing",
    orderDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "ord3",
    orderNumber: "CAMPUS-003",
    userId: "s1",
    items: [
      { id: "ci4", type: "print", printJob: { id:"p2", userId:"s1", fileName: "Presentation.pdf", copies: 5, paperSize: "A4", color: "Color", twoSided: true, status: "Pending", orderDate: new Date().toISOString(), estimatedPrice: 3.00 }, quantity: 1 },
    ],
    totalAmount: 3.00,
    status: "Pending",
    orderDate: new Date().toISOString(),
  },
];

const getStatusBadgeVariant = (status: Order['status']): "default" | "secondary" | "outline" | "destructive" => {
  switch (status) {
    case "Completed":
    case "Delivered":
      return "default"; // Using primary color for completed
    case "Processing":
    case "Shipped":
      return "secondary"; // Accent color for processing
    case "Pending":
      return "outline";
    case "Cancelled":
      return "destructive";
    default:
      return "outline";
  }
};


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    setIsLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatItemName = (item: CartItem) => {
    if (item.type === 'product') return item.product.name;
    if (item.type === 'print') return `${item.printJob.fileName} (Print)`;
    return 'Unknown Item';
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <History className="h-8 w-8 text-primary" /> Order History
            </CardTitle>
            <CardDescription>View your past and current orders.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <History className="h-8 w-8 text-primary" /> Order History
          </CardTitle>
          <CardDescription>View your past and current orders.</CardDescription>
        </CardHeader>
      </Card>

      {orders.length > 0 ? (
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-sm">
                        {order.items.slice(0,2).map(item => (
                          <li key={item.id}>{formatItemName(item)} x {item.quantity}</li>
                        ))}
                        {order.items.length > 2 && <li>...and {order.items.length - 2} more.</li>}
                      </ul>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" asChild>
                        {/* This would ideally link to an order detail page */}
                        <Link href="#">View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 text-center">
            <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">No orders yet.</p>
            <p className="text-sm text-muted-foreground">You haven't placed any orders. Start shopping to see them here.</p>
            <Button asChild className="mt-6">
              <Link href="/student/shop">
                <ShoppingBag className="mr-2 h-4 w-4" /> Go to Shop
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
