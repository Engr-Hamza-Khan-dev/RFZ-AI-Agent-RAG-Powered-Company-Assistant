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
    className="shrink-0 h-9 px-4 rounded-full border-gray-200 text-gray-600 text-xs font-medium hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-colors whitespace-nowrap"
  >
    {question.text}
  </Button>
);
