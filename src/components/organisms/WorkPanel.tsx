"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ArrowRight } from "lucide-react";

interface WorkPanelProps {
  onClose: () => void;
}

export const WorkPanel: React.FC<WorkPanelProps> = ({ onClose }) => {
  const projects = [
    {
      title: "E-Commerce Mobile App",
      category: "Mobile App Development",
      description: "Native iOS and Android shopping app with payment gateway integration"
    },
    {
      title: "Fitness Tracking Platform",
      category: "Mobile & Web Development",
      description: "Cross-platform app (iOS/Android) with web dashboard for health metrics"
    },
    {
      title: "Enterprise Management App",
      category: "Mobile App Development",
      description: "React Native application for employee management and workflows"
    },
    {
      title: "E-Commerce Web Platform",
      category: "Web Development",
      description: "Full-stack e-commerce solution with advanced features and analytics"
    },
    {
      title: "SaaS Dashboard",
      category: "Software Development",
      description: "Real-time analytics dashboard with secure backend API"
    },
    {
      title: "Logistics Tracking App",
      category: "Mobile App Development",
      description: "Real-time GPS tracking and delivery management system"
    },
    {
      title: "Social Commerce Platform",
      category: "Web & Mobile Development",
      description: "Full-stack marketplace with mobile and web interfaces"
    },
    {
      title: "AI-Powered Chat Application",
      category: "Software Development",
      description: "Intelligent chatbot system with NLP and machine learning"
    },
  ];

  return (
    <aside className="w-full xl:w-[290px] shrink-0 bg-card border-l border-border flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
        <h2 className="text-base font-semibold text-foreground">Our Work</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-7 h-7 text-gray-400 hover:text-gray-700"
        >
          <X size={15} />
        </Button>
      </div>

      {/* Projects List */}
      <div className="flex-1 px-5 py-4 space-y-3">
        {projects.map((project, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-rfz hover:border-rfz hover:bg-muted transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-900">{project.title}</h3>
            </div>
            <p className="text-xs text-rfz-primary font-medium mb-1">{project.category}</p>
            <p className="text-xs text-rfz-muted">{project.description}</p>
          </div>
        ))}
      </div>

      <Separator />

      {/* CTA */}
      <div className="p-5">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2">
          View Portfolio <ArrowRight size={14} />
        </Button>
      </div>
    </aside>
  );
};
