"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SuggestedQuestion as SuggestedQuestionType } from "@/types";

interface SuggestedQuestionProps {
  question: SuggestedQuestionType;
  onClick: (text: string) => void;
}

export const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({ question, onClick }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => onClick(question.text)}
    className="shrink-0 h-9 px-4 rounded-full border-rfz text-rfz-muted text-xs font-medium hover:border-rfz hover:text-rfz-primary hover:bg-muted transition-colors whitespace-nowrap"
  >
    {question.text}
  </Button>
);
