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
  grade: string;
  improve: string;
}

export interface DBPoomsaes {
  _id: string;
  name: string;
  poses: { name: string; picture: string; description: string }[];
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
  grade: string;
  name: string;
  improve: string;
}

export enum BodyPart {
  'rightax' = 'Axila Derecha',
  'leftax' = 'Axila Izquierda',
  'rightcodo' = 'Codo Derecho',
  'leftcodo' = 'Codo Izquierdo',
  'distancefeet' = 'Distancia entre pies',
  'distanceknees' = 'Distancia entre rodillas',
}
