import { createVuePlugin } from 'vite-plugin-vue2'
import amdBabel from 'vite-plugin-amd-babel';
export default {
  plugins: [createVuePlugin(), amdBabel(
    // {
    //   requirejs: "/js/require.min.js"//从cdn下载下来放到public
    // }
  )]
}
