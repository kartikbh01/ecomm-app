"use client";
import * as React from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export function EcommerceSidebar() {
  const [categories, setCategories] = useState([
    "Beauty",
    "Furniture",
    "Grocery",
    "Smartphone",
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const getArrayParam = (param) => searchParams.get(param)?.split(",") || [];
  const getPriceParam = () => {
    const min = parseInt(searchParams.get("min") || "0", 10);
    const max = parseInt(searchParams.get("max") || "15999", 10);
    return [min, max];
  };

  const [selectedCategories, setSelectedCategories] = React.useState(
    getArrayParam("categories")
  );
  const [priceRange, setPriceRange] = React.useState(getPriceParam());

  const updateURLParams = (params) => {
    const updated = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        updated.delete(key);
      } else if (Array.isArray(value)) {
        updated.set(key, value.join(","));
      } else {
        updated.set(key, value.toString());
      }
    });

    router.push(`?${updated.toString()}`);
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updated = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(updated);
    updateURLParams({ categories: updated });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    updateURLParams({ min: range[0], max: range[1] });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 15999]);
    updateURLParams({ categories: [], brands: [], min: null, max: null });
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-8 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Price Range Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium mb-3">
            Price Range
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={15999}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6" />

        {/* Categories Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium mb-3">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.slug}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked)
                    }
                  />
                  <Label
                    htmlFor={category.slug}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
