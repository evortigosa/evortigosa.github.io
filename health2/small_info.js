/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function draw_small_info(data, view, disease) {

	var mass_un= "μg/m³";
	var format_mass= function(d) { return d3.format(".2f")(d) + " " + mass_un; };

	var y_axis_label= "";

	if (disease== 0) y_axis_label= "Pneumonia";
	else if (disease== 1) y_axis_label= "Laryngitis";
	else if (disease== 2) y_axis_label= "Bronchitis";
	else if (disease== 3) y_axis_label= "Tonsillitis";
	else if (disease== 4) y_axis_label= "Asthma";
	else if (disease== 5) y_axis_label= "Others";


	var margin= {top: 4, right: 15, bottom: 18, left: 40};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var delay_time= 500;


	var x_scale= d3.scaleTime()		// Escala horizontal
		.rangeRound([0, width]);

	var y_scale= d3.scaleLinear()	// Escala vertical
		.range([height, 0]);

	x_scale.domain(d3.extent(data, function(d) { return d[0]; }));

	if (disease== 0) y_scale.domain([0, 160]);
	else y_scale.domain([0, 50]);

	var line= d3.area()
		.curve(d3.curveNatural)
		.x(function(d) { return x_scale(d[0]); })
		.y(function(d) { return y_scale(d[1]); });

	var area= d3.area()
		.curve(d3.curveNatural)
		.x(function(d) { return x_scale(d[0]); })
		.y1(function(d) { return y_scale(d[1]); });


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	if (data.length> 1) {						// Senao, construo os graficos normalmente
		area.y0(y_scale(0));

		canvas.append("path")
			.datum(data)
				.attr("class", "small_area")
				.attr("d", area);

		canvas.append("path")
			.datum(data)
				.attr("class", "small_line")
				.attr("d", line);


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


		var marker= canvas.append("g")		// Append marker in the Chart
			.style("display", "none");

		marker.append("circle")
			.attr("class", "marker")
			.attr("r", 4)
			.style("fill", "darkred")
			.style("pointer-events", "none");

		marker.append("text")
			.attr("class", "m_label")
			.attr("x", 7)
			.attr("dy", ".4em");

		var date_mkr= canvas.append("g")		// Append a date marker in the Chart
			.style("display", "none");

		date_mkr.append("text")
			.attr("class", "m_label")
			.style("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("x", 3)
			.attr("dy", ".4em");


		canvas.append("rect")		// Plano de eventos, ativa a linha que acompanha o mouse e os marcadores de valor
			.attr("width", width)
			.attr("height", height)
			.style("fill", "none")
			.on("mouseover", function() {
				vertical_line.style("display", null);
				marker.style("display", null);
				date_mkr.style("display", null);
			})
			.on("mouseout", function() { 
				vertical_line.style("display", "none");
				marker.style("display", "none");
				date_mkr.style("display", "none");
			})
			.on("mousemove", mouseMove)
			.transition()
				.delay(delay_time)
				.style("pointer-events", "all");


		var bisectDate= d3.bisector(function(d) { return d[0]; }).left;	// Create custom bisector

		function mouseMove() {		// Add event listeners/handlers

			var	pos_limite= x_scale(data[data.length- 1][0]),
				pos_cursor= d3.mouse(this)[0];

			var x0= pos_cursor > pos_limite ? x_scale.invert(pos_limite) : x_scale.invert(pos_cursor),
				index= bisectDate(data, x0, 1),
				start= data[index- 1],
				end= data[index],
				d= x0 - start[0] > end[0] - x0 ? end : start;

			vertical_line.attr("transform", "translate(" + x_scale(d[0]) + ",0)");

			marker.attr("transform", "translate(" + x_scale(d[0]) + "," + y_scale(d[1]) + ")");

			if (d[1]< 10) {
				marker.select("text")
					.attr("y", -6)
					.text((d[1]));
			}
			else {
				marker.select("text")
					.attr("y", -3)
					.text((d[1]));
			}

			date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + height + ")");

			date_mkr.select("text")
				.attr("y", 7)
				.text(d3.timeFormat("%b-%y")(d[0]));
		};


		canvas.append("rect")		// Plano de transicao, efeito de construcao da area
			.attr("width", width)
			.attr("height", height)
			.attr("x", 0)
			.style("fill", "white")
			.transition()
				.duration(1000)
				.attr("x", width)
				.remove();
	}

	var xAxis= d3.axisBottom(x_scale);			// Construcao dos eixos
		
	if (view=== "small_up_5" || view=== "small_dw_5") xAxis.tickFormat(d3.timeFormat("%Y")).ticks(3).tickPadding(2);
	else xAxis.tickValues([]);

	var yAxis= d3.axisLeft(y_scale)
		.tickValues([0, y_scale.domain()[1]]);

	canvas.append("g")
		.attr("class", "axis-x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	canvas.append("g")
		.attr("class", "axis-y")
		.call(yAxis);

	canvas.append("text")
		.attr("class", "info")
		.attr("transform", "rotate(-90)")
		.attr("x", -(height/ 2)- 8)
		.attr("y", 10 -margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text(y_axis_label);
};