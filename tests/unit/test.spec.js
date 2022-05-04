/*
 基本方法：
分组（Test Group）：descripe(描述语,function)
测试用例（Test Case）：test(描述语,function)
断言（Assert）：expect(运行需测试的方法并返回实际结果).toBe(预期结果)
参考来自：https://juejin.cn/post/7039146473878978596
* */
describe('分组', () => {
  it('', () => {
    // test.fai()
    expect(2 + 2).toBe(4)
    // expect(2 + 1).toBe(4)
  })
})
