import { Error } from 'common/types/Error';
import { ProjectionType } from '../types/ProjectionType';

export interface ProjectionTypeState {
  projectionTypes: ProjectionType[];
  loading: boolean;
  error: Error | null;
}
