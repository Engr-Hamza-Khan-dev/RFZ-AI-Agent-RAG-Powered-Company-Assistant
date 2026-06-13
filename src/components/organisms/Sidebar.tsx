"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/atoms";
import { NavItem } from "@/components/molecules";
import { navItems } from "@/data";
import { Icon } from "@/components/atoms";

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavChange }) => {
  const items = navItems.map((item) => ({
    ...item,
    active: item.id === activeNav,
  }));

  return (
    <aside className="w-[230px] shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {items.map((item) => (
          <NavItem key={item.id} item={item} onClick={onNavChange} />
        ))}
      </nav>

      <Separator />

      {/* Human support CTA */}
      <div className="p-4">
        <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-0.5">
            Need human support?
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Our team is here to help you
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
          >
            Contact Us
            <Icon name="arrowRight" size={13} />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-400">© 2024 RFZ digital</p>
        <p className="text-xs text-gray-400">All rights reserved</p>
      </div>
    </aside>
  );
};