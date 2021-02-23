import { apiAction } from './api';
import { urlConf } from '../urls';

const apiActions = {};
Object.values(urlConf).forEach((conf) => {
  apiActions[conf.name] = apiAction(conf);
});

export default apiActions;
