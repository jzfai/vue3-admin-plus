/*
 * 传入file
 * return file
 * 1.file转为img
 * 2.img转为canvas,且添加文字提示
 * 3.canvas转为img
 * 4.img.src base64转为file
 * */
function blobToImg(blob) {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      let img = new Image()
      img.src = reader.result
      img.addEventListener('load', () => resolve(img))
    })
    reader.readAsDataURL(blob)
  })
}

/**
 * 图片路径转成canvas
 * @param {图片url} url
 */
async function imgToCanvas(img) {
  // 创建img元素
  // const img = document.createElement('img')
  // img.src = url
  img.setAttribute('crossOrigin', 'anonymous') // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
  await new Promise((resolve) => {
    img.onload = resolve
  })
  // 创建canvas DOM元素，并设置其宽高和图片一样
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
  canvas.getContext('2d').drawImage(img, 0, 0)
  return canvas
}

/**
 * canvas添加水印
 * @param {canvas对象} canvas
 * @param {水印文字} texts
 */
function addWatermark(canvas, texts) {
  const [text1] = texts
  const ctx = canvas.getContext('2d')
  const x = canvas.width - 20
  const y = canvas.height - 40
  ctx.fillStyle = 'red'
  ctx.textBaseline = 'middle'
  ctx.font = '40px sans-serif'
  ctx.textAlign = 'end'
  ctx.fillText(text1, x, y)
  // ctx.fillText(text2, x, y - 20)
  // ctx.fillText(text3, x, y - 40)
  return canvas
}

/**
 * canvas转成img
 * @param {canvas对象} canvas
 */
function convasToImg(canvas) {
  // 新建Image对象，可以理解为DOM
  const image = new Image()
  // canvas.toDataURL 返回的是一串Base64编码的URL
  // 指定格式 PNG
  image.src = canvas.toDataURL('image/png')
  return image
}

// function convasToFile(canvas) {
//   // 将canvas转换成blob
//   // return new Promise((resolve) => {
//   //   canvas.toBlob((blob) => resolve(new File(blob., '666.png', { type: 'image/jpeg' })))
//   // })
// }

// 封装方法
export async function watermark(file, texts) {
  let img = await blobToImg(file)
  // 1.图片路径转成canvas
  const tempCanvas = await imgToCanvas(img)
  // 2.canvas添加水印
  const canvas = addWatermark(tempCanvas, texts)
  // 3.canvas转成img
  const canvasImage = convasToImg(canvas)
  canvasImage.type = 'image/png'
  return dataURLtoBlob(canvasImage.src, file)
  // 3.将canvas转换成blob
  // return convasToFile(canvas)
}
function dataURLtoBlob(dataurl, file) {
  const arr = dataurl.split(',')
  // const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], file.name, { type: file.type })
}
