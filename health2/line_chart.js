/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function draw_line_area(data, view, max_vertical) {

	var mass_un= "μg/m³";
	var format_mass= function(d) { return d3.format(".2f")(d) + " " + mass_un; };

	var y_axis_label= "PM10 (" + mass_un + ")";


	var margin= {top: 5, right: 15, bottom: 13, left: 50};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var delay_time= 500;


	var x_scale= d3.scaleTime()		// Escala horizontal
		.range([0, width])
		.domain(d3.extent(data, function(d) { return d[0]; }));

	var y_scale= d3.scaleLinear()	// Escala vertical
		.range([height, 0]);

	y_scale.domain([0,max_vertical]).nice();


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


	if (data.length> 1) {				// Se, construo o grafico normalmente
		canvas.datum(data);

		canvas.append("clipPath")
			.attr("id", "clip-path")
			.append("path")
			.attr("d", area.y0(height));

		canvas.append("path")
			.attr("class", "fill_area")
			.attr("d", area);

		canvas.append("path")
			.attr("class", "line")
			.attr("d", line);


		canvas.append("rect")			// Plano de transicao, efeito de construcao da area
			.attr("width", width)
			.attr("height", height)
			.attr("x", 0)
			.style("fill", "white")
			.transition()
				.duration(1000)
				.attr("x", width)
				.remove();
	}


	var xAxis= d3.axisBottom(x_scale)		// Construcao dos eixos
		.tickValues([]);

	var yAxis= d3.axisLeft(y_scale)
		.tickFormat(d3.format(".0f"));

	if (data.length> 1) yAxis.tickValues([0, y_scale.domain()[1]/2, y_scale.domain()[1]]);
	else yAxis.tickValues([]);

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
		.attr("x", -(height/ 2))
		.attr("y", 1 -margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text(y_axis_label);


	if (data.length> 1) {			// Se, construo os eventos de mouse

		var vertical_line= canvas.append("g")	// Append a vertical line in the Chart
			.attr("class", "marker_line")
			.style("display", "none");

		vertical_line.append("line")
			.attr("y1", -5)
			.attr("y2", height)
			.attr("fill", "none")
			.style("stroke-width", "1px")
			.style("stroke", "black")
			.style("stroke-dasharray", "4,4");


		var marker= canvas.append("g")			// Append a marker in the Chart
			.style("display", "none");

		marker.append("circle")
			.attr("class", "marker")
			.attr("r", 4)
			.style("fill", "steelblue")
			.style("pointer-events", "none");

		marker.append("text")
			.attr("class", "m_label")
			.attr("dy", ".4em");

		var date_mkr= canvas.append("g")		// Append a date marker in the Chart
			.style("display", "none");

		date_mkr.append("text")
			.attr("class", "m_label")
			.style("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("x", 0)
			.attr("dy", ".4em");


		// Plano de eventos, ativa a linha que acompanha o mouse e os marcadores de valor
		canvas.append("rect")
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

			var y_mov1= -8, y_mov2= 0,
				x_mov1= "start", x_mov2= 7;


			vertical_line.attr("transform", "translate(" + x_scale(d[0]) + ",0)");

			marker.attr("transform", "translate(" + x_scale(d[0]) + "," + y_scale(d[1]) + ")");
			
			if (d[1]< 5) {
				marker.select("text")
					.attr("y", y_mov1)
					.text(format_mass(d[1]));
			}
			else {
				marker.select("text")
					.attr("y", y_mov2)
					.text(format_mass(d[1]));
			}

			if (pos_cursor> (width* 0.8)) {
				x_mov1= "end";
				x_mov2= x_mov2* (-1);
			}

			marker.select("text").style("text-anchor", x_mov1).attr("x", x_mov2);

			if (view== "pm10_v2" || view== "pm10_v4") {
				date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + height + ")");

				date_mkr.select("text")
					.attr("y", 7)
					.text(d3.timeFormat("%b-%y")(d[0]));
			}
		};
	}
};
