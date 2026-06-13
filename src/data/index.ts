import { NavItemType, CompanyStat, SuggestedQuestion } from "@/types";

export const navItems: NavItemType[] = [
  { id: "chat",       label: "Chat with RFZ AI",   iconKey: "chat",       active: true },
  { id: "about",      label: "About RFZ digital",  iconKey: "info" },
  { id: "services",   label: "Services",            iconKey: "settings" },
  { id: "work",       label: "Our Work",            iconKey: "briefcase" },
  { id: "why",        label: "Why Choose Us",       iconKey: "star" },
  { id: "industries", label: "Industries",          iconKey: "grid" },
  { id: "careers",    label: "Careers",             iconKey: "users" },
  { id: "contact",    label: "Contact Us",          iconKey: "phone" },
];

export const companyStats: CompanyStat[] = [
  { iconKey: "calendar", label: "Founded",       value: "2020" },
  { iconKey: "mapPin",   label: "Headquarters",  value: "Pakistan" },
  { iconKey: "users",    label: "Team Size",      value: "25+ Professionals" },
  { iconKey: "smile",    label: "Clients",        value: "100+ Happy Clients" },
  { iconKey: "globe",    label: "Website",        value: "www.rfzdigital.com", isLink: true },
];

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: "1", text: "What services do you offer?" },
  { id: "2", text: "Show me your portfolio" },
  { id: "3", text: "How can RFZ digital help my business?" },
  { id: "4", text: "Tell me about your team" },
];

export const INITIAL_MESSAGE = `Hello! I'm **RFZ AI**, your assistant from RFZ Digital. 😊

RFZ Digital helps businesses grow through digital and technology solutions in the United Kingdom, Ireland, UAE, and worldwide.

We deliver business value through:

- **Website Design & Development**
- **Mobile App Development** (iOS, Android, Cross-platform)
- **Software Development**
- **Search Engine Optimization (SEO)**
- **Digital Marketing**
- **Social Media Management**
- **Graphic Design**
- **Cloud Services**
- **PPC Marketing**
- **Game Development**

Our mission is to empower businesses with modern digital solutions using technology, creativity, and strategy.

Feel free to ask me anything about RFZ Digital's services, process, or how we can support your project. 🚀`;