/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function create_info_data(data, view, x_axis_horizon) {

	if (view=== "view1") {
		draw_comp_info(data, "info_v1");
	}
	else if (view=== "view2") {
		draw_comp_info(data, "info_v2");
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

function draw_comp_info(data, view) {

	var width= document.getElementById(view).clientWidth;
	var height= document.getElementById(view).clientHeight;

	var num_charts= 4;

	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");


	var margin= {top: 5, right: 20, bottom: 13, left: 30};

	var in_width= width - margin.left - margin.right;
	var in_height= (height/ num_charts) - margin.top - margin.bottom;

	var delay_time= 500;
	var y_axis_label= "Precipitação";


	var x_scale= d3.scaleTime()					// Escala horizontal
		.range([0, in_width])
		.domain(d3.extent(data, function(d) { return d.date; }));

	var y_scale= [], format_scale= [], v_offset= [];


	for ((v_chart= 0); (v_chart< num_charts); (v_chart++)) {

		y_scale[v_chart]= d3.scaleLinear()		// Escala vertical
			.range([in_height, 0]);

		var area= d3.area()
			.x(function(d) { return x_scale(d.date); });


		if (v_chart== 0) {						// Definicoes de cada uma das variaveis
			format_scale[v_chart]= function(d) { return d + " mm"; };
			
			if (language=== "en") y_axis_label= "Precipitation";
			
			y_scale[v_chart].domain([0, 125]);

			area.y1(function(d) { return y_scale[v_chart](d.chuva); });
		}
		else if (v_chart== 1) {
			format_scale[v_chart]= function(d) { return d + " °C"; };
			
			y_axis_label= "Temperatura";
			if (language=== "en") y_axis_label= "Temperature";
			
			y_scale[v_chart].domain([0, 40]);

			area.y1(function(d) { return y_scale[v_chart](d.temperatura); });
		}
		else if (v_chart== 2) {
			format_scale[v_chart]= function(d) { return d + " m/s"; };
			
			y_axis_label= "Vel. vento";
			if (language=== "en") y_axis_label= "Wind speed";
			
			if (v2_source=== "1997_2006.tsv") y_scale[v_chart].domain([0, 71]);
			else y_scale[v_chart].domain([0, 25]);

			area.y1(function(d) { return y_scale[v_chart](d.v_vento); });
		}
		else if (v_chart== 3) {
			format_scale[v_chart]= function(d) { return d + " %"; };
			
			y_axis_label= "Umidade";
			if (language=== "en") y_axis_label= "Humidity";
			
			y_scale[v_chart].domain([0, 100]);

			area.y1(function(d) { return y_scale[v_chart](d.umidade); });
		}


		v_offset[v_chart]= (v_chart* (margin.top + margin.bottom + in_height))+ margin.top;

		var sub_canvas= canvas.append("g")
			.attr("width", in_width + margin.left + margin.right)
			.attr("height", in_height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + "," + v_offset[v_chart] + ")");


		if (data.length> 1) {				// Se, construo o conteudo dos graficos
			area.y0(y_scale[v_chart](0));

			sub_canvas.append("path")
				.datum(data)
					.style("fill", color_group(6))
					.attr("d", area);

			sub_canvas.append("rect")		// Plano de transicao, efeito de construcao da area
				.attr("width", width)
				.attr("height", height)
				.attr("x", 0)
				.style("fill", "white")
				.transition()
					.duration(1000)
					.attr("x", width)
					.remove();
		}


		var xAxis= d3.axisBottom(x_scale)	// Construcao dos eixos
			.tickValues([]);

		var yAxis= d3.axisLeft(y_scale[v_chart])
			.tickValues([0, y_scale[v_chart].domain()[1]]);

		sub_canvas.append("g")
			.attr("class", "axis-x")
			.attr("transform", "translate(0," + in_height + ")")
			.call(xAxis);

		sub_canvas.append("g")
			.attr("class", "axis-y")
			.call(yAxis);

		sub_canvas.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("x", -(in_height/ 2)- 5)
			.attr("y", 1 -margin.left)
			.attr("dy", ".71em")
			.style("text-anchor", "middle")
			.text(y_axis_label);
	}

	if (data.length> 1) {					// Eventos de mouse

		var events_pl= canvas.append("g")
			.attr("width", in_width)
			.attr("height", height - margin.top - margin.bottom)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var vertical_line= [], marker= [];


		for ((v_chart= 0); (v_chart< num_charts); (v_chart++)) {

			vertical_line[v_chart]= events_pl.append("g")	// Append a vertical line in the Chart
				.attr("class", "marker_line")
				.style("display", "none");

			vertical_line[v_chart].append("line")
				.attr("y1", -5)
				.attr("y2", in_height)
				.attr("fill", "none")
				.style("stroke-width", "1px")
				.style("stroke", "black")
				.style("stroke-dasharray", "4,4");


			marker[v_chart]= events_pl.append("g")			// Append marker in the Chart
				.style("display", "none");

			marker[v_chart].append("circle")
				.attr("class", "marker")
				.attr("r", 4)
				.style("fill", "steelblue")
				.style("pointer-events", "none");

			marker[v_chart].append("text")
				.attr("class", "df_label")
				.attr("dy", ".4em");
		}


		var date_mkr= events_pl.append("g")					// Append a date marker in the Chart
			.style("display", "none");

		date_mkr.append("text")
			.attr("class", "df_label")
			.style("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("x", -1)
			.attr("dy", ".4em");


		// Plano de eventos, ativa a linha que acompanha o mouse e os marcadores de valor
		events_pl.append("rect")
			.attr("width", in_width)
			.attr("height", height - margin.top - margin.bottom)
			.style("fill", "none")
			.on("mouseover", function() {
				vertical_line[0].style("display", null);
				vertical_line[1].style("display", null);
				vertical_line[2].style("display", null);
				vertical_line[3].style("display", null);

				marker[0].style("display", null);
				marker[1].style("display", null);
				marker[2].style("display", null);
				marker[3].style("display", null);

				date_mkr.style("display", null);
			})
			.on("mouseout", function() { 
				vertical_line[0].style("display", "none");
				vertical_line[1].style("display", "none");
				vertical_line[2].style("display", "none");
				vertical_line[3].style("display", "none");

				marker[0].style("display", "none");
				marker[1].style("display", "none");
				marker[2].style("display", "none");
				marker[3].style("display", "none");

				date_mkr.style("display", "none");
			})
			.on("mousemove", mouseMove)
			.transition()
				.delay(delay_time)
				.style("pointer-events", "all");


		var bisectDate= d3.bisector(function(d) { return d.date; }).left;	// Create custom bisector

		function mouseMove() {			// Add event listeners/handlers

			var	pos_limite= x_scale(data[data.length- 1].date),
				pos_cursorX= d3.mouse(this)[0],
				pos_cursorY= d3.mouse(this)[1];

			var x0= pos_cursorX > pos_limite ? x_scale.invert(pos_limite) : x_scale.invert(pos_cursorX),
				index= bisectDate(data, x0, 1),
				start= data[index- 1],
				end= data[index],
				d= x0 - start.date > end.date - x0 ? end : start;

			var y_mov1= -8, y_mov2= 0,
				x_mov1= -7, x_mov2= 7;


			vertical_line[0].attr("transform", "translate(" + x_scale(d.date) + "," + v_offset[0] + ")")
			vertical_line[1].attr("transform", "translate(" + x_scale(d.date) + "," + v_offset[1] + ")")
			vertical_line[2].attr("transform", "translate(" + x_scale(d.date) + "," + v_offset[2] + ")")
			vertical_line[3].attr("transform", "translate(" + x_scale(d.date) + "," + v_offset[3] + ")")

			marker[0].attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[0] - margin.top + y_scale[0](d.chuva)) + ")");
			marker[1].attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[1] - margin.top + y_scale[1](d.temperatura)) + ")");
			marker[2].attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[2] - margin.top + y_scale[2](d.v_vento)) + ")");
			marker[3].attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[3] - margin.top + y_scale[3](d.umidade)) + ")");

			if (d.chuva< 10) marker[0].select("text").attr("y", y_mov1).text(format_scale[0](d.chuva));
			else marker[0].select("text").attr("y", y_mov2).text(format_scale[0](d.chuva));

			if (d.temperatura< 10) marker[1].select("text").attr("y", y_mov1).text(format_scale[1](d.temperatura));
			else marker[1].select("text").attr("y", y_mov2).text(format_scale[1](d.temperatura));

			if (d.v_vento< 10) marker[2].select("text").attr("y", y_mov1).text(format_scale[2](d.v_vento));
			else marker[2].select("text").attr("y", y_mov2).text(format_scale[2](d.v_vento));

			if (d.umidade< 10) marker[3].select("text").attr("y", y_mov1).text(format_scale[3](d.umidade));
			else marker[3].select("text").attr("y", y_mov2).text(format_scale[3](d.umidade));

			if (pos_cursorX> (in_width* 0.9)) {
				marker[0].select("text").style("text-anchor", "end").attr("x", x_mov1);
				marker[1].select("text").style("text-anchor", "end").attr("x", x_mov1);
				marker[2].select("text").style("text-anchor", "end").attr("x", x_mov1);
				marker[3].select("text").style("text-anchor", "end").attr("x", x_mov1);
			}
			else {
				marker[0].select("text").style("text-anchor", "start").attr("x", x_mov2);
				marker[1].select("text").style("text-anchor", "start").attr("x", x_mov2);
				marker[2].select("text").style("text-anchor", "start").attr("x", x_mov2);
				marker[3].select("text").style("text-anchor", "start").attr("x", x_mov2);
			}

			if (pos_cursorY< v_offset[1]) date_mkr.attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[0] - margin.top + in_height) + ")");
			else if (pos_cursorY< v_offset[2]) date_mkr.attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[1] - margin.top + in_height) + ")");
			else if (pos_cursorY< v_offset[3]) date_mkr.attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[2] - margin.top + in_height) + ")");
			else date_mkr.attr("transform", "translate(" + x_scale(d.date) + "," + (v_offset[3] - margin.top + in_height) + ")");

			date_mkr.select("text")
				.attr("y", 7)
				.text(d3.timeFormat("%d-%b-%y")(d.date));
		};
	}
};