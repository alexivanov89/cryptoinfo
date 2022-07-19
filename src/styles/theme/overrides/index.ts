import { merge } from 'lodash';
import { Paper } from './Paper';

export const componentsOverrides = () => {
  return merge(
    Paper(),
    // Input(),
    // Button(),
  );
};
