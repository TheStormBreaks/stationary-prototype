
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product, PrintOrder } from "@/types";
import { useState } from "react";
import { ShoppingCart, Trash2, Printer, CreditCard, ChevronLeft, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock cart data
const mockProduct: Product = { id: "1", name: "Spiral Notebook - A4", description: "100 pages, ruled", price: 190.00, stock: 50, category: "Notebooks" };
const mockPrintJob: PrintOrder = { id: "p1", userId: "s1", fileName: "Physics_Assignment.pdf", copies: 2, paperSize: "A4", color: "Color", twoSided: true, status: "Pending", orderDate: new Date().toISOString(), estimatedPrice: 90.00};

const initialCartItems: CartItem[] = [
  { id: "ci1", type: "product", product: mockProduct, quantity: 2 },
  { id: "ci2", type: "print", printJob: mockPrintJob, quantity: 1 }, // Quantity for print jobs is typically 1, representing the job itself
];

export default function CartPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Item removed from cart",
      variant: "default",
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or remove item if 0
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const calculateItemTotal = (item: CartItem): number => {
    if (item.type === 'product') {
      return item.product.price * item.quantity;
    }
    if (item.type === 'print') {
      // Assuming printJob.estimatedPrice is per single print job package.
      // Quantity here is always 1 for the print job itself.
      return item.printJob.estimatedPrice || 0; 
    }
    return 0;
  };

  const cartTotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast({ title: "Cart is empty", description: "Please add items to your cart before placing an order.", variant: "destructive" });
      return;
    }
    // In a real app, this would submit the order to a backend
    console.log("Placing order with items:", cartItems, "Total:", cartTotal);
    toast({
      title: "Order Placed Successfully!",
      description: `Your order total is ₹${cartTotal.toFixed(2)}. You will be redirected to order history.`,
      variant: "default",
    });
    setCartItems([]); // Clear cart
    router.push("/student/orders"); // Navigate to order history
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" /> Your Shopping Cart
          </CardTitle>
          <CardDescription>Review your items and proceed to checkout.</CardDescription>
        </CardHeader>
      </Card>

      {cartItems.length > 0 ? (
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] hidden sm:table-cell">Item</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      {item.type === "product" ? (
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                           <Package className="h-8 w-8 text-muted-foreground" />
                         </div>
                      ) : (
                         <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                           <Printer className="h-8 w-8 text-muted-foreground" />
                         </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">
                        {item.type === "product" ? item.product.name : item.printJob.fileName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.type === "product" ? item.product.category : `${item.printJob.copies} cop${item.printJob.copies > 1 ? 'ies' : 'y'}, ${item.printJob.color}`}
                      </p>
                      {item.type === "product" && <Badge variant="outline">Product</Badge>}
                      {item.type === "print" && <Badge variant="outline">Print Job</Badge>}
                    </TableCell>
                    <TableCell className="text-center">
                       {item.type === 'product' ? (
                        <div className="flex items-center justify-center">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                        </div>
                        ) : (
                         <span>{item.quantity}</span> // Print job quantity usually fixed
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{(item.type === "product" ? item.product.price : item.printJob.estimatedPrice || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">₹{calculateItemTotal(item).toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                  <TableCell colSpan={1} className="sm:hidden"></TableCell>
                  <TableCell className="text-right font-bold text-lg" colSpan={2}>Subtotal</TableCell>
                  <TableCell className="text-right font-bold text-lg" colSpan={1}>₹{cartTotal.toFixed(2)}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                  <TableCell colSpan={1} className="sm:hidden"></TableCell>
                  <TableCell className="text-right text-muted-foreground" colSpan={2}>Est. Tax</TableCell>
                  <TableCell className="text-right text-muted-foreground" colSpan={1}>₹{(cartTotal * 0.00).toFixed(2)}</TableCell> {/* Assuming 0% tax for now */}
                </TableRow>
                 <TableRow className="border-t-2 border-primary">
                  <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                  <TableCell colSpan={1} className="sm:hidden"></TableCell>
                  <TableCell className="text-right font-bold text-xl" colSpan={2}>Total</TableCell>
                  <TableCell className="text-right font-bold text-xl" colSpan={1}>₹{cartTotal.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t">
            <Button variant="outline" asChild>
              <Link href="/student/shop">
                <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handlePlaceOrder}>
              <CreditCard className="mr-2 h-5 w-5" /> Place Order
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/student/shop">
                Start Shopping
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    
