import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    movies: [],
    totalCount: 0,
    noMoreData: false
  },
  mutations: {
    UPDATE_MOVIES_BASE_INFO(state, datas) {
      // 记录已有的post数量
      state.totalCount += datas.results.length;
      state.movies = datas.results;
      // 判断是否还有更多
      state.noMoreData = state.totalCount >= datas.count;
    },
    CLAER_MOVIES_BASE_INFO(state) {
      console.log('clear movies');
      state.movies = [];
      state.totalCount = 0;
      state.noMoreData = false;
    }
  },
  actions: {
    // 获取文章列表信息
    GET_MOVIES_BASE_INFO({state, commit}, {params, reset}) {
      return new Promise((resolve, reject) => {
        API.getMovieBaseInfo(params).then((response) => {
          // 更新文章
          if (reset) {
            // 如果是重置，则先删除原有数据
            commit('CLAER_MOVIES_BASE_INFO');
          }
          commit('UPDATE_MOVIES_BASE_INFO', response.data);
          commit('UPDATE_DOCUMENT_TITLE', '电影列表', { root: true });
          commit('UPDATE_DOCUMENT_DESCRIPTION', '电影列表', { root: true });
          commit('UPDATE_DOCUMENT_KEYWORDS', '电影列表', { root: true });
          resolve(response);
        }).catch((error) => {
          handleError(error);
          reject(error);
        });
      });
    }
  }
};
