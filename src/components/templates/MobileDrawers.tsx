"use client";

import React from "react";
import { AboutPanel, ServicesPanel, WorkPanel, InfoPanel } from "@/components/organisms";

interface Props {
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const MobileDrawers: React.FC<Props> = ({ activeNav, setActiveNav }) => {
  return (
    <>
      {/* Mobile About Panel Drawer */}
      {activeNav === "about" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close about panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <AboutPanel onClose={() => setActiveNav("chat")} />
          </div>
        </div>
      )}

      {/* Mobile Services Panel Drawer */}
      {activeNav === "services" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close services panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <ServicesPanel onClose={() => setActiveNav("chat")} />
          </div>
        </div>
      )}

      {/* Mobile Work Panel Drawer */}
      {activeNav === "work" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close work panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <WorkPanel onClose={() => setActiveNav("chat")} />
          </div>
        </div>
      )}

      {/* Mobile Info Panels (why, industries, careers, contact) */}
      {activeNav === "why" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <InfoPanel
              title="Why Choose Us"
              description="RFZ Digital stands out for our commitment to excellence, innovation, and client success. Here's what sets us apart:"
              items={[
                "Expert team with 20+ years of combined experience",
                "Custom solutions tailored to your business needs",
                "Proven track record with 100+ successful projects",
                "Dedicated support and ongoing optimization",
                "Cost-effective pricing with transparent billing",
                "Latest technologies and best practices",
                "Fast turnaround times without compromising quality",
                "Partnership approach - your success is our success",
              ]}
              onClose={() => setActiveNav("chat")}
            />
          </div>
        </div>
      )}

      {activeNav === "industries" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <InfoPanel
              title="Industries We Serve"
              description="We have experience working across various industries and understand sector-specific challenges:"
              items={[
                "E-Commerce & Retail",
                "Technology & SaaS",
                "Healthcare & Wellness",
                "Finance & Banking",
                "Real Estate & Property",
                "Education & EdTech",
                "Entertainment & Media",
                "Manufacturing & Industry",
                "Hospitality & Tourism",
                "Non-Profit & NGO",
              ]}
              onClose={() => setActiveNav("chat")}
            />
          </div>
        </div>
      )}

      {activeNav === "careers" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <InfoPanel
              title="Join Our Team"
              description="We're always looking for talented individuals to join our growing team. Current opportunities:"
              items={[
                "Senior Full Stack Developer",
                "UI/UX Designer",
                "SEO Specialist",
                "Digital Marketing Manager",
                "Quality Assurance Engineer",
                "Project Manager",
                "Business Development Executive",
                "Competitive salary & benefits package",
                "Remote and office options available",
                "Career growth and training opportunities",
              ]}
              onClose={() => setActiveNav("chat")}
            />
          </div>
        </div>
      )}

      {activeNav === "contact" && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/40">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setActiveNav("chat")}
            aria-label="Close panel"
          />
          <div className="absolute inset-y-0 right-0 w-full bg-white border-l border-gray-100 shadow-xl">
            <InfoPanel
              title="Contact Us"
              description="Get in touch with RFZ Digital. We'd love to hear from you and discuss how we can help your business:"
              items={[
                "Email: info@rfzdigital.com",
                "Phone: +92 (0) 123 456 7890",
                "Website: www.rfzdigital.com",
                "Headquarters: Pakistan",
                "Hours: Monday - Friday, 9 AM - 6 PM",
                "Available for consultations & demos",
                "Quick response time - typically within 24 hours",
                "Schedule a free discovery call with our team",
              ]}
              onClose={() => setActiveNav("chat")}
            />
          </div>
        </div>
      )}
    </>
  );
};
