// Author: https://github.com/dongyuanxin/blog/blob/master/bin/sidebar.js
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const logger = require('tracer').colorConsole()
const matter = require('gray-matter')
const pathToBeExecuted = ['.DS_Store']

const docsRoot = path.join(__dirname, '..', 'docs')
// const notesRoot = path.join(__dirname, '..', 'notes');
const sidebarPath = path.join(
  __dirname,
  '..',
  '.vuepress',
  'config',
  'sidebar-auto.js',
)
const template = `
<% for(let variable of variables) { %>
  const <%- variable.name %> = <%- JSON.stringify(variable.js); %>
<% } %>

module.exports = {
  <% for (let variable of variables) { %>
    "<%- variable.path %>": <%- variable.name %>,
  <% } %>
}
`

let uuid = 0

main()

/**
 * 主体函数
 */
function main() {
  const variables = []
  // 读取顶层的文件夹
  const tocs = readTocs(docsRoot)
  tocs.forEach((toc) => {
    const js = mapTocToSidebar(toc)
    if (!js.length) {
      return
    }

    variables.push({
      path: `/docs/${path.basename(toc)}/`,
      name: path.basename(toc).replace(/ /g, '_'),
      js,
    })
  })

  // const notesJs = mapTocToSidebar(notesRoot);
  // if (notesJs.length) {
  // 	variables.push({
  // 		path: '/notes/',
  // 		name: 'notes',
  // 		js: notesJs
  // 	});
  // }
  fs.writeFileSync('data.json', JSON.stringify(variables))

  fs.writeFileSync(sidebarPath, ejs.render(template, { variables }))
}

/**
 * 读取指定目录的文件夹作为不同的目录
 * @param {String} root
 */
function readTocs(root) {
  const result = []
  const files = fs.readdirSync(root)
  files.forEach((name) => {
    if (!pathToBeExecuted.includes(name)) {
      const file = path.resolve(root, name)
        if (fs.statSync(file).isDirectory()) {
          result.push(file)
        }
    }
  })
  return result
}

/**
 * 将对应目录映射为对应的边栏配置
 * @param {String} root
 * @param {String} prefix
 */
function mapTocToSidebar(root, prefix) {
  prefix = prefix || ''
  let sidebar = []

  const files = fs.readdirSync(root)
  files.forEach((filename) => {
    const file = path.resolve(root, filename)
    const stat = fs.statSync(file)

    // let [order, title, type] = filename.split('.');
    // order = parseInt(order, 10);
    // if (isNaN(order) || order < 0) {
    // 	return;
    // }

    // if (sidebar[order]) {
    // 	logger.warn(
    // 		`For ${file}, its order has appeared in the same level directory. And it will be rewritten.`
    // 	);
    // }

    uuid++
    if (stat.isDirectory()) {
      sidebar[uuid] = {
        title: filename,
        collapsable: false,
        children: mapTocToSidebar(file, prefix + filename + '/'),
      }
    } else {
      if (!pathToBeExecuted.includes(filename)) {
        let title = filename.split('.')[0].slice(11)
        sidebar[uuid] = [prefix + filename, title]
      }
    }
  })
  sidebar = sidebar.filter((item) => item !== null && item !== undefined)
  return sidebar
}
