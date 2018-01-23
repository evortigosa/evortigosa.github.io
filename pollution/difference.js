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

	var margin= {top: 12, right: 35, bottom: 25, left: 60};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;
	

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
		.curve(d3.curveBundle.beta(1))
		.x(function(d) { return x_scale(d.date); })
		.y(function(d) { return y_scale(d.up); });

	var lineDW= d3.area()
		.curve(d3.curveBundle.beta(1))
		.x(function(d) { return x_scale(d.date); })
		.y(function(d) { return y_scale(d.down); });

	var area= d3.area()
		.curve(d3.curveBundle.beta(1))
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


	var xAxis= d3.axisBottom(x_scale)			// Construcao dos eixos
		.tickValues([]);

	var yAxis= d3.axisLeft(y_scale)
		.ticks(4)
		.tickFormat(d3.format(".0f"));
	
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