"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { useState, useEffect, type FormEvent } from "react";
import { PlusCircle, Trash2, Edit3, PackageSearch, Archive, ListFilter } from "lucide-react";
import Image from "next/image";

const initialMockProducts: Product[] = [
  { id: "1", name: "Spiral Notebook - A4", description: "100 pages, ruled", price: 2.50, stock: 50, imageUrl: "https://placehold.co/64x64.png", category: "Notebooks", dataAiHint: "notebook spiral" },
  { id: "2", name: "Ballpoint Pens (Pack of 5)", description: "Blue ink, medium point", price: 1.75, stock: 120, imageUrl: "https://placehold.co/64x64.png", category: "Pens", dataAiHint: "pens pack" },
  { id: "3", name: "Highlighters (Set of 4)", description: "Assorted fluorescent colors", price: 3.00, stock: 0, imageUrl: "https://placehold.co/64x64.png", category: "Stationery", dataAiHint: "highlighters set" },
];

export default function InventoryPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialMockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for adding/editing product
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productDataAiHint, setProductDataAiHint] = useState("");


  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.name);
      setProductDescription(editingProduct.description);
      setProductPrice(editingProduct.price.toString());
      setProductStock(editingProduct.stock.toString());
      setProductCategory(editingProduct.category || "");
      setProductImageUrl(editingProduct.imageUrl || "");
      setProductDataAiHint(editingProduct.dataAiHint || "");
    } else {
      // Reset form for new product
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductStock("");
      setProductCategory("");
      setProductImageUrl("");
      setProductDataAiHint("");
    }
  }, [editingProduct, isDialogOpen]);


  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(), // Simple ID generation
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice) || 0,
      stock: parseInt(productStock, 10) || 0,
      category: productCategory,
      imageUrl: productImageUrl,
      dataAiHint: productDataAiHint,
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
      toast({ title: "Product Updated", description: `${newProduct.name} has been updated.` });
    } else {
      setProducts([...products, newProduct]);
      toast({ title: "Product Added", description: `${newProduct.name} has been added to inventory.` });
    }
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleAddNewProduct = () => {
    setEditingProduct(null); // Clear editing state
    setIsDialogOpen(true);
  };

  const handleRemoveProduct = (productId: string) => {
    // In a real app, confirm deletion
    setProducts(products.filter(p => p.id !== productId));
    toast({ title: "Product Removed", description: "The product has been removed from inventory.", variant: "destructive" });
  };
  
  const getStockBadgeVariant = (stock: number): "default" | "secondary" | "outline" | "destructive" => {
    if (stock > 20) return "default"; // using primary color
    if (stock > 0) return "secondary"; // using accent color (orange)
    return "destructive";
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Archive className="h-8 w-8 text-primary" /> Inventory Management
            </CardTitle>
            <CardDescription>Add, view, and manage your store's product inventory.</CardDescription>
          </div>
          <Button onClick={handleAddNewProduct} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </CardHeader>
      </Card>

      {products.length > 0 ? (
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] hidden sm:table-cell">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                       <Image
                          src={product.imageUrl || "https://placehold.co/64x64.png"}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                          data-ai-hint={product.dataAiHint || "product image"}
                        />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-xs hidden lg:block">{product.description}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.category ? <Badge variant="outline">{product.category}</Badge> : "-"}
                    </TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStockBadgeVariant(product.stock)}>{product.stock > 0 ? product.stock : "Out of Stock"}</Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)} aria-label="Edit product">
                        <Edit3 className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(product.id)} aria-label="Remove product">
                        <Trash2 className="h-4 w-4 text-destructive" />
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
            <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">Inventory is empty.</p>
            <p className="text-sm text-muted-foreground">Add products to start managing your inventory.</p>
            <Button onClick={handleAddNewProduct} className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add First Product
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the details of this product." : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={productName} onChange={(e) => setProductName(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="col-span-3" required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="col-span-3" placeholder="e.g., Notebooks, Pens" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" type="number" step="0.01" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input id="stock" type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                <Input id="imageUrl" value={productImageUrl} onChange={(e) => setProductImageUrl(e.target.value)} className="col-span-3" placeholder="https://placehold.co/300x200.png" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dataAiHint" className="text-right">AI Hint</Label>
                <Input id="dataAiHint" value={productDataAiHint} onChange={(e) => setProductDataAiHint(e.target.value)} className="col-span-3" placeholder="e.g. notebook pen (max 2 words)" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{editingProduct ? "Save Changes" : "Add Product"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
