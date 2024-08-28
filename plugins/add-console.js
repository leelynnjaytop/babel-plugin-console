module.exports = function markFnPlugin({ types: t }) {
    return {
        // 在babel把js源文件编译为AST抽象语法树后，我们可以根据抽象语法树的规则，对源文件进行增加/修改/删除代码的目的
        visitor: {
            // 添加代码：在代码块{}最前面插入一段console.log('start')代码
            BlockStatement(path) {
                // 在数组前面插入元素
                path.node.body.unshift(
                    // 创建expressionStatement节点
                    t.expressionStatement(
                        t.callExpression(
                            t.memberExpression(
                                t.identifier('console'),
                                t.identifier('log')
                            ),
                            [t.stringLiteral('start')]
                        )
                    )
                )
            }
        },
    };
}
