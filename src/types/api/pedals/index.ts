import { PedalType } from '@/types/Pedal';
import { ZodIssue } from 'zod';

export interface GetPedals {
  error: string | ZodIssue[] | null;
  pedals: Array<PedalType> | null;
}
