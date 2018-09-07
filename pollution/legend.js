/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function add_legend(view, data_down) {

	var width= document.getElementById(view).clientWidth;
	var height= document.getElementById(view).clientHeight;

	var h_shift= 20;
	var vertical_pad= height/2;
	var pos_box= 80;
	var pos_text= 20;

	var view_flag= 0;
	var texto;


	if (view=== "legenda_df") {
		view_flag= 4;
		document.getElementById(view).innerHTML= "";
	}

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
				.attr("transform", "translate(0,0)");

	var top_label= canvas.append("text")
		.attr("class", "label")
		.attr("x", h_shift- 20)
		.attr("y", vertical_pad+ 3);

	if (view_flag== 0) {
		h_shift= h_shift+ 20;

		if (language=== "pt") {
			top_label.text("Período:");
			texto= ["Verão","Outono","Inverno","Primavera"];
		}
		else if (language=== "en") {
			top_label.text("Season:");
			texto= ["Summer","Autumn","Winter","Spring"];
		}
	}
	else {
		h_shift= h_shift -375;

		if (language=== "pt") {
			top_label.text("Variação:");
		}
		else if (language=== "en") {
			top_label.text("Difference:");
		}

		if (data_down=== "14_15") texto= ["2015-2017","2014-2015"];
		else if (data_down=== "97_06") texto= ["2015-2017","1997-2006"];
	}

	for ((i= view_flag); (i< (4+ 0.5*view_flag)); (i++)) {
		canvas.append("rect")
			.attr("x", ((i+ 1)*pos_box+ i*pos_text+ h_shift))
			.attr("y", vertical_pad- 10)
			.attr("width", 16)
			.attr("height", 16)
			.attr("fill", color_group(i));

		color_label= canvas.append("text")
			.attr("class", "label")
			.attr("x", ((i+ 1)*pos_box+ (i+ 1)*pos_text+ h_shift))
			.attr("y", vertical_pad+ 3)
			.text(texto[i- view_flag]);	
	}


	var width= document.getElementById("space1").clientWidth;	// imprime um texto em frente ao combo que troca os dados
	var height= document.getElementById("space1").clientHeight;

	document.getElementById("space1").innerHTML= "";

	var canvas2= d3.select("#space1")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
				.attr("transform", "translate(0,0)");

	var dt_texto= canvas2.append("text")
		.attr("class", "label")
		.attr("x", (width/ 2)+ 25)
		.attr("y", (height/ 2)- 10)
		.style("text-anchor", "middle");

	if (language=== "pt") {
		dt_texto.text("Conjunto:");
	}
	else if (language=== "en") {
		dt_texto.text("Data set:");
	}
};