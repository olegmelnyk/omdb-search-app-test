/**
 *
 * Asynchronously loads the component for MoviesSearch
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
