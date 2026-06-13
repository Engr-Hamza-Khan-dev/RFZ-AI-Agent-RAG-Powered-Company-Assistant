import React from "react";
import { Icon } from "@/components/atoms";
import { CompanyStat } from "@/types";
import { ExternalLink } from "lucide-react";

interface StatRowProps {
  stat: CompanyStat;
}

export const StatRow: React.FC<StatRowProps> = ({ stat }) => (
  <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
        <Icon name={stat.iconKey} size={14} className="text-rfz-muted" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-rfz-muted leading-none mb-0.5">{stat.label}</p>
      {stat.isLink ? (
        <a
          href={`https://${stat.value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-rfz-primary hover:underline flex items-center gap-1"
        >
          {stat.value}
          <ExternalLink size={11} />
        </a>
      ) : (
        <p className="text-sm font-semibold text-foreground truncate">{stat.value}</p>
      )}
    </div>
  </div>
);