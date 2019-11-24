---
layout: fexo
title: async function Unexpected identifier 报错解决方案
date: 2019-06-24T16:58:34.000Z
tags: null
permalink: 2019-06-24-async-function-Unexpected-identifier
---

```js
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)


function uploadToQiniu(url, key){
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if(err) {
                reject(err)
            }else {
                if(info.statusCode === 200) {
                    resolve(ret)
                }else {
                    reject(info)
                }
            }
        })
    })
}

;(async () => {

   let movies = [{
            video: 'http://vt1.doubanio.com/201810051252/7a0e8fcb533b6d4c623aa24a48a6e301/view/movie/M/402330315.mp4',
            doubanId: 26752088,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2519070834.jpg',
            cover: 'https://img1.doubanio.com/img/trailer/medium/2527050797.jpg'
   }]

   movies.map(movie => {
        if(movie.video && !movie.key) {
            try {
                //七牛上传成功会返回一个对象
                console.log('正在上传video')
                const videoData = await uploadToQiniu(movie.video, videoId) //这里报错

                console.log('正在上传cover')
                const coverData = await uploadToQiniu(movie.cover, coverId)


                console.log('正在上传poster')
                const posterData = await uploadToQiniu(movie.poster, posterId)
                if(videoData.key) {
                    movie.videoKey = videoData.key //将上传成功的key赋值给本地的文件作为标记
                }
                if(coverData.key) {
                    movie.coverKey = coverData.key
                }
                if(posterData.key) {
                    movie.posterKey = posterData.key
                }
                console.log(movie);
            }catch (err) {
                console.log(err);
            }
        }
   })
})()

```

报错如下

```
C:\Users\z\Desktop\imooc\movie-trailer\server\task\qiniu.js:41
                const videoData = await uploadToQiniu(movie.video, videoId)
                                        ^^^^^^^^^^^^^

SyntaxError: Unexpected identifier

```

查了下 mdn 的例子,在本机上也能正常运行

```js
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
```

找到的原因如下: await 只能够在 async 函数内使用,这里由于 await 是在 map 函数传入的参数里面执行的,所以会报错,将 map 方法改为 for 循环就可以了.

更好的办法是: map 方法里面的函数申明为 async 函数

```js
movies.map(async movie => {
  // code here
});
```
