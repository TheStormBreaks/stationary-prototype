
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter } from "lucide-react";
import type { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const mockProducts: Product[] = [
  { id: "1", name: "Spiral Notebook - A4", description: "100 pages, ruled", price: 190.00, stock: 50, category: "Notebooks" },
  { id: "2", name: "Ballpoint Pens (Pack of 5)", description: "Blue ink, medium point", price: 130.00, stock: 120, category: "Pens" },
  { id: "3", name: "Highlighters (Set of 4)", description: "Assorted fluorescent colors", price: 225.00, stock: 75, category: "Stationery" },
  { id: "4", name: "Scientific Calculator", description: "Advanced functions for engineering students", price: 1125.00, stock: 20, category: "Electronics" },
  { id: "5", name: "Sticky Notes (Pack of 100)", description: "3x3 inch, assorted colors", price: 90.00, stock: 200, category: "Stationery" },
  { id: "6", name: "USB Flash Drive 32GB", description: "USB 3.0 for fast data transfer", price: 640.00, stock: 40, category: "Electronics" },
  { id: "7", name: "Cadbury Dairy Milk", description: "Classic milk chocolate bar - 50g", price: 40.00, stock: 150, category: "Chocolates" },
  { id: "8", name: "Nestle KitKat", description: "4-finger chocolate wafer bar - 36.5g", price: 30.00, stock: 200, category: "Chocolates" },
  { id: "9", name: "Lays Classic Salted Chips", description: "Crispy potato chips - 52g pack", price: 20.00, stock: 300, category: "Snacks" },
  { id: "10", name: "Kurkure Masala Munch", description: "Spicy puffed corn snacks - 90g", price: 20.00, stock: 250, category: "Snacks" },
  { id: "11", name: "Maaza Mango Drink", description: "Refreshing mango fruit drink - 250ml bottle", price: 25.00, stock: 100, category: "Beverages" },
  { id: "12", name: "Coca-Cola Classic", description: "Carbonated soft drink - 300ml can", price: 35.00, stock: 120, category: "Beverages" },
];

const categories = ["All", ...new Set(mockProducts.map(p => p.category).filter(Boolean) as string[])];


export default function ShopPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product: Product) => {
    // In a real app, this would interact with a cart service/context
    console.log("Added to cart:", product);
    toast({
      title: `${product.name} added to cart!`,
      description: `Price: ₹${product.price.toFixed(2)}`,
      variant: "default",
    });
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Campus Store</CardTitle>
          <CardDescription>Browse available items and add them to your cart.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] pl-10">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardContent className="flex-grow p-4 space-y-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {product.category && <Badge variant="secondary">{product.category}</Badge>}
                <CardDescription className="text-sm text-muted-foreground min-h-[40px]">{product.description}</CardDescription>
                <p className="text-xl font-semibold text-primary">₹{product.price.toFixed(2)}</p>
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(product)} 
                  disabled={product.stock === 0}
                  variant={product.stock > 0 ? "default" : "outline"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 text-center">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">No products found.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
    
