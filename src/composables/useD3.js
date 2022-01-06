import * as d3 from 'd3'

export default function() {
  const linkArc = (d) => {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 1 0,1 ${d.target.x},${d.target.y}
  `
  }

  // 节点拖拽方法
  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
  }

  const chart = (el, opt = {}) => {

    const { links, nodes } = opt.data
    const types = Array.from(new Set(links.map((d) => d.type)))
    // let data = { nodes: Array.from(new Set(links.flatMap((l) => [l.source, l.target])), (id) => ({ id })), links }
    let color = d3.scaleOrdinal(types, d3.schemeCategory10) // 根据类型生成内置颜色
    let height = opt.height || 600 // svg宽
    let width = opt.width || 600 // svg高
    // const nodeColor = 'rgb(19,19,19)' // 节点颜色
    const lineColor = 'rgb(148,148,148)' // 边线颜色
    const hoverColor = 'rgb(110,165,255)' // hover颜色
    const showTextLength = 5 // 超出5个字后截取


    // 生成力向图配置
    const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-400))
      .force("center",d3.forceCenter(width/2, height/2))
      .force('x', d3.forceX())
      .force('y', d3.forceY())


    // 在盒子里添加svg
    const svg = d3.select(el).append('svg')

    // svg样式
    svg.attr('width', width)
      .attr('height', height)
      // .attr('viewBox', [-width/2, -height/2, width, height])
      .style('font', '12px sans-serif')

    const group = svg.append('g')

    // svg追加箭头
    const marker = group
      .append('g')
      .selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', (d) => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 21)
      .attr('refY',-1.5)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      // .attr('fill', color)
      .attr('fill', lineColor)
      .attr('d', 'M0,-5L10,0L0,5')

    // svg追加边线
    const link = group
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .selectAll('path')
      .data(links)
      .join('path')
      // .attr('stroke', (d) => color(d.type))
      .attr('stroke', lineColor)
      .attr('marker-end', (d) => `url(${new URL(`#arrow-${d.type}`, location)})`)
      .on('click', (e) => {
        // var rect = d3.select(this)
        // console.log(22, e)
      })

    // svg.append("g")
    //   .selectAll("text")
    //   // .selectAll("text")
    //   .data(links)
    //   .enter()
    //   .append("text")
    //   .attr('x', (d) => (d.source.x+d.target.x)/2)
    //   .attr('y', (d) => (d.source.y+d.target.y)/2)
    //   .text((d) => '22222')

    // svg追加节点
    const node = group
      .append('g')
      // .attr('fill', 'black')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('fill', (d,i) => {
        return nodes[i].color || 'black'
      })
      .call(drag(simulation))
      .on('click', opt.nodeClick)
      .on('mouseover', opt.nodeMouseOver)
      .on('mouseout', opt.nodMouseOut)

    // 节点追加圆形
    node
      .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5)
      .attr('r', 10)
      .on('mouseover', function(){
        d3.select(this).style('fill',hoverColor)
      })
      .on('mouseout', function(){
        d3.select(this).style('fill',(d,i) => {
          return d.color || 'black'
        })
      })

    // 节点追加圆形旁边文字
    node
      .append('text')
      .attr('x', 14)
      .attr('y', '0.31em')
      .text((d) => d.id.substr(0,showTextLength))
      .clone(true)
      .lower()
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)


    function zoomed(e) {
      group.attr('transform', e.transform)
    }

    // 缩放平移配置
    const zoom = d3.zoom()
      .scaleExtent([0.1, 40])
      .on('zoom', zoomed)

    svg.call(zoom)

    simulation.on('tick', () => {
      link.attr('d', linkArc)
      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })


    // invalidation.then(() => simulation.stop())
    // return svg.node()
    return { simulation, svg }
  }
  return {
    chart
  }
}
