import React from "react";
import {
  MessageSquare, Info, Settings, Briefcase, Star,
  Grid, Users, Phone, Calendar, MapPin, Smile,
  Globe, RotateCcw, Send, ArrowRight, X, ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  chat:       MessageSquare,
  info:       Info,
  settings:   Settings,
  briefcase:  Briefcase,
  star:       Star,
  grid:       Grid,
  users:      Users,
  phone:      Phone,
  calendar:   Calendar,
  mapPin:     MapPin,
  smile:      Smile,
  globe:      Globe,
  refresh:    RotateCcw,
  send:       Send,
  arrowRight: ArrowRight,
  close:      X,
  external:   ExternalLink,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = "" }) => {
  const Component = iconMap[name] ?? Info;
  return <Component size={size} className={className} />;
};