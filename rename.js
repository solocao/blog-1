const fs = require('fs');
const path = require('path');
const yarmFront = require('yaml-front-matter');
const root = './docs';
// 读取所有的文件
// 删除后缀, 获取文件名
let uuid = 0;
let re = {};
function mark(root) {
	const files = fs.readdirSync(root);
	files.forEach(filename => {
    uuid++
		const file = path.resolve(root, filename);
		const stat = fs.statSync(file);
		if (stat.isFile()) {
			re[root + '/' + filename] = uuid;
		} else {
			mark(path.join(root, '/', filename));
		}
	});
}
mark(root);

// 解析yaml, 为文件添加permalink属性

// 解析yaml, 保存title, 将title重命名为filename
console.log(re);

return;
re.forEach((filepath, i) => {
	fs.readFile(filepath, 'utf8', function(err, fileContent) {
		// const filename = path.basename(filepath).split('.')[0];
		// console.log(filename);
		// const obj = matter(fileContent);
		// obj.data.permalink = filename;
		// const str = matter.stringify(obj);
		// fs.writeFile(filepath, str, function(err) {
		// 	console.log(err);
		// });
		const title = yarmFront.loadFront(fileContent).title;
		const date = /\d{4}-\d{2}-\d{2}-/.exec(path.basename(filepath))[0];
		const newFilePath =
			path.dirname(filepath).replace('\\', '/') + '/' + date + title + '.md';
		// console.log(newFilePath);
		fs.rename(filepath, newFilePath, function(err) {
			if (err) {
				// console.log(err);
			}
		});
	});
});
