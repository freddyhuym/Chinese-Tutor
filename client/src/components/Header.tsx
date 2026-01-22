import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();
  const menuItems = [
    { href: "/", label: "首頁" },
    { href: "/philosophy", label: "編寫理念" },
    { href: "/chapter1", label: "第一章" },
    { href: "/chapter2", label: "第二章" },
    { href: "/chapter3", label: "第三章" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3">
          {/* Top Row: English Title */}
          <div>
             <span className="text-xl md:text-2xl font-semibold font-serif-chinese tracking-wide">
                Let’s Speak Chinese: Dating Edition
             </span>
          </div>

          {/* Bottom Row: Chinese Badge + Menu */}
          <div className="flex items-center justify-between">
            <div className="px-4 py-2 rounded-lg bg-primary inline-flex items-center justify-center">
               <span className="text-base font-bold font-chinese text-primary-foreground whitespace-nowrap">
                 說中文吧：約會篇
               </span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-serif-chinese text-left mb-6 text-2xl">
                    目錄 Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6">
                  {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className="flex items-center justify-between group cursor-pointer">
                        <span
                          className={`text-xl font-medium font-serif-chinese transition-colors ${
                            location === item.href
                              ? "text-primary font-bold"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
