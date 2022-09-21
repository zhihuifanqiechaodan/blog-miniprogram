import { haloBaseUrl } from '~/config/index';
import { get } from '~/utils/request';

/**
 * @method haloGetApiContentCategories 获取halo博客分类
 * @param {*} data
 */
const haloGetApiContentCategories = (data = {}) => {
  return get({
    url: haloBaseUrl + `/api/content/categories`,
    data,
  });
};

/**
 * @method haloGetApiContentCategoriesPosts 获取halo博客分类文章列表
 * @param {*} data
 */
const haloGetApiContentCategoriesPosts = (data = {}, id) => {
  return get({
    url: haloBaseUrl + `/api/content/categories/${id}/posts`,
    data,
  });
};

export default {
  haloGetApiContentCategories,
  haloGetApiContentCategoriesPosts,
};
