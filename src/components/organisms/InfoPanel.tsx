"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ArrowRight, Check } from "lucide-react";

interface InfoPanelProps {
  title: string;
  icon?: string;
  items: string[];
  description: string;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  title,
  items,
  description,
  onClose,
}) => {
  return (
    <aside className="w-full xl:w-[290px] shrink-0 bg-card border-l border-border flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-7 h-7 text-gray-400 hover:text-gray-700"
        >
          <X size={15} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5">
        <p className="text-sm text-rfz-muted mb-4">{description}</p>

        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <Check size={16} className="text-green-600 mt-1 shrink-0" />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* CTA */}
      <div className="p-5">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2">
          Learn More <ArrowRight size={14} />
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Ask RFZ AI for more details
        </p>
      </div>
    </aside>
  );
};
