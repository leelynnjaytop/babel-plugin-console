module.exports = function () {
  return {
    visitor: {
      // 编辑节点名称
      Identifier(path) {
        let name = path.node.name;
        if (name === 'fn') {
          path.node.name = 'fn2'
        }
      },
    },
  };
}
