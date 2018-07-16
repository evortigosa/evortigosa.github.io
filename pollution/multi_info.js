/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function create_info_data(data, view, x_axis_horizon) {

	var subset_a= [], subset_b= [], subset_c= [], subset_d= [];

	data.forEach(function(d) {
		subset_a.push({date:d.date, info:d.chuva});
		subset_b.push({date:d.date, info:d.temperatura});
		subset_c.push({date:d.date, info:d.v_vento});
		subset_d.push({date:d.date, info:d.umidade});
	});

	if (view=== "view1") {
		draw_comp_info(subset_a, "info_v1_a", x_axis_horizon);
		draw_comp_info(subset_b, "info_v1_b", x_axis_horizon);
		draw_comp_info(subset_c, "info_v1_c", x_axis_horizon);
		draw_comp_info(subset_d, "info_v1_d", x_axis_horizon);
	}
	else if (view=== "view2") {
		draw_comp_info(subset_a, "info_v2_a", x_axis_horizon);
		draw_comp_info(subset_b, "info_v2_b", x_axis_horizon);
		draw_comp_info(subset_c, "info_v2_c", x_axis_horizon);
		draw_comp_info(subset_d, "info_v2_d", x_axis_horizon);
	}
};

function update_info_data(data_source, view, x_axis_horizon, begin, end) {

	var subset= [];

	var inicio= new Date(begin),
		final= new Date(end);

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		data.forEach(function(d, index) {
			d.date= parseDate(d.Data);
			d.chuva= +d.Precipitacao;
			d.v_vento= +d.Velocidade_vento;
			d.temperatura= +d.Temperatura;
			d.umidade= +d.Umidade;

			var aux= new Date(d.date);

			if ((aux.getTime()>= inicio.getTime()) && (aux.getTime()<= final.getTime())) {
				subset.push(data[index]);
			}
		});

		create_info_data(subset, view, x_axis_horizon);

	});
};

function draw_comp_info(data, view, x_axis_horizon) {

	var y_axis_label= "Precipitação";
	var format_scale= function(d) { return d + " mm"; };

	if (language=== "en") y_axis_label= "Precipitation";

	if ((view=== "info_v1_b") || (view=== "info_v2_b")) {
		y_axis_label= "Temperatura";
		format_scale= function(d) { return d + " °C"; };

		if (language=== "en") y_axis_label= "Temperature";
	}
	else if ((view=== "info_v1_c") || (view=== "info_v2_c")) {
		y_axis_label= "Vel. vento";
		format_scale= function(d) { return d + " m/s"; };

		if (language=== "en") y_axis_label= "Wind speed";
	}
	else if ((view=== "info_v1_d") || (view=== "info_v2_d")) {
		y_axis_label= "Umidade";
		format_scale= function(d) { return d + " %"; };

		if (language=== "en") y_axis_label= "Humidity";
	}


	var margin= {top: 4, right: 20, bottom: 13, left: 30};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var delay_time= 500;


	var x_scale= d3.scaleTime()		// Escala horizontal
		.range([0, width]);

	var y_scale= d3.scaleLinear()	// Escala vertical
		.range([height, 0]);

	x_scale.domain(d3.extent(data, function(d) { return d.date; }));

	if ((view=== "info_v1_a") || (view=== "info_v2_a")) {
		y_scale.domain([0, 125]);
	}
	else if ((view=== "info_v1_b") || (view=== "info_v2_b")) {
		y_scale.domain([0, 45]);
	}
	else if ((view=== "info_v1_c") || (view=== "info_v2_c")) {
		y_scale.domain([0, 72]);
	}
	else if ((view=== "info_v1_d") || (view=== "info_v2_d")) {
		y_scale.domain([0, 100]);
	}


	var area= d3.area()
		.x(function(d) { return x_scale(d.date); })
		.y1(function(d) { return y_scale(d.info); });


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
				.style("fill", color_group(6))
				.attr("d", area);


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
			.style("fill", "steelblue")
			.style("pointer-events", "none");

		marker.append("text")
			.attr("class", "df_label")
			.attr("x", 7)
			.attr("dy", ".4em");

		var date_mkr= canvas.append("g")		// Append a date marker in the Chart
			.style("display", "none");

		date_mkr.append("text")
			.attr("class", "df_label")
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


		var bisectDate= d3.bisector(function(d) { return d.date; }).left;	// Create custom bisector

		function mouseMove() {		// Add event listeners/handlers

			var	pos_limite= x_scale(data[data.length- 1].date),
				pos_cursor= d3.mouse(this)[0];

			var x0= pos_cursor > pos_limite ? x_scale.invert(pos_limite) : x_scale.invert(pos_cursor),
				index= bisectDate(data, x0, 1),
				start= data[index- 1],
				end= data[index],
				d= x0 - start.date > end.date - x0 ? end : start;

			vertical_line.attr("transform", "translate(" + x_scale(d.date) + ",0)");

			marker.attr("transform", "translate(" + x_scale(d.date) + "," + y_scale(d.info) + ")");

			if (d.info< 10) {
				marker.select("text")
					.attr("y", -5)
					.text(format_scale(d.info));
			}
			else {
				marker.select("text")
					.attr("y", 1)
					.text(format_scale(d.info));
			}

			date_mkr.attr("transform", "translate(" + x_scale(d.date) + "," + height + ")");

			date_mkr.select("text")
				.attr("y", 7)
				.text(d3.timeFormat("%d-%b-%y")(d.date));
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

	var xAxis= d3.axisBottom(x_scale)			// Construcao dos eixos
		.tickValues([]);

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
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -(height/ 2)- 5)
		.attr("y", 1 -margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text(y_axis_label);
};