function drawCircle() {
    var data = [
        [200, 150, 20,"red"],
        [400, 150, 20, "green"],
        [600, 150, 20,"blue"]
    ];

    var svg = d3.select("svg");
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d=>d[0])
        .attr("cy", d=>d[1])
        .attr("r", d=>d[2])
        .attr("fill", d=>d[3])
}

function dragDrop() {
    drawCircle();

    var widget, color;
    var pos = [];
    var drag = d3.drag()
                .on("start", function(event) {
                    color = d3.select(this).attr("fill");
                    pos[0] = d3.select(this).attr("cx");
                    pos[1] = d3.select(this).attr("cy");
                    widget = d3.select(this).attr("fill", "lime");
                })
                .on("drag", function(event) {
                    widget.attr("cx", event.x).attr("cy", event.y);
                })
                .on("end", function() {
                    widget.attr("fill", color)
                            .attr("cx", pos[0])
                            .attr("cy", pos[1]);
                })

    drag(d3.selectAll("circle"));
}