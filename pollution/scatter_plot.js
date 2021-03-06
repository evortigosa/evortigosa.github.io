/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function read_sp_data(data_source, view, x_axis_horizon) {

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		if (x_axis_horizon== 1) {
			data.forEach(function(d) {
				d.date= parseDate(d.Data);
				d.concentracao= +d.Concentracao;
				d.chuva= +d.Precipitacao;
				d.v_vento= +d.Velocidade_vento;
				d.d_vento= +d.Direcao_vento;
				d.temperatura= +d.Temperatura;
				d.umidade= +d.Umidade;
			});
		}
		else {
			data.forEach(function(d) {
				d.date= parseDate(d.Data);
				d.concentracao= +d.Concentracao;
				d.chuva= +d.Precipitacao;
				d.v_vento= +d.Velocidade_vento;
				d.temperatura= +d.Temperatura;
				d.umidade= +d.Umidade;
			});
		}

		draw_plot(data, view, x_axis_horizon);
		create_info_data(data, view, x_axis_horizon);
	});
};

function draw_plot(data, view, x_axis_horizon) {	   // view assume os valores (string), view1 ou view2

	var y_axis_label= "Concentração do MP<tspan font-size=9 baseline-shift=sub>10</tspan>";
	var x_axis_label= "Intervalo de Amostragem";

	var format_dia= function(d) { return "Data: " + d3.timeFormat("%d-%b-%Y")(d); };
	var format_con= function(d) { return "Concentração:  " + format_mass(d); };
	var format_chu= function(d) { return "Precipitação: " + d + " mm"; };
	var format_v_v= function(d) { return "Velocidade do vento: " + d + " m/s"; };
	var format_d_v= function(d) { return "Direção do vento: " + d + "°"; };
	var format_tem= function(d) { return "Temperatura: " + d + " °C"; };
	var format_umi= function(d) { return "Umidade relativa: " + d + "%"; };

	if (language=== "en") {
		y_axis_label= "PM<tspan font-size=9 baseline-shift=sub>10</tspan> Concentration";
		x_axis_label= "Sampling Interval";

		format_dia= function(d) { return "Date: " + d3.timeFormat("%d-%b-%Y")(d); };
		format_con= function(d) { return "Concentration:  " + format_mass(d); };
		format_chu= function(d) { return "Precipitation: " + d + " mm"; };
		format_v_v= function(d) { return "Wind speed: " + d + " m/s"; };
		format_d_v= function(d) { return "Wind direction: " + d + "°"; };
		format_tem= function(d) { return "Temperature: " + d + " °C"; };
		format_umi= function(d) { return "Relative humidity: " + d + "%"; };
	}


	var margin= {top: 10, right: 35, bottom: 50, left: 50};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;


	var x0= d3.extent(data, function(d) { return d.date; });

	var x_scale= d3.scaleTime()		// Escala horizontal
		.range([0, width])
		.domain(x0).nice();

	var y0= [0, d3.max(data, function(d) { return d.concentracao; })];

	var y_scale= d3.scaleLinear()		// Escala vertical
		.range([height, 0])
		.domain(y0).nice();


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	canvas.append("defs").append("clipPath")   // Tela de recorte interna do grafico. Evita que elementos saiam da area do grafico
		.attr("id", "clip")
		.append("rect")
			.attr("width", width)
			.attr("height", height);


	var xGrid= d3.axisBottom(x_scale)	// Draw the x Grid lines
		.tickFormat("");

	canvas.append("g")
		.attr("class", "grid-x")
		.attr("transform", "translate(0," + height + ")")
		.call(xGrid.tickSize(-height, 0, 0));

	var yGrid= d3.axisLeft(y_scale)		// Draw the y Grid lines
		.tickFormat("");

	canvas.append("g")
		.attr("class", "grid-y")
		.call(yGrid.tickSize(-width, 0, 0));


	var tip= d3.select(view_aux)	// Tooltip
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);


	var brush= d3.brushX()    // Focus + Context
		.extent([[0, 0], [width, height]])
		.on("end", brushended);
	
	var idleTimeout, idleDelay= 350;

	canvas.append("g")
		.attr("class", "brush")
		.attr("clip-path", "url(#clip)")
		.call(brush);


	var circles= canvas.selectAll(".dot")
		.data(data)
		.enter().append("circle")
			.attr("class", "dot")
			.attr("clip-path", "url(#clip)")
			.attr("r", 0)
			.attr("cx", function(d) { return x_scale(d.date); })
			.attr("cy", function(d) { return height; })
			.style("fill", function(d) { 
				var date_aux= new Date(d.date);
				var n_day= date_aux.getDate();				// getDate() returns 1 - 31
				var n_month= date_aux.getMonth()+ 1;		// getMonth() returns 0 - 11

				if ((n_month>= 3) && (n_month<= 6)) {		// outono
					if (((n_month> 3) && (n_month< 6)) || ((n_month== 3) && (n_day>= 20)) || ((n_month== 6) && (n_day<= 20)))
						return color_group(1);
				}
				else if ((n_month>= 9) && (n_month<= 12)) {	// primavera
					if (((n_month> 9) && (n_month< 12)) || ((n_month== 9) && (n_day>= 23)) || ((n_month== 12) && (n_day<= 21)))
						return color_group(3);
				}

				if ((n_month>= 6) && (n_month<= 9)) {		// inverno
					if (((n_month> 6) && (n_month< 9)) || ((n_month== 6) && (n_day>= 21)) || ((n_month== 9) && (n_day<= 22)))
						return color_group(2);
				}
				else if ((n_month== 12) || (n_month<= 3)) {	// verao
					if ((n_month< 3) || ((n_month== 12) && (n_day>= 22)) || ((n_month== 3) && (n_day<= 19)))
						return color_group(0);
				}
			})
			.on("mouseover", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				var p_horiz= 70;
				var p_vertc= 28;

				if (x_axis_horizon== 1) {
					tip.html(format_dia(d.date) + "<br>" + format_con(d.concentracao) + "<br>" + format_chu(d.chuva) + "<br>" + 
							format_tem(d.temperatura) + "<br>" + format_v_v(d.v_vento) + "<br>" + format_d_v(d.d_vento) + "<br>" + format_umi(d.umidade))
						.style("left", (mousePos[0]- p_horiz) + "px")
						.style("top", (mousePos[1]+ p_vertc) + "px")
						.style("opacity", 1)
						.transition()
							.duration(100);
				}
				else {
					tip.html(format_dia(d.date) + "<br>" + format_con(d.concentracao) + "<br>" + format_chu(d.chuva) + "<br>" + 
							format_tem(d.temperatura) + "<br>" + format_v_v(d.v_vento) + "<br>" + format_umi(d.umidade))
						.style("left", (mousePos[0]- p_horiz) + "px")
						.style("top", (mousePos[1]+ p_vertc) + "px")
						.style("opacity", 1)
						.transition()
							.duration(100);
				}
			})
			.on("mousemove", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				var p_horiz= 70;
				var p_vertc= 28;

				if (x_axis_horizon== 1) {
					tip.html(format_dia(d.date) + "<br>" + format_con(d.concentracao) + "<br>" + format_chu(d.chuva) + "<br>" + 
							format_tem(d.temperatura) + "<br>" + format_v_v(d.v_vento) + "<br>" + format_d_v(d.d_vento) + "<br>" + format_umi(d.umidade))
						.style("left", (mousePos[0]- p_horiz) + "px")
						.style("top", (mousePos[1]+ p_vertc) + "px");
				}
				else {
					tip.html(format_dia(d.date) + "<br>" + format_con(d.concentracao) + "<br>" + format_chu(d.chuva) + "<br>" + 
							format_tem(d.temperatura) + "<br>" + format_v_v(d.v_vento) + "<br>" + format_umi(d.umidade))
						.style("left", (mousePos[0]- p_horiz) + "px")
						.style("top", (mousePos[1]+ p_vertc) + "px");
				}
			})
			.on("mouseout", function(d) {
				tip.transition()
					.duration(100)
					.style("opacity", 0);
			})
			.transition()
				.duration(1000)
				.attr("cy", function(d) { return y_scale(d.concentracao); })
				.attr("r", function(d) { return r_scale(d.concentracao); });


	/* Linhas dos niveis aceitaveis de poluicao - OMS */
	if (x_axis_horizon== 1) {
		canvas.append("rect")
			.attr("class", "level-line")
			.style("fill", "black")
			.style("stroke-width", 0)
			.style("stroke", "black")
			.attr("x", 0)
			.attr("y", y_scale(50))
			.attr("width", width)
			.attr("height", 2);

		canvas.append("text")
			.style("fill", "black")
			.style("font-size", 11)
			.attr("x", 3)
			.attr("y", y_scale(50)- 2)
			.text("WHO 24-hour mean");
	}


