"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCard({ product }) {
  const {
    id,
    title,
    thumbnail,
    price,
    discountPercentage,
    brand,
    rating,
  } = product;

  const hasDiscount = discountPercentage > 0;
  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <Card className="group rounded-4xl border p-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* IMAGE SECTION */}
      <CardContent className="p-0 m-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              width={400}
              height={400}
              className="block w-full h-full object-fill group-hover:scale-103 transition-transform duration-300"
            />
          </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="p-5 bg-neutral-100 border-t h-full">
        <div className="w-full">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              {/* Title */}
              <h3 className="font-medium text-sm line-clamp-2">{title}</h3>

              {/* Brand */}
              <span className="text-gray-500 text-sm">
                {brand || "non branded"}
              </span>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-1 text-xs">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = typeof rating === "number" ? rating : 0;
                  const isFilled = index < Math.round(value);

                  return (
                    <Star
                      key={index}
                      className={`h-3 w-3 ${
                        isFilled
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  );
                })}
                <span className="ml-1 text-[10px] text-gray-500">
                  {typeof rating === "number" ? rating.toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="leading-tight text-right">
              <span className="text-base font-semibold text-green-800">
                ${price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
