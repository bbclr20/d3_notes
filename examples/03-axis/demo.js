function makeScale(data, accessor, range) {
    return d3.scaleLinear()
        .domain(d3.extent(data, accessor))
        .range(range)
        .nice();
}

function drawData(data, g, x_accessor, y_accessor, curve) {
    // draw circles
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", x_accessor)
        .attr("cy", y_accessor);

    // draw lines
    var lineMaker = d3.line()
                        .curve(curve)
                        .x(x_accessor)
                        .y(y_accessor);
    g.append("path")
        .attr("fill", "none")
        .attr("d", lineMaker(data));
}

function demo() {
    d3.csv("demo.csv").then(
        function(data) {
            var svg = d3.select("svg");

            var pxX = svg.attr("width")-20;
            var pxY = svg.attr("height")-20;

            // get scale
            var scX = makeScale(data, d => d["x"], [20, pxX]);
            var scY1 = makeScale(data, d => d["y1"], [pxY, 20]);
            var scY2 = makeScale(data, d => d["y2"], [pxY, 20]);

            // get group
            var g1 = svg.append("g");
            var g2 = svg.append("g");

            // draw data and change color
            drawData(data, g1, d => scX(d["x"]), d => scY1(d["y1"]), d3.curveStep)
            drawData(data, g2, d => scX(d["x"]), d => scY2(d["y2"]), d3.curveNatural)

            g1.selectAll("circle").attr("fill", "green");
            g1.selectAll("path").attr("stroke", "red");
            
            g2.selectAll("circle").attr("fill", "blue");
            g2.selectAll("path").attr("stroke", "cyan");

            // add axis
            var axisMaker = d3.axisRight(scY1);
            axisMaker(svg.append("g"));

            axisMaker = d3.axisLeft(scY2);
            svg.append("g")
                .attr("transform", `translate(${pxX},0)`)
                .call(axisMaker);
            
            axisMaker = d3.axisTop(scX);
            svg.append("g")
                .attr("transform", `translate(0,${pxY})`)
                .call(axisMaker);

        });
}