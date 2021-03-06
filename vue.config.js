module.exports = {
    // 全局样式引用
    css:{
        loaderOptions:{
            sass:{
                data:`
                    @import "@/assets/css/variable.scss"; 
                    @import "@/assets/css/common.scss";
                    @import "@/assets/css/mixin.scss";
               `
            }
        }
    },
    // resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js',
    //         '@': resolve('src'),
    //         'scss_vars': '@/styles/vars.scss',
    //         'excel': path.resolve(__dirname, '../src/excel'),//新增加一行
    //     }
    // },
     // 配置
    chainWebpack: (config)=>{
        // 文件目录配置别名    我们可以把src配置为@，如果需要就不用到根目录开始写了，直接用@/xxx/进行引
        config.resolve.alias
        .set('@', resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('components',resolve('src/components'))
        .set('router',resolve('src/router'))
        .set('utils',resolve('src/utils'))
        .set('static',resolve('src/static'))
        .set('store',resolve('src/store'))
        .set('views',resolve('src/views'))
    },
    // 跨域配置
    devServer: {
        proxy: {
            '/user': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
            }
        }
    },
    assetsDir: 'assets',   // 静态文件目录
    publicPath: './',    // 编译后的地址，可以根据环境进行设置
    lintOnSave: true, // 是否开启编译时是否不符合eslint提示
    // js,css代码的最小化压缩和分割
    chainWebpack: config => {
        config.optimization.minimize(true);//压缩
        config.optimization.splitChunks({//分割
            chunks: 'all'
        })
    },
    configureWebpack: {
        externals: {
            'AMap':'AMap',
            'BMap':'BMap',
            'AMapUI':'AMapUI'
        },
    },
    productionSourceMap:false
}