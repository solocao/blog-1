---
title: Vue中使用directive
tags:
  - javascript
date: 2020-05-12
permalink: 2020-05-12-using-directive-in-vue
---

## 指令是什么

## directive 实例

v-text

v-html

## 自定义指令

来自 ElementUI

mousewheel.js

```js
import normalizeWheel from 'normalize-wheel';

const isFirefox =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const mousewheel = function (element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(
      isFirefox ? 'DOMMouseScroll' : 'mousewheel',
      function (event) {
        const normalized = normalizeWheel(event);
        callback && callback.apply(this, [event, normalized]);
      }
    );
  }
};

export default {
  bind(el, binding) {
    mousewheel(el, binding.value);
  },
};
```

repeat-click.js

```js
import { once, on } from 'element-ui/src/utils/dom';

export default {
  bind(el, binding, vnode) {
    let interval = null;
    let startTime;
    const handler = () => vnode.context[binding.expression].apply();
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e) => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
};
```

## 社区常用指令推荐

vue-focus

## 参考

[The Power of Custom Directives in Vue](https://css-tricks.com/power-custom-directives-vue/)
[15 Must-Have Vue Directives](https://www.telerik.com/blogs/15-must-have-vue-directives-that-will-significantly-maximize-your-productivity)
