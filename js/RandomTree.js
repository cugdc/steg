export const buildTree = (x, y, n) => {
  let root = TreeNode(x, y, [])
  _buildRandomTree(root, n)
}

export const getTreeVertices = (root) => {
  if (!root.children) {
    return []
  }

  let s = []

  for (let c of root.children) {
    s.push([root.x, root.y])
    s.push(...getTreeVertices(c))
  }

  return s
}

const _buildRandomTree = (root, n) => {
  if (n == 0) {
    return
  }

  root.vertices = Array(n)

  const q = 7.5 // step size

  for (let i = 0; i < n; i++) {
    const tn = TreeNode(root.x + q * Math.random(), root.y + q * Math.random())
    _buildRandomTree(tn, n - 1)
    root.children.push(tn)
  }
}

const TreeNode = (x, y) => ({ x, y, children: null })
