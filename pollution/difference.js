/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function read_dif_data(data_source, view) {
	
	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		data.forEach(function(d) {
			d.date= parseDate(d.Data);
			d.up= +d["Concentra_up"];
			d.down= +d["Concentra_down"];
		});

		draw_difference(data, view);

	});
};

function draw_difference(data, view) {

	var margin= {top: 10, right: 35, bottom: 25, left: 60};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var delay_time= 500;


	var x_scale= d3.scaleTime()		// Escala horizontal
		.range([0, width]);

	var y_scale= d3.scaleLinear()	// Escala vertical
		.range([height, 0]);

	x_scale.domain(d3.extent(data, function(d) { return d.date; }));
	y_scale.domain([
	//	0,
		d3.min(data, function(d) { return Math.min(d.up, d.down); }),
		d3.max(data, function(d) { return Math.max(d.up, d.down); })
	//	1400
	]).nice();


	var lineUP= d3.area()
		.curve(d3.curveNatural)
		.x(function(d) { return x_scale(d.date); })
		.y(function(d) { return y_scale(d.up); });

	var lineDW= d3.area()
		.curve(d3.curveNatural)
		.x(function(d) { return x_scale(d.date); })
		.y(function(d) { return y_scale(d.down); });

	var area= d3.area()
		.curve(d3.curveNatural)
		.x(function(d) { return x_scale(d.date); })
		.y1(function(d) { return y_scale(d.up); });


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	canvas.datum(data);

	canvas.append("clipPath")
		.attr("id", "clip-above")
		.append("path")
		.attr("d", area.y0(0));

	canvas.append("clipPath")
		.attr("id", "clip-below")
		.append("path")
		.attr("d", area.y0(height));

	canvas.append("path")
		.attr("class", "area above")
		.attr("clip-path", "url(#clip-above)")
		.attr("d", area.y0(function(d) { return y_scale(d.down); }));

	canvas.append("path")
		.attr("class", "area below")
		.attr("clip-path", "url(#clip-below)")
		.attr("d", area.y0(function(d) { return y_scale(d.down); }));

	canvas.append("path")
		.attr("class", "line")
		.style("stroke", "darkblue")
		.attr("d", lineUP);

	canvas.append("path")
		.attr("class", "line")
		.style("stroke", "darkred")
		.attr("d", lineDW);


	var vertical_line= canvas.append("g")		// Append a vertical line in the Chart
		.attr("class", "marker_line")
		.style("display", "none");

	vertical_line.append("line")
		.attr("y1", -5)
		.attr("y2", height)
		.attr("fill", "none")
		.style("stroke-width", "1px")
		.style("stroke", "black")
		.style("stroke-dasharray", "4,4");


	var marker_up= canvas.append("g")		// Append marker in the Up Chart
		.style("display", "none");

	marker_up.append("circle")
		.attr("class", "marker")
		.attr("r", 5)
		.style("fill", "steelblue")
		.style("pointer-events", "none");

	marker_up.append("text")
		.attr("class", "dif_label")
		.attr("x", 10)
		.attr("dy", ".4em");


	var marker_down= canvas.append("g")		// Append marker in the Down Chart
		.style("display", "none");

	marker_down.append("circle")
		.attr("class", "marker")
		.attr("r", 5)
		.style("fill", "darkred")
		.style("pointer-events", "none");

	marker_down.append("text")
		.attr("class", "dif_label")
		.attr("x", 10)
		.attr("dy", ".4em");


	canvas.append("rect")		// Plano de eventos
		.attr("width", width)
		.attr("height", height)
		.style("fill", "none")
		.on("mouseover", function() {
			vertical_line.style("display", null);
			marker_up.style("display", null); 
			marker_down.style("display", null); 
		})
		.on("mouseout", function() { 
			vertical_line.style("display", "none");
			marker_up.style("display", "none"); 
			marker_down.style("display", "none"); 
		})
		.on("mousemove", mouseMove)
		.transition()
			.delay(delay_time)
			.style("pointer-events", "all");


	var bisectDate= d3.bisector(function(d) { return d.date; }).left;	// Create custom bisector
	

	function mouseMove() {		// Add event listeners/handlers

		var x0= x_scale.invert(d3.mouse(this)[0]),
			index= bisectDate(data, x0, 1),
			start= data[index- 1],
			end= data[index],
			d= x0 - start.date > end.date - x0 ? end : start;
		
		vertical_line.attr("transform", "translate(" + x_scale(d.date) + ",0)");

		marker_up.attr("transform", "translate(" + x_scale(d.date) + "," + y_scale(d.up) + ")");
		
		if (d.up== 0) {
			marker_up.select("text")
				.attr("y", -15)
				.text(format_mass(d.up));
		}
		else {
			marker_up.select("text")
				.attr("y", -10)
				.text(format_mass(d.up));
		}

		marker_down.attr("transform", "translate(" + x_scale(d.date) + "," + y_scale(d.down) + ")");
		
		if (d.down== 0) {
			marker_down.select("text")
				.attr("y", -15)
				.text(format_mass(d.down));
		}
		else {
			marker_down.select("text")
				.attr("y", -2)
				.text(format_mass(d.down));
		}
	};


	var xAxis= d3.axisBottom(x_scale)			// Construcao dos eixos
		.tickValues([]);

	var yAxis= d3.axisLeft(y_scale)
		.ticks(4)
		.tickFormat(d3.format(".1f"));
	
	canvas.append("g")
		.attr("class", "axis-x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	canvas.append("g")
		.attr("class", "axis-y")
		.call(yAxis);

	canvas.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -(height/ 2))
		.attr("y", 1 -margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text("Variação (μg/m³)");

};