/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function draw_small_info(data, disease, view) {

	var width= document.getElementById(view).clientWidth;
	var height= document.getElementById(view).clientHeight;

	var num_charts= 5;

	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");


	var margin= {top: 5, right: 15, bottom: 18, left: 40};

	var in_width= width - margin.left - margin.right;
	var in_height= (height/ num_charts) - margin.top - margin.bottom;

	var delay_time= 500;
	var idx_dis= [], y_axis_label= "";

	for ((i= 0); (i< diseases.length); (i++))
		if (diseases[i]!== disease) idx_dis.push(i+ 1);	// Somo 1 pra shiftar date


	var x_scale= d3.scaleTime()					// Escala horizontal
		.range([0, in_width])
		.domain(d3.extent(data, function(d) { return d[0]; }));

	var y_scale= [], v_offset= [];


	for ((v_chart= 0); (v_chart< num_charts); (v_chart++)) {

		y_scale[v_chart]= d3.scaleLinear()		// Escala vertical
			.range([in_height, 0]);

		if (idx_dis[v_chart]== 1) y_scale[v_chart].domain([0, 160]);
		else y_scale[v_chart].domain([0, 45]);

		var line= d3.area()
			.curve(d3.curveNatural)
			.x(function(d) { return x_scale(d[0]); })
			.y(function(d) { return y_scale[v_chart](d[idx_dis[v_chart]]); });

		var area= d3.area()
			.curve(d3.curveNatural)
			.x(function(d) { return x_scale(d[0]); })
			.y1(function(d) { return y_scale[v_chart](d[idx_dis[v_chart]]); });


		if (idx_dis[v_chart]== 1) y_axis_label= "Pneumonia";
		else if (idx_dis[v_chart]== 2) y_axis_label= "Laryngitis";
		else if (idx_dis[v_chart]== 3) y_axis_label= "Bronchitis";
		else if (idx_dis[v_chart]== 4) y_axis_label= "Tonsillitis";
		else if (idx_dis[v_chart]== 5) y_axis_label= "Asthma";
		else if (idx_dis[v_chart]== 6) y_axis_label= "Others";


		v_offset[v_chart]= (v_chart* (margin.top + margin.bottom + in_height))+ margin.top;

		var sub_canvas= canvas.append("g")
			.attr("width", in_width + margin.left + margin.right)
			.attr("height", in_height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + "," + v_offset[v_chart] + ")");


		if (data.length> 1) {				// Se, construo os graficos normalmente
			area.y0(y_scale[v_chart](0));

			sub_canvas.append("path")
				.datum(data)
					.attr("class", "small_area")
					.attr("d", area);

			sub_canvas.append("path")
				.datum(data)
					.attr("class", "small_line")
					.attr("d", line);


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


		var xAxis= d3.axisBottom(x_scale);		// Construcao dos eixos
		
		if (v_chart== 4) xAxis.tickFormat(d3.timeFormat("%Y")).ticks(4).tickPadding(2);
		else xAxis.tickValues([]);

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
			.attr("class", "info")
			.attr("transform", "rotate(-90)")
			.attr("x", -(in_height/ 2)- 8)
			.attr("y", 10 -margin.left)
			.attr("dy", ".71em")
			.style("text-anchor", "middle")
			.text(y_axis_label);
	}


	if (data.length> 1) {			// Se, construo os eventos de mouse

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
				.style("fill", "darkred")
				.style("pointer-events", "none");

			marker[v_chart].append("text")
				.attr("class", "m_label")
				.attr("x", 7)
				.attr("dy", ".4em");
		}


		var date_mkr= events_pl.append("g")					// Append a date marker in the Chart
			.style("display", "none");

		date_mkr.append("text")
			.attr("class", "m_label")
			.style("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("x", -3)
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
				vertical_line[4].style("display", null);

				marker[0].style("display", null);
				marker[1].style("display", null);
				marker[2].style("display", null);
				marker[3].style("display", null);
				marker[4].style("display", null);

				date_mkr.style("display", null);
			})
			.on("mouseout", function() { 
				vertical_line[0].style("display", "none");
				vertical_line[1].style("display", "none");
				vertical_line[2].style("display", "none");
				vertical_line[3].style("display", "none");
				vertical_line[4].style("display", "none");

				marker[0].style("display", "none");
				marker[1].style("display", "none");
				marker[2].style("display", "none");
				marker[3].style("display", "none");
				marker[4].style("display", "none");

				date_mkr.style("display", "none");
			})
			.on("mousemove", mouseMove)
			.transition()
				.delay(delay_time)
				.style("pointer-events", "all");


		var bisectDate= d3.bisector(function(d) { return d[0]; }).left;	// Create custom bisector

		function mouseMove() {		// Add event listeners/handlers

			var	pos_limite= x_scale(data[data.length- 1][0]),
				pos_cursorX= d3.mouse(this)[0],
				pos_cursorY= d3.mouse(this)[1];

			var x0= pos_cursorX > pos_limite ? x_scale.invert(pos_limite) : x_scale.invert(pos_cursorX),
				index= bisectDate(data, x0, 1),
				start= data[index- 1],
				end= data[index],
				d= x0 - start[0] > end[0] - x0 ? end : start;

			var y_mov1= -8,
				y_mov2= 0;


			vertical_line[0].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[0] - margin.top) + ")")
			vertical_line[1].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[1] - margin.top) + ")")
			vertical_line[2].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[2] - margin.top) + ")")
			vertical_line[3].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[3] - margin.top) + ")")
			vertical_line[4].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[4] - margin.top) + ")")

			marker[0].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[0] - margin.top + y_scale[0](d[idx_dis[0]])) + ")");
			marker[1].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[1] - margin.top + y_scale[1](d[idx_dis[1]])) + ")");
			marker[2].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[2] - margin.top + y_scale[2](d[idx_dis[2]])) + ")");
			marker[3].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[3] - margin.top + y_scale[3](d[idx_dis[3]])) + ")");
			marker[4].attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[4] - margin.top + y_scale[4](d[idx_dis[4]])) + ")");

			if (d[idx_dis[0]]< 10) marker[0].select("text").attr("y", y_mov1).text(d[idx_dis[0]]);
			else marker[0].select("text").attr("y", y_mov2).text(d[idx_dis[0]]);

			if (d[idx_dis[1]]< 10) marker[1].select("text").attr("y", y_mov1).text(d[idx_dis[1]]);
			else marker[1].select("text").attr("y", y_mov2).text(d[idx_dis[1]]);

			if (d[idx_dis[2]]< 10) marker[2].select("text").attr("y", y_mov1).text(d[idx_dis[2]]);
			else marker[2].select("text").attr("y", y_mov2).text(d[idx_dis[2]]);

			if (d[idx_dis[3]]< 10) marker[3].select("text").attr("y", y_mov1).text(d[idx_dis[3]]);
			else marker[3].select("text").attr("y", y_mov2).text(d[idx_dis[3]]);

			if (d[idx_dis[4]]< 10) marker[4].select("text").attr("y", y_mov1).text(d[idx_dis[4]]);
			else marker[4].select("text").attr("y", y_mov2).text(d[idx_dis[4]]);


			if (pos_cursorY< v_offset[1]) date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[0] - margin.top + in_height) + ")");
			else if (pos_cursorY< v_offset[2]) date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[1] - margin.top + in_height) + ")");
			else if (pos_cursorY< v_offset[3]) date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[2] - margin.top + in_height) + ")");
			else date_mkr.attr("transform", "translate(" + x_scale(d[0]) + "," + (v_offset[3] - margin.top + in_height) + ")");

			date_mkr.select("text")
				.attr("y", 8)
				.text(d3.timeFormat("%b-%y")(d[0]));
		};
	}
};