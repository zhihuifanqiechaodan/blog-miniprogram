import { haloBaseUrl } from '~/config/index';
import { get } from '~/utils/request';

/**
 * @method haloGetApiContentStatistics 获取halo博客统计信息
 * @param {*} data
 */
const haloGetApiContentStatistics = (data = {}) => {
  return get({
    url: haloBaseUrl + "/api/content/statistics",
    data,
  });
};

export default {
  haloGetApiContentStatistics,
};
