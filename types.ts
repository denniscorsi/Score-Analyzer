export interface Parameters {
  years: number[];
  baseline: number[];
  sectionBaseline: number[];
  minTutoringHours: number;
  minTests: number;
  minBestScore: number;
  excludeWithoutBaseline: boolean;
  excludeIncomplete: boolean;
  name: string | null;
  remove: boolean;
}
