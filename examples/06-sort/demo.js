function demo() {
    var data = ["Jane", "Anne", "Marry"];

    var ul = d3.select("#sort");
    ul.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .text(d => d);

    var once;
    ul.on("mouseenter", function() {
        if (once) {
            return;
        }

        once = 1;
        ul.insert("li", ":nth-child(2)")
            .datum("Lucy")
            .text("Lucy");

        ul.insert("li", ":nth-child(1)")
            .datum("Lisa")
            .text("Lisa");
    });

    ul.on("click", function() {
        ul.selectAll("li")
            .sort(
                (a,b) => {
                    if (a<b)
                        return 1;
                    else if (b<a)
                        return -1;
                    else
                        return 0;
                });
    });
}