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
          ? "bg-muted text-rfz-primary hover:bg-muted"
          : "text-rfz-muted hover:bg-muted hover:text-foreground"
      }`}
  >
    <Icon
      name={item.iconKey}
      size={16}
      className={item.active ? "text-rfz-primary" : "text-rfz-muted"}
    />
    {item.label}
  </Button>
);