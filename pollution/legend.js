/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function add_legend(view) {
	var size= document.getElementById(view).clientWidth;

	var h_shift= size- 520;
	var vertical_pad= 10;
	var pos_box= 80;
	var pos_text= 20;

	var texto= ["Verão","Outono","Inverno","Primavera"];
	var cor_estacoes= [3,1,0,2];

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
			.append("svg")
			.attr("width", size)
			.attr("height", 30)
			.append("g")
				.attr("transform", "translate(0,0)");

	var top_label= canvas.append("text")
		.attr("class", "label")
		.attr("x", h_shift- 20)
		.attr("y", vertical_pad+ 3)
		.text("Período:");


	for ((i= 0); (i< 4); (i++)) {

		canvas.append("rect")
			.attr("x", ((i+ 1)*pos_box+ i*pos_text+ h_shift))
			.attr("y", vertical_pad- 10)
			.attr("width", 16)
			.attr("height", 16)
			.attr("fill", color_group(cor_estacoes[i]));

		canvas.append("text")
			.attr("class", "label")
			.attr("x", ((i+ 1)*pos_box+ (i+ 1)*pos_text+ h_shift))
			.attr("y", vertical_pad+ 3)
			.text(texto[i]);
	}
};