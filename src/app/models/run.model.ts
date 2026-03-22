export interface Run {
  id: string;
  date: string;
  time: number; // em segundos
  distance: number; // em km
  notes?: string;
  createdAt: Date;
}
