import { defineConfig } from 'umi';
import routes from './src/config/routes'
export default defineConfig({
  layout:{
    name: '兵哥', 
    locale: true,
    logo: 'https://ftp.bmp.ovh/imgs/2019/11/8dea885bcee7fb02.png'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  dva: {
    immer: true,
    hmr: true,
  },
});
