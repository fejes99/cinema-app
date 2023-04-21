import { Projection } from 'features/projections/types/Projection';

export interface Movie {
  id: string;
  name: string;
  director: string;
  duration: number;
  distributor: string;
  description?: string;
  country: string;
  year: number;
  trailerUrl?: string;
  projections?: Projection[];
}
