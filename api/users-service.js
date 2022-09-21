import { haloBaseUrl } from '~/config/index';
import { get } from '~/utils/request';

/**
 * @method addCnRegionAllArea 获取halo博客博主信息
 * @param {*} data
 */
const haloGetApiContentUsersProfile = (data = {}) => {
  return get({
    url: haloBaseUrl + '/api/content/users/profile',
    data,
  });
};

export default {
  haloGetApiContentUsersProfile,
};
