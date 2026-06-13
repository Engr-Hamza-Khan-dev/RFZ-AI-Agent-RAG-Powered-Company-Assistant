export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  delivered?: boolean;
}

export interface NavItemType {
  id: string;
  label: string;
  iconKey: string;
  active?: boolean;
}

export interface CompanyStat {
  iconKey: string;
  label: string;
  value: string;
  isLink?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}