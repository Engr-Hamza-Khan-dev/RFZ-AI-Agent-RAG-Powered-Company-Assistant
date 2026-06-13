"use client";

import React from "react";
import {
  AboutPanel,
  ServicesPanel,
  WorkPanel,
  InfoPanel,
} from "@/components/organisms";

interface Props {
  activeNav: string;
  showAbout: boolean;
  setShowAbout: (v: boolean) => void;
  setActiveNav: (id: string) => void;
}

export const ChatRightPanels: React.FC<Props> = ({ activeNav, showAbout, setShowAbout, setActiveNav }) => {
  return (
    <>
      {/* About Panel */}
      {showAbout && activeNav === "about" && (
        <div className="hidden xl:flex">
          <AboutPanel onClose={() => setShowAbout(false)} />
        </div>
      )}

      {/* Services Panel */}
      {activeNav === "services" && (
        <div className="hidden xl:flex">
          <ServicesPanel onClose={() => setActiveNav("chat")} />
        </div>
      )}

      {/* Work Panel */}
      {activeNav === "work" && (
        <div className="hidden xl:flex">
          <WorkPanel onClose={() => setActiveNav("chat")} />
        </div>
      )}

      {/* Why Choose Us Panel */}
      {activeNav === "why" && (
        <div className="hidden xl:flex">
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
      )}

      {/* Industries Panel */}
      {activeNav === "industries" && (
        <div className="hidden xl:flex">
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
      )}

      {/* Careers Panel */}
      {activeNav === "careers" && (
        <div className="hidden xl:flex">
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
      )}

      {/* Contact Panel */}
      {activeNav === "contact" && (
        <div className="hidden xl:flex">
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
      )}
    </>
  );
};
