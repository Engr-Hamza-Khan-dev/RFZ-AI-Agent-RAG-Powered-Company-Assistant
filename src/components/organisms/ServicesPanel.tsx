"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ArrowRight } from "lucide-react";

interface ServicesPanelProps {
  onClose: () => void;
}

export const ServicesPanel: React.FC<ServicesPanelProps> = ({ onClose }) => {
  const services = [
    {
      title: "Website Design & Development",
      description: "Custom, responsive websites built with modern technologies"
    },
    {
      title: "Mobile App Development",
      description: "Native iOS/Android and cross-platform apps (React Native, Flutter)"
    },
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs"
    },
    {
      title: "Search Engine Optimization (SEO)",
      description: "Improve your online visibility and organic traffic"
    },
    {
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to reach your audience"
    },
    {
      title: "Social Media Management",
      description: "Engage and grow your audience across platforms"
    },
    {
      title: "Graphic Design",
      description: "Creative visual solutions for your brand"
    },
    {
      title: "Cloud Services",
      description: "Scalable and secure cloud infrastructure"
    },
    {
      title: "PPC Marketing",
      description: "Targeted advertising campaigns for maximum ROI"
    },
    {
      title: "Game Development",
      description: "Engaging games and interactive experiences"
    },
  ];

  return (
    <aside className="w-full xl:w-[290px] shrink-0 bg-card border-l border-border flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
        <h2 className="text-base font-semibold text-foreground">Services</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-7 h-7 text-gray-400 hover:text-gray-700"
        >
          <X size={15} />
        </Button>
      </div>

      {/* Services List */}
      <div className="flex-1 px-5 py-4 space-y-3">
        {services.map((service, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-muted hover:bg-muted/95 transition-colors cursor-pointer">
            <h3 className="text-sm font-semibold text-foreground mb-1">{service.title}</h3>
            <p className="text-xs text-rfz-muted">{service.description}</p>
          </div>
        ))}
      </div>

      <Separator />

      {/* CTA */}
      <div className="p-5">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2">
          Get Started <ArrowRight size={14} />
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Have questions? Ask RFZ AI about our services
        </p>
      </div>
    </aside>
  );
};
