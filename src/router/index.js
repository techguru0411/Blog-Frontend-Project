import Vue from 'vue';
import Router from 'vue-router';
import {LoadingBar} from 'iview';
const Index = resolve => require(['@/components/index/Index'], resolve);

// 公共区域
const SimpleHeader = resolve => require(['@/components/header/SimpleHeader/SimpleHeader'], resolve);
const CommonFooter = resolve => require(['@/components/footer/CommonFooter'], resolve);

// 首页
const HomeContent = resolve => require(['@/components/content/HomeContent'], resolve);
const ArticleContent = resolve => require(['@/components/content/ArticleContent'], resolve);
const ArticleHomeContent = resolve => require(['@/components/content/ArticleHomeContent'], resolve);
const ArticleListContent = resolve => require(['@/components/content/ArticleListContent'], resolve);
const AlbumHomeContent = resolve => require(['@/components/content/AlbumHomeContent'], resolve);
const AlbumListContent = resolve => require(['@/components/content/AlbumListContent'], resolve);
const MovieContent = resolve => require(['@/components/content/MovieContent'], resolve);
const MovieHomeContent = resolve => require(['@/components/content/MovieHomeContent'], resolve);
const MovieListContent = resolve => require(['@/components/content/MovieListContent'], resolve);
const AlbumPreviewContent = resolve => require(['@/components/content/AlbumPreviewContent'], resolve);
const TimeLineContent = resolve => require(['@/components/content/TimeLineContent'], resolve);

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: HomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '首页'
          }
        },
        {
          path: 'articles',
          name: 'articles',
          components: {
            header: SimpleHeader,
            content: ArticleHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章'
          }
        },
        {
          path: 'article/detail/:articleId',
          name: 'article/detail',
          components: {
            header: SimpleHeader,
            content: ArticleContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章详情',
            need_log: false
          }
        },
        {
          path: 'albums',
          name: 'albums',
          components: {
            header: SimpleHeader,
            content: AlbumHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '图集',
            need_log: false
          }
        },
        {
          path: 'album/detail/:albumId',
          name: 'album/detail',
          components: {
            content: AlbumPreviewContent
          },
          meta: {
            title: '图集详情',
            need_log: false
          }
        },
        {
          path: 'movies',
          name: 'movies',
          components: {
            header: SimpleHeader,
            content: MovieHomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影',
            need_log: false
          }
        },
        {
          path: 'movie/detail/:movieId',
          name: 'movie/detail',
          components: {
            header: SimpleHeader,
            content: MovieContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影详情',
            need_log: false
          }
        },
        {
          path: 'timeline',
          name: 'timeline',
          components: {
            header: SimpleHeader,
            content: TimeLineContent,
            footer: CommonFooter
          },
          meta: {
            title: '时光轴',
            need_log: false
          }
        },
        {
          path: 'articles/category/:categoryId',
          name: 'articles/category',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章列表',
            need_log: false
          }
        },
        {
          path: 'albums/category/:categoryId',
          name: 'albums/category',
          components: {
            header: SimpleHeader,
            content: AlbumListContent,
            footer: CommonFooter
          },
          meta: {
            title: '图集列表',
            need_log: false
          }
        },
        {
          path: 'movies/category/:categoryId',
          name: 'movies/category',
          components: {
            header: SimpleHeader,
            content: MovieListContent,
            footer: CommonFooter
          },
          meta: {
            title: '电影列表',
            need_log: false
          }
        }
      ]
    }
  ]
});

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  document.title = '加载中...';
  next();
});

let titleIdiom = [
  '蜂采百花酿甜蜜，人读群书明真理',
  '己所不欲，勿施于人',
  '理想是人生的太阳',
  '人生贵知心，定交无暮早',
  '真实是人生的命脉，是一切价值的根基',
  '人生中最困难者，莫过于选择',
  '有所作为是生活的最高境界',
  '爱情不过是一种疯'
];

router.afterEach((to, from, next) => {
  // 停止进度条
  LoadingBar.finish();
  // 修改网页标题
  document.title = to.matched[to.matched.length - 1].meta.title + ' - ' + titleIdiom[Math.floor(Math.random() * titleIdiom.length)];
  window.scrollTo(0, 0);
});

export default router;
