export type GameId = 'game1' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6';

export interface GameInfo {
  id: GameId;
  title: string;
  shortTitle: string;
  badge: string;
  icon: string;
  description: string;
  color: string;
}

export interface SortItem {
  id: string;
  name: string;
  icon: string;
  category: 'school_tool' | 'not_school_tool';
  hint: string;
  illustrationColor: string;
}

export interface QuizQuestion {
  id: string;
  itemIcon: string;
  itemName: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface RelayItem {
  id: string;
  name: string;
  icon: string;
  sampleAnswer: string;
  hint: string;
}

export interface PunctuationQuestion {
  id: string;
  sentenceBefore: string;
  sentenceAfter?: string;
  correctMark: '.' | '?';
  type: 'statement' | 'question';
  clueWord?: string;
  explanation: string;
}

export interface BallQuestion {
  id: string;
  text: string;
  targetBasket: 'item_name' | 'purpose' | 'punctuation' | 'preservation';
  hint?: string;
}

export interface RescueDoor {
  id: number;
  title: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    icon?: string;
  }[];
  rewardTip: string;
}
