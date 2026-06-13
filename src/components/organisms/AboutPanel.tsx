"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatRow } from "@/components/molecules";
import { companyStats } from "@/data";
import { X, ArrowRight } from "lucide-react";

interface AboutPanelProps {
  onClose: () => void;
}

export const AboutPanel: React.FC<AboutPanelProps> = ({ onClose }) => (
  <aside className="w-full xl:w-[290px] shrink-0 bg-card border-l border-border flex flex-col h-full overflow-y-auto">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      <h2 className="text-base font-semibold text-foreground">About RFZ digital</h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="w-7 h-7 text-gray-400 hover:text-gray-700"
      >
        <X size={15} />
      </Button>
    </div>

    {/* Company card */}
    <div className="px-5 py-5">
      <div className="flex items-center gap-3 mb-3">
        {/* Mini logo */}
        <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="#7C3AED" />
            <polygon points="14,14 20,10 26,14 24,26 20,30 16,26" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">RFZ digital</p>
          <p className="text-xs text-gray-500 leading-snug">
            Building Digital Experiences.<br />Driving Real Results.
          </p>
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="mt-2 divide-y divide-border">
        {companyStats.map((stat) => (
          <StatRow key={stat.label} stat={stat} />
        ))}
      </div>
    </div>

    <Separator />

    {/* What We Do */}
    <div className="px-5 py-5">
      <h3 className="text-sm font-bold text-foreground mb-2">What We Do</h3>
      <p className="text-xs text-rfz-muted leading-relaxed">
        We help startups and enterprises build, grow, and scale their online
        presence with end-to-end digital solutions.
      </p>
      <Button
        variant="link"
        size="sm"
        className="px-0 mt-2 text-purple-600 text-xs font-medium hover:text-purple-800 gap-1"
      >
        Explore Services <ArrowRight size={12} />
      </Button>
    </div>

    <Separator />

    {/* CTA Banner */}
    <div className="m-5 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 p-5">
      <p className="text-white text-sm font-semibold mb-0.5">
        Let&apos;s build something great together
      </p>
      <p className="text-purple-200 text-xs mb-4">Have a project in mind?</p>
      <Button
        size="sm"
        className="w-full bg-white text-purple-700 hover:bg-purple-50 font-semibold text-xs gap-1"
      >
        Contact Our Team <ArrowRight size={12} />
      </Button>
    </div>
  </aside>
);