export interface DBHistoryItem {
  _id: string;
  poomsae: string;
  pose: string;
  date: number | string;
  picture?: string;
  observations: DBObservation[];
}

export interface DBObservation {
  name: string;
  grade: number;
  improve: string;
}

export interface DBPoomsaes {
  _id: string;
  name: string;
  poses: { name: string; picture: string }[];
}

export interface ModHistory {
  [key: string]: HistoryItem;
}

export interface HistoryItem {
  poomsae: string;
  pose: string;
  lastPractice?: string;
  bestGrade?: number;
  rate: number;
  practices: DBHistoryItem[];
}

export interface GradesResponse {
  calificacion: string;
  name: string;
}
