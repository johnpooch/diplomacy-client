import { urlConf } from '../urls';

import { apiAction } from './api';

const apiActions = {};
Object.values(urlConf).forEach((conf) => {
  apiActions[conf.name] = apiAction(conf);
});

export default apiActions;
