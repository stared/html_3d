var data = [];
var i;

// var SHIFT = 450;
var LAYERS = 3;

for (i=0; i < 50; i++) {
  data.push({x: Math.random(),
             y: Math.random(),
             z: Math.floor(LAYERS * Math.random())});
}

data = data.sort(function (a, b) {
  return b.z - a.z;
});

var svgL = d3.select('#scatter')
  .append('div')
    .attr('class', 'columnLeft')
    .append('svg')
      .attr('width', 450)
      .attr('height', 600);

var svgR = d3.select('#scatter')
  .append('div')
    .attr('class', 'columnRight')
    .append('svg')
      .attr('width', 400)
      .attr('height', 600);

var scale = d3.scale.linear()
  .domain([0, 1])
  .range([50, 400-50]);

var scaleZ = d3.scale.linear()
  .domain([0, LAYERS - 1])
  .range([-5, 5]);


svgL.append('rect')
  .attr('class', 'frame')
  .attr('x', scale(0))
  .attr('y', scale(0))
  .attr('width', scale(1) - scale(0))
  .attr('height', scale(1) - scale(0));

svgR.append('rect')
  .attr('class', 'frame')
  .attr('x', scale(0))
  .attr('y', scale(0))
  .attr('width', scale(1) - scale(0))
  .attr('height', scale(1) - scale(0));

var colors = d3.scale.category10();

var pointsLeft = svgL.selectAll('.pointLeft')
  .data(data);

pointsLeft
  .enter()
    .append('circle')
      .attr('class', 'pointLeft')
      .attr('r', 4);

pointsLeft
  .attr('cx', function (d) {
    return scale(d.x) - scaleZ(d.z);
  })
  .attr('cy', function (d) {
    return scale(d.y);
  })
  .style('fill', function (d, i) {
    return colors(d.z % 10);
  });


var pointsRight = svgR.selectAll('.pointRight')
  .data(data);

pointsRight
  .enter()
    .append('circle')
      .attr('class', 'pointRight')
      .attr('r', 4)
      .style('fill', 'red');


pointsRight
  .attr('cx', function (d) {
    return scale(d.x) + scaleZ(d.z);
  })
  .attr('cy', function (d) {
    return scale(d.y);
  })
  .style('fill', function (d, i) {
    return colors(d.z % 10);
  });

// There will be second cursor
// svg.on('mousemove', function (d) {
//   console.log(d3.event.pageX, d3.event.pageY);
// });

