import { ProjectionType } from 'features/projections/types/ProjectionType';
import { Seat } from './Seat';

export interface Theater {
  id: string;
  name: string;
  projectionTypes: ProjectionType[];
  seats: Seat[];
}
