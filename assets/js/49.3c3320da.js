(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{243:function(s,t,n){"use strict";n.r(t);var a=n(2),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("题目如下：")]),s._v(" "),n("p",[n("img",{attrs:{src:"http://blog.chenxiaoyao.cn/image/2019-6-30-css-quiz-8/css-quiz-8-question.png",alt:"css-quiz-8-question"}})]),s._v(" "),n("h2",{attrs:{id:"实现-1-flex"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实现-1-flex"}},[s._v("#")]),s._v(" 实现 1: flex")]),s._v(" "),n("p",[s._v(".btn 使用 margin-right: 0.5rem 的方式，这样对于中间的.btn 元素而言，前一个元素的 margin-right 与后一个元素的 margin-left 进行叠加之后就得到了 1rem 的 margin 值，父元素使用 margin 负值+padding 的方式，为第一个元素和最后一个元素留出 0.5rem 的空间，flex:auto 也可以使用 flex:1 来代替")]),s._v(" "),n("div",{staticClass:"language-css line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-css"}},[n("code",[n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn-group")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" flex"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0 -0.5rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0 1rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("flex")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" auto"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0 0.5rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("p",[s._v("或者另外一种思路是.button-group 父元素使用 1rem 的 padding,.btn 子元素使用 margin-right:1rem 的方式来实现间隙，然后用 last-child 的 margin-right：0 的取消 margin 的设置，或者更简单一点，.btn 元素使用:not(:last-child)来设置 margin-right")]),s._v(" "),n("div",{staticClass:"language-css line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-css"}},[n("code",[n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn-group")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" flex"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0 1rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 方式1 */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin-right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn:last-child")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin-right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 方式2 */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn:not(:last-child)")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin-right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("p",[s._v("效果演示：")]),s._v(" "),n("iframe",{staticStyle:{width:"100%"},attrs:{height:"265",scrolling:"no",title:"css-quiz-8-flex",src:"//codepen.io/Allen6228/embed/PrQbBW/?height=265&theme-id=0&default-tab=html,result",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"}},[s._v("\n  See the Pen "),n("a",{attrs:{href:"https://codepen.io/Allen6228/pen/PrQbBW/"}},[s._v("css-quiz-8-flex")]),s._v(" by XiaoYao\n  ("),n("a",{attrs:{href:"https://codepen.io/Allen6228"}},[s._v("@Allen6228")]),s._v(") on "),n("a",{attrs:{href:"https://codepen.io"}},[s._v("CodePen")]),s._v(".\n")]),s._v(" "),n("h2",{attrs:{id:"实现二：-grid-布局"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实现二：-grid-布局"}},[s._v("#")]),s._v(" 实现二： grid 布局")]),s._v(" "),n("p",[s._v(".btn-group 使用 padding: 0 1rem 为第一个元素和最后一个元素留出 1rem 的空间，.btn 元素之间的空格使用 grid-gap 来实现")]),s._v(" "),n("div",{staticClass:"language-css line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-css"}},[n("code",[n("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".btn-group")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" grid"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("grid-auto-flow")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" column"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("grid-gap")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1em"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v("padding")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0 1rem"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[n("a",{attrs:{href:"https://codepen.io/Allen6228/pen/PrQbBW",target:"_blank",rel:"noopener noreferrer"}},[s._v("效果演示"),n("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);