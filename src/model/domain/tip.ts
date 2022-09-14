import { BaseModel } from '@/firebase/db/base-model';

export interface Tip extends BaseModel {
  playerId: string;
  matchId: string;
  tip: string;
  joker: boolean;
  points: number;
  lonelyHit?: boolean;
}
