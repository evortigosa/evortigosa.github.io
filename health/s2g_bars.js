/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function draw_s2g_bars(data, view) {

	var margin= {top: 10, right: 35, bottom: 40, left: 50};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var x= d3.transpose(data.slice(0, 1));
	var y= data.slice(1, data.length);

	var n= y.length;		// The number of series.
    var m= y[0].length;		// The number of values per series.


	// The xz array has m elements, representing the x-values shared by all series.
	// The yz array has n elements, representing the y-values of each of the n series.
	// Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
	// The y01z array has the same structure as yz, but with stacked [y0, y1] instead of y.
	var xz= d3.range(m),
		yz= y,
		y01z= d3.stack().keys(d3.range(n))(d3.transpose(yz)),
		yMax= d3.max(yz, function(y) { return d3.max(y); }),
		y1Max= d3.max(y01z, function(y) { return d3.max(y, function(d) { return d[1]; }); });


	var x_scale= d3.scaleBand()
		.domain(xz)
		.rangeRound([0, width])
		.padding(0.06);

	var x_axis= d3.scaleBand()
		.domain(x.map(function(d) { return parseDate1(d); }))
		.rangeRound([0, width])
		.padding(0.06);

	var y_scale= d3.scaleLinear()
		.domain([0, y1Max])
		.range([height, 0])
		.nice();


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	/* The tooltip, initial display is hidden */
	var tip= d3.select(view_aux)
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var p_horiz= 45;
	var p_vertc= 28;


	var series= canvas.selectAll(".series")
		.data(y01z)
		.enter().append("g")
			.attr("fill", function(d, i) { return color_group(i); });

	var rect= series.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
			.attr("x", function(d, i) { return x_scale(i); })
			.attr("y", height)
			.attr("width", x_scale.bandwidth())
			.attr("height", 0)
			.on("mouseover", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				tip.html(d3.format(".2f")(d[1]- d[0]))
					.style("left", (mousePos[0]- p_horiz) + "px")
					.style("top", (mousePos[1]+ p_vertc) + "px")
					.style("opacity", 1)
					.transition()
						.duration(100);
			})
			.on("mousemove", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				tip.html(d3.format(".2f")(d[1]- d[0]))
					.style("left", (mousePos[0]- p_horiz) + "px")
					.style("top", (mousePos[1]+ p_vertc) + "px");
			})
			.on("mouseout", function(d) {
				tip.transition()
					.duration(100)
					.style("opacity", 0);
			});

	rect.transition()
		.delay(function(d, i) { return i * 10; })
		.attr("y", function(d) { return y_scale(d[1]); })
		.attr("height", function(d) { return y_scale(d[0]) - y_scale(d[1]); });


	/* Transition functions */
	d3.selectAll("input")
		.on("change", changed);

/*	var timeout= d3.timeout(function() {
		d3.select("input[value=\"grouped\"]")	// muda de estilo automaticamente ao inicializar
			.property("checked", true)
			.dispatch("change");
	}, 2000);
*/
	function changed() {
//		timeout.stop();
		
		if (this.value=== "grouped") transitionGrouped();
		else transitionStacked();

		y_axis();
	};

	function transitionGrouped() {
		y_scale.domain([0, yMax]).nice();

		rect.transition()
			.duration(500)
			.delay(function(d, i) { return i * 10; })
			.attr("x", function(d, i) { return x_scale(i) + x_scale.bandwidth() / n * this.parentNode.__data__.key; })
			.attr("width", x_scale.bandwidth() / n)
			.transition()
				.attr("y", function(d) { return y_scale(d[1] - d[0]); })
				.attr("height", function(d) { return y_scale(0) - y_scale(d[1] - d[0]); });
	};

	function transitionStacked() {
		y_scale.domain([0, y1Max]).nice();

		rect.transition()
			.duration(500)
			.delay(function(d, i) { return i * 10; })
			.attr("y", function(d) { return y_scale(d[1]); })
			.attr("height", function(d) { return y_scale(d[0]) - y_scale(d[1]); })
			.transition()
				.attr("x", function(d, i) { return x_scale(i); })
				.attr("width", x_scale.bandwidth());
	};

	draw_axis(canvas, x_axis, y_scale, width, height, 0);

	y_axis();

	function y_axis() {

		if (view=== "view1" || view=== "view2") {
			d3.select(".axisA-y")
				.transition()
				.duration(300)
					.remove();

			canvas.append("g")
				.attr("class", "axisA-y")
				.transition()
				.duration(500)
					.call(d3.axisLeft(y_scale)
						.tickFormat(d3.format(".0f")));
		}
		else {
			d3.select(".axisB-y")
				.transition()
				.duration(300)
					.remove();

			canvas.append("g")
				.attr("class", "axisB-y")
				.transition()
				.duration(500)
					.call(d3.axisLeft(y_scale)
						.tickFormat(d3.format(".0f")));
		}
	};
};

