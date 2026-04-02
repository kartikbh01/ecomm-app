"use client";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Navbar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // debouncing
  const handleChange = useDebouncedCallback((term) => {

    // URLSearchParams -> A JS API to handle url search parameters
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    console.log("search params",params.toString())
    replace(`${"/"}?${params.toString()}`);
  }, 1000);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Logo and Sidebar Trigger */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                E
              </span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              EcommStore
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              defaultValue={searchParams.get("q") || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
