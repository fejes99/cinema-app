import { Projection } from 'features/projections/types/Projection';

export interface Movie {
  id: string;
  name: string;
  director: string;
  distributor: string;
  duration: number;
  description?: string;
  country: string;
  year: number;
  trailerUrl?: string;
  projections?: Projection[];
}
