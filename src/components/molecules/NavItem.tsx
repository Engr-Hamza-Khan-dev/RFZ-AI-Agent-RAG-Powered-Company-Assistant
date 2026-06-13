"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/atoms";
import { NavItemType } from "@/types";

interface NavItemProps {
  item: NavItemType;
  onClick?: (id: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ item, onClick }) => (
  <Button
    variant="ghost"
    onClick={() => onClick?.(item.id)}
    className={`w-full justify-start gap-3 px-3 py-2 h-auto text-sm font-medium rounded-lg transition-colors ${
      item.active
        ? "bg-purple-50 text-purple-700 hover:bg-purple-100"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    <Icon
      name={item.iconKey}
      size={16}
      className={item.active ? "text-purple-600" : "text-gray-500"}
    />
    {item.label}
  </Button>
);