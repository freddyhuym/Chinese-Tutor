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
import logo from "@/assets/heartbeat-chinese-logo.png";

export function Header() {
  const [location] = useLocation();
  const menuItems = [
    { href: "/", label: "首頁" },
    { href: "/chapter1", label: "第一章" },
    { href: "/chapter2", label: "第二章" },
    { href: "/chapter3", label: "第三章" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-rose-50/30 to-white backdrop-blur-lg border-b border-rose-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Brand Name */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img 
                src={logo} 
                alt="心動中文 Heartbeat Chinese Logo" 
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 drop-shadow-md"
              />
              <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-display font-bold text-slate-900 leading-tight group-hover:text-rose-600 transition-colors duration-300">
                Heartbeat Chinese
              </span>
              <span className="text-sm sm:text-base md:text-lg font-bold font-chinese text-rose-500/90 tracking-wide leading-tight">
                心動中文
              </span>
            </div>
          </Link>

          {/* Right: Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 sm:h-11 sm:w-11 text-slate-600 hover:text-rose-600 hover:bg-rose-50/80 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-rose-100 bg-gradient-to-b from-white to-rose-50/30">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-display font-bold text-slate-900">
                  Heartbeat Chinese
                </SheetTitle>
                <p className="text-lg font-chinese text-rose-500/90 mt-1">
                  心動中文
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pl-2">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className="flex items-center group cursor-pointer py-2 px-3 rounded-lg hover:bg-rose-50/80 transition-all duration-300">
                      <span
                        className={`text-lg font-medium font-serif-chinese transition-all duration-300 ${
                          location === item.href
                            ? "text-rose-600 font-bold translate-x-2"
                            : "text-slate-600 group-hover:text-rose-500 group-hover:translate-x-1"
                        }`}
                      >
                        {item.label}
                      </span>
                      {location === item.href && (
                        <div className="ml-auto w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
