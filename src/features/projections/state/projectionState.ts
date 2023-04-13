import { Error } from 'common/types/Error';
import { Projection } from '../types/Projection';

export interface ProjectionState {
  projections: Projection[];
  selectedProjection: Projection | null;
  loading: boolean;
  error: Error | null;
}
