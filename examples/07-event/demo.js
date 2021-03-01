function coord() {
    var txt = d3.select("svg").append("text");

    var svg = d3.select("svg")
                .attr("cursor", "crosshair")
                .on("mousemove", function(event) {
                    txt.attr("x", 18+event.x)
                        .attr("y", 6+event.y)
                        .text("" + event.x + "," + event.y);
                });

    svg.on("mouseleave", () => txt.text(""));
}