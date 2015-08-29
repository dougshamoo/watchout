var svgAttrs = {
  width: 1000,
  height: 800
};

var backdropAttrs = {
  fill: "grey"
};

var playerProps = {
  r: 25,
  fill: "blue",
  cx: svgAttrs.width / 2,
  cy: svgAttrs.height / 2,
  class: 'player'
};

var numEnemies = 5;
var enemyProps = {
  minR: 10,
  maxR: 50,
  minX: 0,
  maxX: svgAttrs.width,
  minY: 0,
  maxY: svgAttrs.height,
  fill: "red"
};

var stats = {
  currentScore: 0,
  collisions: 0,
  highScore: 0
};

//var axes = {
//  x: d3.scale.linear().domain([0, 100]).range([0, svgAttrs.width]),
//  y: d3.scale.linear().domain([0, 100]).range([0, svgAttrs.height])
//};

var svg = d3.select('body')
            .append('svg')
            .attr(svgAttrs);

d3.select('svg').append('rect')
  .attr(svgAttrs)
  .attr(backdropAttrs)

var updateHighScore = function() {
  stats.highScore = Math.max(stats.currentScore, stats.highScore);
  d3.select('#highScore')
    .text(stats.highScore);
};

var updateCurrentScore = function() {
  d3.select('#currentScore').text(stats.currentScore);
};

var enemies = [];
var createEnemies = function() {
  for (var i = 0; i < numEnemies; i++) {
    enemies.push({
      cx: Math.floor(Math.random() * enemyProps["maxX"]),
      cy: Math.floor(Math.random() * enemyProps["maxY"]),
      r: Math.floor(Math.random() * enemyProps["maxR"]),
      fill: enemyProps["fill"]
    });
  }
};

createEnemies();



var render = function(enemyArray) {
  var enemies = svg.selectAll('circle.enemy').data(enemyArray);
  enemies.enter().append('circle').attr({
    r: function(d) { return d.r; },
    cx: function(d) { return d.cx; },
    cy: function(d) { return d.cy; },
    fill: function(d) { return d.fill; },
    'class': 'enemy'
  });
};

render(enemies);

svg.selectAll('circle.enemy').on('mouseover', function() {
  stats.collisions++;
  d3.select('#collisionCount').text(stats.collisions);
  updateHighScore();
  stats.currentScore = 0;
  updateCurrentScore();
});

var getRandom = function(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

svg.append('circle')
  .attr(playerProps);

setInterval(function() {
  stats.currentScore++;
  d3.selectAll('#currentScore').text(stats.currentScore);
  var circles = d3.selectAll('circle.enemy')
  circles.transition()
    .attr({
      r: function(d) { return getRandom(enemyProps.minR, enemyProps.maxR); },
      cx: function(d) { return getRandom(enemyProps.minX, enemyProps.maxX); },
      cy: function(d) { return getRandom(enemyProps.minY, enemyProps.maxY); },
      fill: function(d) { return d.fill; }
    })
},1000);

var player = svg.selectAll('circle.player');
var drag = d3.behavior.drag()
  .on('drag', function() {
    d3.selectAll('circle.player').attr({
      cx: d3.event.x,
      cy: d3.event.y
    })
    //console.log(arguments);
    //console.log(d3.event.dx);
    // d.cx += d3.event.dx;
    //console.log(d3.event.dy);
    // d.cy += d3.event.dy;
  });
player.call(drag)
