export interface MeanHistory {
  term: string;
  score: number;
}

export interface GradeDistribute {
  label: string;
  count: number;
}

export interface RankAnalysis {
  distribute: GradeDistribute[];
  rank: number;
}

export interface TermInfo {
  term: string;
  rank: number;
}

export interface GradeDetail {
  name: string;
  credit: number;
  score?: number;
  dev?: number;
  isSpecial?: boolean;
  special?: string;
}