/*	canvas.append("rect")
		.attr("class", "level-line")
		.style("fill", "black")
		.style("stroke-width", 0)
		.style("stroke", "black")
		.attr("x", 0)
		.attr("y", y_scale(120))
		.attr("width", width)
		.attr("height", 2);

	canvas.append("text")
		.style("fill", "black")
		.style("font-size", 10)
		.attr("x", 3)
		.attr("y", y_scale(120)- 2)
		.text("CETESB 24-hour mean");
*/

	/* Construcao dos eixos */
	var xAxis;

	if (x_axis_horizon== 1) {
		xAxis= d3.axisBottom(x_scale)
			.tickFormat(d3.timeFormat("%b-%Y"));
	}
	else if (x_axis_horizon== 2) {
		xAxis= d3.axisBottom(x_scale)
			.tickFormat(d3.timeFormat("%b-%Y"));
	}

	var yAxis= d3.axisLeft(y_scale)
		.tickFormat(d3.format(".0f"));

	canvas.append("g")
		.attr("class", "axis-x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	canvas.append("text")
		.attr("class", "label")
		.attr("x", width/ 2)
		.attr("y", height+ margin.bottom- 10)
		.style("text-anchor", "middle")
		.text(x_axis_label);

	canvas.append("g")
		.attr("class", "axis-y")
		.call(yAxis);

	canvas.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -(height/ 2)- 4)
		.attr("y", 1 -margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.html(y_axis_label + " (" + mass_un + ")");


	var zoomStack= [],		// Variaveis que empilharao o historico do zoom (dominio horizontal, intervalo temporal)
		daysStack= [];

	/* Brush and Zoom functions */
	/* Linhas comentadas servem para zoom bi-dimensional, brush= d3.brush() */
	function brushended() {

		var s= d3.event.selection;

		if (!s) {	// Zoom out
			if (!idleTimeout) return idleTimeout= setTimeout(idled, idleDelay);

			var zoomOut= zoomStack.pop();	// Caso receba um duplo clique, desempilho o ultimo dominio horizontal
			var auxDays= daysStack.pop();

			if (zoomStack.length!= 0) {		// Se esta pilha nao estiver vazia, retorno ao estado anterior do modulo

				var inicio= d3.timeFormat("%m/%d/%Y")(auxDays[0]),
					final= d3.timeFormat("%m/%d/%Y")(auxDays[1]);

				if (((view=== "view1") && (v2_source=== "2014_2015.tsv")) ||
					((view=== "view2") && (v2_source=== "1997_2006.tsv")))
					update_df_data(path + "dif_" + v2_source, "view_df", inicio, final);	// Estado anterior do grafico bivariado

				if (view=== "view1") update_info_data(v1_source, view, x_axis_horizon, inicio, final);	// Estado anterior dos small multiples
				else if (view=== "view2") update_info_data(path + v2_source, view, x_axis_horizon, inicio, final);

				x_scale.domain(zoomOut);	// Estado anterior do dominio horizontal
			}
			else {							// Senao, retorno ao estado inicial do modulo
				x_scale.domain(x0).nice();	// Estado inicial do dominio horizontal
				//y_scale.domain(y0).nice();

				if (((view=== "view1") && (v2_source=== "2014_2015.tsv")) ||
					((view=== "view2") && (v2_source=== "1997_2006.tsv")))
					read_df_data(path + "dif_" + v2_source, "view_df");			// Estado inicial do grafico bivariado

				create_info_data(data, view, x_axis_horizon);					// Estado inicial dos small multiples
			}
		}
		else {		// Zoom in

			var d0= s.map(x_scale.invert, x_scale),
				d1= d0.map(d3.timeDay.round);

			var inicio= d3.timeFormat("%m/%d/%Y")(d1[0]),
				final= d3.timeFormat("%m/%d/%Y")(d1[1]);

			if (((view=== "view1") && (v2_source=== "2014_2015.tsv")) ||
				((view=== "view2") && (v2_source=== "1997_2006.tsv")))
				update_df_data(path + "dif_" + v2_source, "view_df", inicio, final);	// Zoom in no grafico bivariado

			if (view=== "view1") update_info_data(v1_source, view, x_axis_horizon, inicio, final);		// Zoom in nos small multiples
			else if (view=== "view2") update_info_data(path + v2_source, view, x_axis_horizon, inicio, final);

			zoomStack.push(x_scale.domain());
			daysStack.push([0, width].map(x_scale.invert, x_scale));	// Empilho os estados graficos atuais (dominio horizontal, intervalo temporal)

			x_scale.domain([s[0], s[1]].map(x_scale.invert, x_scale));	// Atualizo o dominio horizontal para o novo estado de zoom in
			//x_scale.domain([s[0][0], s[1][0]].map(x_scale.invert, x_scale));
			//y_scale.domain([s[1][1], s[0][1]].map(y_scale.invert, y_scale));

			canvas.select(".brush")
				.call(brush.move, null);
		}

		zoom();
	};

	function idled() { idleTimeout= null; };

	function zoom() {

		var t= canvas.transition()
			.duration(750);

		canvas.select(".axis-x").transition(t)
			.call(xAxis);
		
		canvas.select(".axis-y").transition(t)
			.call(yAxis);

		canvas.select(".grid-x").transition(t)
			.call(xGrid);

		canvas.select(".grid-y").transition(t)
			.call(yGrid);
		
		canvas.selectAll("circle")
			.transition(t)
				.attr("cx", function(d) { return x_scale(d.date); })
				.attr("cy", function(d) { return y_scale(d.concentracao); });
	};
};
