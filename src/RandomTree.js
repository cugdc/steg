const buildTree = (x, y, n) => {
  let root = TreeNode(x, y, null)
  _buildRandomTree(root, n)
  return root
}

const getLineSegments = (root) => {
  if (!root) {
    return []
  }

  let s = []

  for (let c of root.children) {
    s.push([root.x, root.y, c.x, c.y])
    if (c.children) {
      s.push(...getLineSegments(c))
    }
  }

  return s
}

const _buildRandomTree = (root, n) => {
  if (n == 0) {
    return
  }

  root.children = []

  const q = 100 // twice step size
  const ceilSqrtN = Math.ceil(Math.sqrt(n))

  for (let i = 0; i < ceilSqrtN; i++) {
    const x = root.x - q / 2 + q * Math.random()
    const y = root.y - q / 2 + q * Math.random()
    const tn = TreeNode(x, y)
    root.children.push(tn)
    _buildRandomTree(tn, n - 1)
  }
}

const TreeNode = (x, y) => ({ x, y, children: null })

export default {
  buildTree,
  getLineSegments
}
