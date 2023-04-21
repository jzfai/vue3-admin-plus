const icons = []
const modules = import.meta.glob('../../../icons/common/*.svg')
for (const path in modules) {
  const p = path.split('icons/common/')[1].split('.svg')[0]
  icons.push(p)
}

export default icons
