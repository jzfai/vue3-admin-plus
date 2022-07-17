import Layout from '@/layout'

const codeGenerator = {
  path: '/codeGenerator',
  component: Layout,
  redirect: '/generation-code/index',
  meta: { title: 'CodeGenerator', icon: 'chart' },
  children: [
    {
      path: 'index',
      name: 'CodeGenerator',
      component: () => import('@/views/code-generator'),
      meta: { title: 'CodeGenerator', icon: 'chart' }
    }
    // {
    //   path: 'code-generator-config',
    //   name: 'CodeGeneratorConfig',
    //   component: () => import('@/views/code-generator/code-generator-config'),
    //   meta: { title: 'CodeGeneratorConfig' }
    // }
  ]
}

export default codeGenerator
