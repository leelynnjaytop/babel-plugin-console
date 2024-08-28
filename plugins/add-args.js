// const t = require('@babel/types');
const pathlib = require("path");
// 向console.log添加参数
module.exports = function ({ types: t }) {
    return {
        visitor: {
            CallExpression({ node }, state) {
                // 由上图得出的console.log所在节点类型条件，来查找出console.log方法
                if (t.isMemberExpression(node.callee)) {
                    if (node.callee.object.name === "console") {
                        // 找到console对象
                        if (["log", "info", "warn", "error"].includes(node.callee.property.name)) {
                            // 获得console.log方法的参数名
                            const args = node.arguments;
                            // 遍历参数，找到第一个不是字符串的，在其前面添加参数名
                            for (let i = 0; i < args.length; i++) {
                                if (!t.isStringLiteral(args[i])) {
                                    args.splice(i, 0, t.stringLiteral(args[i].name)); // 在参数前面添加参数名
                                    i++; // 跳过替换后的参数，继续遍历
                                }
                            }
                            // 找到对应的方法和所在行数
                            const { line, column } = node.loc.start; //找到所处位置的行和列
                            // 向arguments添加打印所在行信息
                            node.arguments.push(t.stringLiteral(`${line}:${column}`)); //向右边添加我们的行和列信息
                            //找到文件名
                            const filename = state.file.opts.filename;
                            //输出文件的相对路径
                            const relativeName = pathlib
                                .relative(__dirname, filename)
                                .replace(/\\/g, "/"); //兼容window
                            // 将'../src'替换为'@'
                            const aliasName = relativeName.replace(/^\.\.\/src/, "@"); //替换路径
                            node.arguments.push(t.stringLiteral(aliasName)); //添加文件名信息
                        }
                    }
                }
            },
        },
    };
}
