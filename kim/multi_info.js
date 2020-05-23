/*
Gráficos laterais
*/

var parseDate= d3.timeParse("%m/%d/%Y");

function create_info_data(data_source, view) {

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		data.forEach(function(d, index) {
			d.date= parseDate(d.Data);
			d.concentracao= +d.Concentracao;
			d.chuva= +d.Precipitacao;
			d.v_vento= +d.Velocidade_vento;
			d.temperatura= +d.Temperatura;
			d.umidade= +d.Umidade;
		});

		draw_comp_info(data, view);
	});
};

function draw_comp_info(data, view) {

	var width= document.getElementById(view).clientWidth;
	var height= document.getElementById(view).clientHeight;

	var num_charts= 3;

	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");


	var margin= {top: 25, right: 20, bottom: 25, left: 50};

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
			
			y_scale[v_chart].domain([0, 125]);

			area.y1(function(d) { return y_scale[v_chart](d.chuva); });
		}
		else if (v_chart== 1) {
			format_scale[v_chart]= function(d) { return d + " °C"; };
			
			y_axis_label= "Temperatura";
			
			y_scale[v_chart].domain([0, 40]);

			area.y1(function(d) { return y_scale[v_chart](d.temperatura); });
		}
		else if (v_chart== 2) {
			format_scale[v_chart]= function(d) { return d + " m/s"; };
			
			y_axis_label= "Vel. vento";
			
			if ((view=== "info_v2") && (v2_source=== "1997_2006.tsv")) y_scale[v_chart].domain([0, 71]);
			else y_scale[v_chart].domain([0, 25]);

			area.y1(function(d) { return y_scale[v_chart](d.v_vento); });
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
					.style("fill", "#4393c3")
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
			.style("stroke-width", 1.5)
			.call(xAxis);

		sub_canvas.append("g")
			.attr("class", "axis-y")
			.style("stroke-width", 1.5)
			.call(yAxis);

		sub_canvas.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("x", -(in_height/ 2)- 5)
			.attr("y", 20 -margin.left)
			.attr("dy", ".71em")
			.style("text-anchor", "middle")
			.style("font", "14px sans-serif")
			.style("font-color", "black")
			.style("font-weight", "bold")
			.text(y_axis_label);
	}
};