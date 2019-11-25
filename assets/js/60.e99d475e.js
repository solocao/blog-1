(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{275:function(s,a,n){"use strict";n.r(a);var e=n(2),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"前言："}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前言："}},[s._v("#")]),s._v(" 前言：")]),s._v(" "),n("p",[s._v("去年看过部分《build-your-own-angular》, 收获多多, 现在二刷希望有更好的理解, 现在是 2019 年, angular 份额显然不如 vue, react, jquery 宣布退出历史舞台, 是否还有必要看这一本书, 我的想法是: 框架是会过时的, jquery 会, vue 和 react 也会, 唯有框架内在的东西不会过时, 掌握内核才能让自己成为一个更好的工程师.")]),s._v(" "),n("h2",{attrs:{id:"配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),n("p",[s._v("为了避免一些无意义的踩坑, 这里记录下项目初始化的一些情况, 自动化工具一茬又一茬, grunt, gulp, webpack, parcel, 这些都是不太重要的, 先把本书本质的内容学会, 后期有时间的话用 typescript 重构下, 先按照作者的思路把本书理一遍.")]),s._v(" "),n("h4",{attrs:{id:"系统-win10"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#系统-win10"}},[s._v("#")]),s._v(" 系统: win10")]),s._v(" "),n("h4",{attrs:{id:"全局的包版本-可以使用下列命令查看"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#全局的包版本-可以使用下列命令查看"}},[s._v("#")]),s._v(" 全局的包版本, 可以使用下列命令查看")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("npm list -g --depth=0\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("+-- grunt@0.4.1\n+-- grunt-cli@0.1.9\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("使用下列命令安装即可")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("npm install -g grunt@0.4.1 grunt-cli@0.1.9 phantomjs@1.9.11\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h4",{attrs:{id:"开发依赖包版本"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#开发依赖包版本"}},[s._v("#")]),s._v(" 开发依赖包版本")]),s._v(" "),n("p",[s._v("将下面代码拷贝到 package.json, 然后使用 npm install 或者 yarn 即可")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('{\n  "name": "my-own-angularjs",\n  "version": "0.1.0",\n  "license": "MIT",\n  "devDependencies": {\n    "browserify": "^13.0.0",\n    "grunt-contrib-jshint": "2.1.0",\n    "grunt-contrib-testem": "0.5.22",\n    "jasmine-core": "^2.3.4",\n    "jshint": "^2.8.0",\n    "karma": "^0.13.15",\n    "karma-browserify": "^5.0.4",\n    "karma-jasmine": "^0.3.6",\n    "karma-jshint-preprocessor": "0.0.6",\n    "karma-phantomjs-launcher": "^1.0.0",\n    "phantomjs-prebuilt": "^2.1.7",\n    "sinon": "^1.17.2",\n    "uglifyjs": "^2.4.10",\n    "watchify": "^3.7.0"\n  },\n  "dependencies": {\n    "grunt": "0.4.1",\n    "jquery": "^2.1.4",\n    "lodash": "4.17.14"\n  },\n  "scripts": {\n    "lint": "jshint src test",\n    "test": "karma start",\n    "build": "browserify src/bootstrap.js > myangular.js",\n    "build:minified": "browserify src/bootstrap.js | uglifyjs -mc > myangular.min.js"\n  }\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br")])]),n("h4",{attrs:{id:"问题一-运行-grunt-testem-run-unit-命令行报-fatal-error-spawn-enoent"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#问题一-运行-grunt-testem-run-unit-命令行报-fatal-error-spawn-enoent"}},[s._v("#")]),s._v(" "),n("a",{attrs:{href:"https://github.com/teropa/build-your-own-angularjs/issues/88",target:"_blank",rel:"noopener noreferrer"}},[s._v("问题一: 运行 grunt testem:run:unit 命令行报 fatal error: spawn ENOENT"),n("OutboundLink")],1)]),s._v(" "),n("p",[s._v("解决: 根据路径找到以下文件,")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("node_modules/testem/lib folder, open browser_launcher.js\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("在 120 行, 将 phantomjs 的参数替换为")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("{\n    name: 'PhantomJS',\n    exe: 'phantomjs.cmd',\n    args: buildPhantomJsArgs,\n    supported: findableByWhere\n}\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("h4",{attrs:{id:"问题二-referenceerror-is-not-defined"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#问题二-referenceerror-is-not-defined"}},[s._v("#")]),s._v(" [问题二]: ReferenceError: _ is not defined")]),s._v(" "),n("p",[s._v("已经在 gruntfile.js 中加入了下面两行, 还是报错")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("'node_modules/lodash/index.js',\n'node_modules/jquery/dist/jquery.js',\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("奇怪的是$, 也就是 jquery 是成功引入的, index.js 最终引入的是 lodash.js")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("module.exports = require(./lodash)\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("查看了下 chrome 控制台, 实际上加载的只有 index.js, 而并没有将 lodash.js 加载进来, 因此将 index.js 改为 lodash.js 就可以了")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("'node_modules/lodash/lodash.js',\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);