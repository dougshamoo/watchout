// start slingin' some d3 here.

var thing = d3.selectAll('svg');

thing.append('circle')
  .attr({
    cx:"50",
    cy:"50",
    r:"25",
    fill:"yellow"
  });

d3.selectAll('circle')
  .transition()
  .attr({
    cx:150,
    cy:150
  })

/*

 d3.transition()
     .duration(750)
     .ease("linear")
     .each(function() {
       d3.selectAll(".foo").transition()
         .style("opacity", 0)
         .remove();
      })
   .transition()
     .each(function() {
       d3.selectAll(".bar").transition()
         .style("opacity", 0)
         .remove();
 });


d3.selectAll('circle')
  .transition()
  .attr({
    cx:randomX,
    cy:randomY
  })


*/

