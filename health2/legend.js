/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function add_legend(view) {

	var width= document.getElementById(view).clientWidth;
	var height= document.getElementById(view).clientHeight;

	var h_shift= 60;
	var vertical_pad= 12;
	var pos_box= 110;
	var pos_text= 20;

	var view_flag= 0;
	var texto;


	document.getElementById(view).innerHTML= "";

	var view_aux= "#" + view;

	var canvas= d3.select(view_aux)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
				.attr("transform", "translate(0,0)");

	var top_label= canvas.append("text")
		.attr("class", "info")
		.attr("x", h_shift)
		.attr("y", vertical_pad+ 3)
		.text("Age Ranges:");


	h_shift= h_shift+ 20;
	texto= ["Under 5 Years","5 to 9 Years","10 to 19 Years","20 to 29 Years","30 to 39 Years","40 to 49 Years","50 to 59 Years","60 Years and Over"];


	for ((i= 0); (i< 8); (i++)) {
		canvas.append("rect")
			.attr("x", ((i+ 1)*pos_box+ i*pos_text+ h_shift))
			.attr("y", vertical_pad- 10)
			.attr("width", 16)
			.attr("height", 16)
			.attr("fill", color_group(i));

		color_label= canvas.append("text")
			.attr("class", "info")
			.attr("x", ((i+ 1)*pos_box+ (i+ 1)*pos_text+ h_shift))
			.attr("y", vertical_pad+ 3)
			.text(texto[i- view_flag]);	
	}
};