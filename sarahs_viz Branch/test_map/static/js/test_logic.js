var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	formatPercent = d3.format(".1%");

var svg = d3.select("#map").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.csv, "../../map_resources/points_average.csv")
    .defer(d3.json, "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
    .await(readyPoints);
    
queue()
    .defer(d3.json, "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
    .defer(d3.csv, "price_average.csv")
	.await(readyPrice);

var pointslegendText = ["83", "84", "85", "86", "87", "88", "89", "90"];
var pointslegendColors = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];


function readyPoints(error, data, us) {
    
    for(var i=0; i < data.length; i++)   {

       var points_state = data[i].state;
       var points = +data[i].points;

       for (var j=0; j < us.features.length; j++)   {
           var us_state = us.features[j].properties.name;

           if (points_state == us_state)    {
               us.features[j].properties.value = points;
               break;
           }
       }
    } 

	var color = d3.scale.threshold()
		.domain([83, 84, 85, 86, 87, 89, 90])
		.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);

	var stateShapes = svg.selectAll(".state")
		.data(us.features)
		.enter()
		.append("path")
			.attr("class", "state")
            .attr("d", path)
            .style("fill", function(d) {
                var value = d.properties.value;
                if(value){
                    return color(value);
                } else {
                    return "#ccc"
                }
            });

    stateShapes
		.on("mouseover", function(d) {
            tooltip.transition()
			.duration(250)
            .style("opacity", 1);
            tooltip.html(d.properties.name + " wines have an average rating of " + d.properties.value)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});

	var legend = svg.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(8))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return pointslegendColors[i]; });

	legenditem.append("text")
		.attr("x", width - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return pointslegendText[i]; });

	// function update(year){
	// 	slider.property("value", year);
	// 	d3.select(".year").text(year);
	// 	countyShapes.style("fill", function(d) {
	// 		return color(d.properties.years[year][0].rate)
	// 	});
	// }

// 	var slider = d3.select(".slider")
// 		.append("input")
// 			.attr("type", "range")
// 			.attr("min", 1996)
// 			.attr("max", 2012)
// 			.attr("step", 1)
// 			.on("input", function() {
// 				var year = this.value;
// 				update(year);
// 			});

}
d3.select(self.frameElement).style("height", "685px");

function readyPrice(error, data, us) {
    
    for(var i=0; i < data.length; i++)   {

       var price_state = data[i].state;
       var price = +data[i].price;

       for (var j=0; j < us.features.length; j++)   {
           var us_state = us.features[j].properties.name;

           if (price_state == us_state)    {
               us.features[j].properties.value = price;
               break;
           }
       }
    } 

	var color = d3.scale.threshold()
		.domain([0, 15, 20, 25, 30, 35, 40, 46])
		.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);

	var stateShapes = svg.selectAll(".state")
		.data(us.features)
		.enter()
		.append("path")
			.attr("class", "state")
            .attr("d", path)
            .style("fill", function(d) {
                var value = d.properties.value;
                if(value){
                    return color(value);
                } else {
                    return "#ccc"
                }
            });

    stateShapes
		.on("mouseover", function(d) {
            tooltip.transition()
			.duration(250)
            .style("opacity", 1);
            tooltip.html(d.properties.name + " wines have an average rating of " + d.properties.value)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});

	var legend = svg.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(8))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return pricelegendColors[i]; });

	legenditem.append("text")
		.attr("x", width - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return pricelegendText[i]; });

};

var clickPrice = d3.select(".price")
var clickPoints = d3.select(".points")