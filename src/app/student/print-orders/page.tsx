
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import type { PrintSpecification } from "@/types";
import { useState, useEffect, type FormEvent } from "react";
import { UploadCloud, Printer, PlusCircle, FileText } from "lucide-react";

export default function PrintOrdersPage() {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState<PrintSpecification["paperSize"]>("A4");
  const [color, setColor] = useState<PrintSpecification["color"]>("Black & White");
  const [twoSided, setTwoSided] = useState(false);
  const [notes, setNotes] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);


  const calculatePrice = () => {
    // Basic price estimation logic
    let price = 0;
    if (!fileName || copies <=0) {
      setEstimatedPrice(null);
      return;
    }

    // Example pricing in Rupees
    price += copies * (paperSize === "A3" ? 12 : 8); // Base price per copy/paper size in INR
    if (color === "Color") {
      price += copies * (paperSize === "A3" ? 24 : 16); // Additional for color in INR
    }
    if (twoSided) {
      price += copies * 4; // Additional for two-sided in INR
    }
    setEstimatedPrice(price);
  };

  useEffect(calculatePrice, [fileName, copies, paperSize, color, twoSided]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      toast({ title: "File Name Required", description: "Please enter a name for your document.", variant: "destructive" });
      return;
    }
    if (copies <=0) {
      toast({ title: "Invalid Copies", description: "Number of copies must be greater than 0.", variant: "destructive" });
      return;
    }

    const printOrder: PrintSpecification = { fileName, copies, paperSize, color, twoSided, notes };
    // In a real app, this would add to cart or a print queue service
    console.log("Print Order Submitted:", printOrder);
    toast({
      title: "Print Order Added to Cart!",
      description: `${fileName} - ${copies} cop${copies > 1 ? 'ies' : 'y'}. Estimated: ₹${estimatedPrice?.toFixed(2) ?? 'N/A'}`,
      variant: "default",
    });
    // Reset form (optional)
    setFileName("");
    setCopies(1);
    setPaperSize("A4");
    setColor("Black & White");
    setTwoSided(false);
    setNotes("");
    setEstimatedPrice(null);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Printer className="h-8 w-8 text-primary" />
            Place a Print Order
          </CardTitle>
          <CardDescription>Specify your document details and add to cart for printing.</CardDescription>
        </CardHeader>
      </Card>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-6 w-6" />Document Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-name">Document Name / Description</Label>
              <Input 
                id="file-name" 
                placeholder="e.g., Physics_Assignment_Chapter3.pdf" 
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Note: Actual file upload is not part of this demo. Please provide a descriptive name.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies</Label>
                <Input 
                  id="copies" 
                  type="number" 
                  min="1" 
                  value={copies}
                  onChange={(e) => setCopies(parseInt(e.target.value, 10))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paper-size">Paper Size</Label>
                <Select value={paperSize} onValueChange={(value: PrintSpecification["paperSize"]) => setPaperSize(value)}>
                  <SelectTrigger id="paper-size">
                    <SelectValue placeholder="Select paper size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Option</Label>
              <RadioGroup defaultValue="Black & White" value={color} onValueChange={(value: PrintSpecification["color"]) => setColor(value)} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Black & White" id="bw" />
                  <Label htmlFor="bw">Black & White</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Color" id="color" />
                  <Label htmlFor="color">Color</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="two-sided" checked={twoSided} onCheckedChange={(checked) => setTwoSided(checked as boolean)} />
              <Label htmlFor="two-sided" className="cursor-pointer">Print on both sides (Two-sided)</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="e.g., Staple on top-left, specific pages to print." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {estimatedPrice !== null && (
               <div className="p-3 bg-muted rounded-md">
                 <p className="text-sm font-medium text-foreground">Estimated Price: <span className="text-lg font-semibold text-primary">₹{estimatedPrice.toFixed(2)}</span></p>
                 <p className="text-xs text-muted-foreground">Final price may vary based on final review by shop.</p>
               </div>
            )}

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!fileName || copies <= 0}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Print Order to Cart
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

    