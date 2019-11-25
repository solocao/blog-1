(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{268:function(s,a,n){"use strict";n.r(a);var e=n(2),t=Object(e.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"目标"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#目标"}},[s._v("#")]),s._v(" 目标")]),s._v(" "),n("p",[s._v("实现过滤器"),n("code",[s._v("|")]),s._v("以及内置过滤器函数"),n("code",[s._v("filter")])]),s._v(" "),n("h2",{attrs:{id:"过滤器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#过滤器"}},[s._v("#")]),s._v(" 过滤器")]),s._v(" "),n("p",[s._v("过滤器函数接受一个表达式, 并且返回一个处理后的最终值, 其使用的是 "),n("code",[s._v("|")]),s._v("管道语法, 左边接受的是原始的表达式, 右边接受的是过滤器函数, "),n("strong",[s._v("过滤器函数只接受一个值")])]),s._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[s._v("myExpression "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" uppercase"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("过滤器可以组合")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("myNumbers | odd | increment\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("由于过滤器就是一个函数, 上述表达式实际上等价于")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("increment(odd(myNumbers))\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h2",{attrs:{id:"过滤器注册"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#过滤器注册"}},[s._v("#")]),s._v(" 过滤器注册")]),s._v(" "),n("p",[s._v("recurse 函数递归调用自身, 加上数组的 push 方法, 这样得出来的字符串恰好是我们想要的, 注意 forEach 之中作者鸡贼地仅仅遍历拼接了 ast.body 前 n-1 项")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("ASTCompiler.prototype.recurse = function (ast, context, create) {\n    var intoId;\n    var self = this;\n    switch (ast.type) {\n        case AST.Program:\n            _.forEach(_.initial(ast.body), function (stmt) {\n                self.state.body.push(self.recurse(stmt), ';');\n            });\n            self.state.body.push('return ', self.recurse(_.last(ast.body)), ';');\n            break;\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("register('upcase', function () {\n    return function (str) {\n        return str.toUpperCase();\n    };\n});\nvar fn = parse('aString | upcase');\nfn({ aString: 'Hello' });\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("上面几段代码最终编译成下面的函数")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("(function anonymous(ensureSafeMemberName, ensureSafeObject, ensureSafeFunction, ifDefined, filter) {\n    var v0 = filter('upcase');\n    var fn = function(s, l) {\n        var v1;\n        if (l && ('aString'in l)) {\n            v1 = (l).aString;\n        }\n        if (!(l && ('aString'in l)) && s) {\n            v1 = (s).aString;\n        }\n        ensureSafeObject(v1);\n        return v0(v1);\n    };\n    return fn;\n}\n)\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("p",[s._v("我们来看下作者是如何解决传参的问题的")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("    var fnString = this.filterPrefix() +\n        'var fn=function(s,l){' +\n        (this.state.vars.length ?\n            'var ' + this.state.vars.join(',') + ';' :\n            ''\n        ) +\n        this.state.body.join('') +\n        '}; return fn;';\n\n    return new Function(\n        'ensureSafeMemberName',\n        'ensureSafeObject',\n        'ensureSafeFunction',\n        'ifDefined',\n        'filter',\n        fnString)(\n            ensureSafeMemberName,\n            ensureSafeObject,\n            ensureSafeFunction,\n            ifDefined,\n            filter);\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("h2",{attrs:{id:"过滤器的链式调用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#过滤器的链式调用"}},[s._v("#")]),s._v(" 过滤器的链式调用")]),s._v(" "),n("h2",{attrs:{id:"额外的过滤器参数"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#额外的过滤器参数"}},[s._v("#")]),s._v(" 额外的过滤器参数")]),s._v(" "),n("h2",{attrs:{id:"内置的-filter-过滤器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内置的-filter-过滤器"}},[s._v("#")]),s._v(" 内置的 filter 过滤器")]),s._v(" "),n("p",[s._v("降级写法 "),n("code",[s._v("var token = op3 ? ch3 : (op2 ? ch2 : ch);")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// "="与"==","=="\nvar ch = this.ch;\nvar ch2 = this.ch + this.peek();\nvar ch3 = this.ch + this.peek() + this.peek(2);\nvar op = OPERATORS[ch];\nvar op2 = OPERATORS[ch2];\nvar op3 = OPERATORS[ch3];\nif (op || op2 || op3) {\n    var token = op3 ? ch3 : (op2 ? ch2 : ch);\n    this.tokens.push({ text: token });\n    this.index += token.length;\n} else {\n    throw \'Unexpected next character: \' + this.ch;\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("p",[s._v("优先级的处理方法: 让优先级比较"),n("code",[s._v("低")]),s._v("的去调用优先级比较"),n("code",[s._v("高")]),s._v("的函数\nThe final precedence order of the operators can be read by looking at the order in which the AST builder’s methods are called "),n("code",[s._v("in reverse")]),s._v(":")]),s._v(" "),n("ol",[n("li",[s._v("Primary expressions: Lookups, function calls, method calls.")]),s._v(" "),n("li",[s._v("Unary expressions: +a, -a, !a.")]),s._v(" "),n("li",[s._v("Multiplicative arithmetic expressions: a * b, a / b, and a % b.")]),s._v(" "),n("li",[s._v("Additive arithmetic expressions: a + b and a - b.")]),s._v(" "),n("li",[s._v("Relational expressions: a < b, a > b, a <= b, and a >= b.")]),s._v(" "),n("li",[s._v("Equality testing expressions: a == b, a != b, a === b, and a !== b.")]),s._v(" "),n("li",[s._v("Logical AND expressions: a && b.")]),s._v(" "),n("li",[s._v("Logical OR expressions: a || b.")]),s._v(" "),n("li",[s._v("Ternary expressions: a ? b : c.")]),s._v(" "),n("li",[s._v("Assignments: a = b.")])])])}),[],!1,null,null,null);a.default=t.exports}}]);