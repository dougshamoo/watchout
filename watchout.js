var svgAttrs = {
  width: 960,
  height: 600,
  fill: "grey"
};

var backgroundAttrs = {
  width: svgAttrs.width,
  height: svgAttrs.height,
  'xlink:href': 'blue_space_background.png'
};

var playerProps = {
  r: 15,
  fill: "blue",
  cx: svgAttrs.width / 2,
  cy: svgAttrs.height / 2,
  class: 'player'
};

var numEnemies = 5;
var duration = 1500;
var enemyProps = {
  minR: 10,
  maxR: 50,
  minX: 10,
  maxX: svgAttrs.width - 10,
  minY: 10,
  maxY: svgAttrs.height - 10,
  fill: "red"
};

var stats = {
  currentScore: 0,
  collisions: 0,
  highScore: 0
};

var svg = d3.select('body')
            .append('svg')
            .attr(svgAttrs);

svg.append('image')
  .attr(backgroundAttrs);

var scoreTicker = function() {
  stats.currentScore++;
  stats.highScore = Math.max(stats.currentScore, stats.highScore);
  updateScore();
}

var updateScore = function() {
  d3.select('#collisionCount').text(stats.collisions)
  d3.select('#highScore').text(stats.highScore);
  d3.select('#currentScore').text(stats.currentScore);
};

var enemies = [];
var createEnemies = function() {
  for (var i = 0; i < numEnemies; i++) {
    enemies.push({
      cx: Math.floor(Math.random() * enemyProps["maxX"]),
      cy: Math.floor(Math.random() * enemyProps["maxY"]),
      // hard coded radius
      r: 15,
      fill: enemyProps["fill"],
      id: i
    });
  }
};

var render = function(enemyArray) {
  //var counter = 1;
  var enemies = svg.selectAll('circle.enemy').data(enemyArray);
  enemies.enter().append('circle').attr({
    // id: counter,
    r: function(d) { return d.r; },
    cx: function(d) { return d.cx; },
    cy: function(d) { return d.cy; },
    fill: function(d) { return d.fill; },
    'class': 'enemy'
  });
};

var getRandom = function(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

svg.append('circle')
  .attr(playerProps)
  .attr('class', 'player');

svg.on('mousemove', function() {
  var loc = d3.mouse(this);
  playerProps.cx = loc[0];
  playerProps.cy = loc[1];
  d3.select('.player').attr({
    cx: playerProps.cx,
    cy: playerProps.cy
  });
});

var move = function(element) {
  var enemies = svg.selectAll('circle.enemy');
  element
    .transition()
    .duration(duration)
    .attr({
      cx: function() {
        return Math.floor(Math.random() * (enemyProps.maxX - enemyProps.minX))+ enemyProps.minX;
      },
      cy: function() {
        return Math.floor(Math.random() * (enemyProps.maxY - enemyProps.minY))+ enemyProps.minY;
      }
    }).each('end', function() {
      move(d3.select(this));
    });
};

var detectCollision = function() {
  var enemies = svg.selectAll('circle.enemy');
  enemies.each(function(enemy) {

    var dx = Math.abs(playerProps.cx - enemy.cx);
    var dy = Math.abs(playerProps.cy - enemy.cy);
    var dist = Math.sqrt(dx * dx + dy * dy);
    console.log(dist);
  })
}

createEnemies();
render(enemies);


// setTimeout(function() { move(enemies) });
move(svg.selectAll('circle.enemy'));
setInterval(scoreTicker, 100)
d3.timer(detectCollision);