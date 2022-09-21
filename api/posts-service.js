import { haloBaseUrl } from '~/config/index';
import { get } from '~/utils/request';

/**
 * @method haloGetApiContentPosts 获取halo博客文章
 * @param {*} data
 */
const haloGetApiContentPosts = (data = {}, id = "") => {
  return get({
    url: haloBaseUrl + `/api/content/posts/${id}`,
    data,
  });
};

export default {
  haloGetApiContentPosts,
};