function draw_g_bars(data, view) {

	var margin= {top: 10, right: 35, bottom: 40, left: 50};

	var width= document.getElementById(view).clientWidth- margin.left- margin.right;
	var height= document.getElementById(view).clientHeight- margin.top- margin.bottom;

	var x= d3.transpose(data.slice(0, 1));
	var y= data.slice(1, data.length);

	var n= y.length;		// The number of series.
    var m= y[0].length;		// The number of values per series.


	// The xz array has m elements, representing the x-values shared by all series.
	// The yz array has n elements, representing the y-values of each of the n series.
	// Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
	// The y01z array has the same structure as yz, but with stacked [y0, y1] instead of y.
	var xz= d3.range(m),
		yz= y,
		y01z= d3.stack().keys(d3.range(n))(d3.transpose(yz)),
		yMax= d3.max(yz, function(y) { return d3.max(y); });


	var x_scale= d3.scaleBand()
		.domain(xz)
		.rangeRound([0, width])
		.padding(0.06);

	var x_axis= d3.scaleBand()
		.rangeRound([0, width])
		.padding(0.06);

	if (view=== "view1" || view=== "view3") x_axis.domain(x.map(function(d) { return parseDate1(d); }));
	else x_axis.domain(x.map(function(d) { return parseDate1(d); }))

	var y_scale= d3.scaleLinear()
		.domain([0, yMax])
		.range([height, 0])
		.nice();


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	/* The tooltip, initial display is hidden */
	var tip= d3.select(view_aux)
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var p_horiz= 45;
	var p_vertc= 28;


	var series= canvas.selectAll(".series")
		.data(y01z)
		.enter().append("g");

	if (view=== "view1" || view=== "view3") series.attr("fill", function(d, i) { return color_group(i); });
	else series.attr("fill", function(d, i) { return color_group(i* 9); });

	var rect= series.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
			.attr("x", function(d, i) { return x_scale(i) + x_scale.bandwidth() / n * this.parentNode.__data__.key; })
			.attr("y", height)
			.attr("width", x_scale.bandwidth() / n)
			.attr("height", 0)
			.on("mouseover", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				tip.html(d3.format(".2f")(d[1]- d[0]))
					.style("left", (mousePos[0]- p_horiz) + "px")
					.style("top", (mousePos[1]+ p_vertc) + "px")
					.style("opacity", 1)
					.transition()
						.duration(100);
			})
			.on("mousemove", function(d) {
				var mousePos= d3.mouse(d3.select("body").node());

				tip.html(d3.format(".2f")(d[1]- d[0]))
					.style("left", (mousePos[0]- p_horiz) + "px")
					.style("top", (mousePos[1]+ p_vertc) + "px");
			})
			.on("mouseout", function(d) {
				tip.transition()
					.duration(100)
					.style("opacity", 0);
			});

	rect.transition()
		.delay(function(d, i) { return i * 10; })
		.attr("y", function(d) { return y_scale(d[1] - d[0]); })
		.attr("height", function(d) { return y_scale(0) - y_scale(d[1] - d[0]); });


	if (view=== "view1" || view=== "view3") draw_axis(canvas, x_axis, y_scale, width, height, 0);
	else draw_axis(canvas, x_axis, y_scale, width, height, 1);
};

function draw_axis(canvas, x_scale, y_scale, width, height, grouped) {

	var y_axis_label= "PM10 (μg/m³) / Disease cases";
	var x_axis_label= "Sampling Interval";

	/* Construcao dos eixos coordenados */
	if (grouped== 1) {
		canvas.append("g")
			.attr("class", "axis-x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x_scale)
				.tickFormat(d3.timeFormat("%Y"))
				.tickPadding(6));
	}
	else {
		canvas.append("g")
			.attr("class", "axis-x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x_scale)
				.tickFormat(d3.timeFormat("%b-%Y"))
				.tickPadding(6));
	}

	canvas.append("text")
		.attr("class", "info")
		.attr("x", width/ 2)
		.attr("y", height+ 36)
		.style("text-anchor", "middle")
		.text(x_axis_label);

	canvas.append("g")
		.attr("class", "axis--y")
		.transition()
		.duration(500)
			.call(d3.axisLeft(y_scale)
				.tickFormat(d3.format(".0f")));

	canvas.append("text")
		.attr("class", "info")
		.attr("transform", "rotate(-90)")
		.attr("x", -(height/ 2))
		.attr("y", -50)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text(y_axis_label);
};