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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-1">
          {/* Top Row: English Title - Elegant & Sophisticated */}
          <div className="flex items-baseline gap-2">
             <span className="text-3xl md:text-4xl font-display font-bold italic tracking-tight text-slate-900 drop-shadow-sm">
                Let’s Speak Chinese
             </span>
             <span className="text-lg md:text-xl font-display text-rose-500 font-medium tracking-wide">
                Dating Edition
             </span>
          </div>

          {/* Bottom Row: Chinese Badge + Menu - Soft & Modern */}
          <div className="flex items-center justify-between mt-1">
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 inline-flex items-center justify-center">
               <span className="text-sm md:text-base font-bold font-chinese text-rose-600 whitespace-nowrap tracking-widest">
                 說中文吧：約會篇
               </span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-rose-100">
                <SheetHeader>
                  <SheetTitle className="font-display text-left mb-8 text-3xl italic text-slate-800">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 pl-2">
                  {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className="flex items-center group cursor-pointer">
                        <span
                          className={`text-xl font-medium font-serif-chinese transition-all duration-300 ${
                            location === item.href
                              ? "text-rose-500 font-bold translate-x-2"
                              : "text-slate-600 group-hover:text-rose-400 group-hover:translate-x-1"
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
