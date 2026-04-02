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
  const router = useRouter();

  // useSearchParams: A client component hook that lets you read the current URL's query string
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);

  // fetch all the available categories
  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`https://dummyjson.com/products/categories`);
      const data = await response.json();
      // console.log(data)
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const getArrayParam = (param) => searchParams.get(param)?.split(",") || []; // categores: "beauty,sports,watches" -> ["beuty", "sports", "watches"]

  const getPriceParam = () => {
    const min = parseInt(searchParams.get("min") || "0"); // get "min" value from query string
    const max = parseInt(searchParams.get("max") || "15999"); // get "max" value from query string
    return [min, max];
  };

  const [selectedCategories, setSelectedCategories] = React.useState(
    getArrayParam("categories")
  ); // selected categories in an array

  const [priceRange, setPriceRange] = React.useState(getPriceParam());

  // update the URL based on filters applied
  const updateURLParams = (params) => {
    const updated = new URLSearchParams(searchParams.toString());

    // console.log("updated categories",updated)

    Object.entries(params).forEach(([key, value]) => {
      console.log("URL update:", { key, value });

      if (!value || (Array.isArray(value) && value.length === 0)) {
        updated.delete(key);
      } else if (Array.isArray(value)) {
        updated.set(key, value.join(",")); // ["cat1", "cat2", "cat3"] -> "cat1,cat2,cat3"
      } else {
        updated.set(key, value.toString());
      }
    });

    console.log("Updated URL query", updated.toString()); //example: categories=home-decoration%2Cmobile-accessories&max=10690
    router.push(`?${updated.toString()}`);
  };

  // add or remove selected categories
  const handleCategoryChange = (categoryId, checked) => {
    const updated = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(updated); // update selectedCategories list
    updateURLParams({ categories: updated }); // update the URL accordingly
  };

  const handlePriceRangeChange = (range) => {
    if (range[0] < range[1]) {
      setPriceRange(range);
      updateURLParams({ min: range[0], max: range[1] });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
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

      <SidebarContent className="p-2">
        {/* Price Range Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium mb-2">
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

        <Separator />

        {/* Categories Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium mb-2">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="flex items-center space-x-2 space-y-2"
                >
                  <Checkbox
                    id={category.slug}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked)
                    }
                  />
                  <Label
                    htmlFor={category.slug}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category.name}
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
