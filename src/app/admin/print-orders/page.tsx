"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { PrintOrder } from "@/types";
import { useState, useEffect } from "react";
import { Printer, CheckCircle, AlertTriangle, ListChecks, Hourglass, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const initialMockPrintOrders: PrintOrder[] = [
  { id: "po1", userId: "student123", fileName: "Thesis_Chapter1.pdf", copies: 3, paperSize: "A4", color: "Black & White", twoSided: true, notes: "Staple top-left", status: "Pending", orderDate: new Date(Date.now() - 3600000 * 2).toISOString(), estimatedPrice: 1.50 },
  { id: "po2", userId: "student456", fileName: "Lab_Report_Final.docx", copies: 1, paperSize: "Letter", color: "Color", twoSided: false, status: "Pending", orderDate: new Date(Date.now() - 3600000).toISOString(), estimatedPrice: 0.75 },
  { id: "po3", userId: "student789", fileName: "Presentation_Slides.pptx", copies: 10, paperSize: "A4", color: "Color", twoSided: true, notes: "3 slides per page", status: "Printing", orderDate: new Date().toISOString(), estimatedPrice: 12.00 },
  { id: "po4", userId: "student101", fileName: "Old_Order.pdf", copies: 1, paperSize: "A4", color: "Black & White", twoSided: false, status: "Completed", orderDate: new Date(Date.now() - 86400000 * 5).toISOString(), estimatedPrice: 0.10 },
];

const getStatusBadgeVariant = (status: PrintOrder['status']): "default" | "secondary" | "outline" | "destructive" => {
  switch (status) {
    case "Completed":
      return "default"; // Primary color for completed
    case "Printing":
      return "secondary"; // Accent color for printing
    case "Ready for Pickup":
      return "secondary"; // Accent color (Orange)
    case "Pending":
      return "outline";
    case "Cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: PrintOrder['status']) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "Printing":
      return <Hourglass className="h-4 w-4 text-yellow-600 animate-spin" />;
    case "Ready for Pickup":
      return <ListChecks className="h-4 w-4 text-blue-600" />;
    case "Pending":
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case "Cancelled":
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
}


export default function AdminPrintOrdersPage() {
  const { toast } = useToast();
  const [printOrders, setPrintOrders] = useState<PrintOrder[]>(initialMockPrintOrders);
  const [filterStatus, setFilterStatus] = useState<PrintOrder['status'] | "All">("All");

  const handleUpdateStatus = (orderId: string, newStatus: PrintOrder['status']) => {
    setPrintOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} marked as ${newStatus}.`,
      variant: "default",
    });
  };
  
  const filteredOrders = printOrders.filter(order => 
    filterStatus === "All" || order.status === filterStatus
  );


  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
           <div>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <Printer className="h-8 w-8 text-primary" /> Print Order Queue
            </CardTitle>
            <CardDescription>Manage incoming print orders and update their status.</CardDescription>
           </div>
            <Select value={filterStatus} onValueChange={(value: PrintOrder['status'] | "All") => setFilterStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Printing">Printing</SelectItem>
                <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
        </CardHeader>
      </Card>

      {filteredOrders.length > 0 ? (
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead className="hidden md:table-cell">User ID</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead className="hidden lg:table-cell">Specs</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.userId}</TableCell>
                    <TableCell>
                        {order.fileName}
                        <p className="text-xs text-muted-foreground lg:hidden">
                           {order.copies}x, {order.paperSize}, {order.color}{order.twoSided ? ", 2-sided" : ""}
                        </p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {order.copies} cop{order.copies > 1 ? 'ies' : 'y'}, {order.paperSize}, {order.color}{order.twoSided ? ", Two-sided" : ""}
                      {order.notes && <p className="text-xs text-muted-foreground truncate max-w-xs">Notes: {order.notes}</p>}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusBadgeVariant(order.status)} className="gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {order.status === "Pending" && (
                        <Button size="sm" onClick={() => handleUpdateStatus(order.id, "Printing")} variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                          Start Printing
                        </Button>
                      )}
                      {order.status === "Printing" && (
                        <Button size="sm" onClick={() => handleUpdateStatus(order.id, "Ready for Pickup")} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                          Mark Ready
                        </Button>
                      )}
                       {order.status === "Ready for Pickup" && (
                        <Button size="sm" onClick={() => handleUpdateStatus(order.id, "Completed")} className="bg-green-600 hover:bg-green-700 text-white">
                          Mark Completed
                        </Button>
                      )}
                      {order.status !== "Completed" && order.status !== "Cancelled" && (
                        <Button size="sm" variant="ghost" className="ml-1 text-destructive hover:bg-destructive/10" onClick={() => handleUpdateStatus(order.id, "Cancelled")}>
                          Cancel
                        </Button>
                      )}
                       {order.status === "Completed" && (
                        <span className="text-sm text-green-600">Done</span>
                      )}
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
            <ListChecks className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">No print orders match the filter.</p>
            <p className="text-sm text-muted-foreground">
              {filterStatus === "All" ? "The print queue is currently empty." : `There are no orders with status "${filterStatus}".`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
