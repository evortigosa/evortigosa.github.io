/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function draw_labels() {

	var margin= {top: 1, right: 1, bottom: 10, left: 1};


	for ((i= 1); (i< 5); (i++)) {

		var view_aux= "label" + i;

		var width= document.getElementById(view_aux).clientWidth- margin.left- margin.right;
		var height= document.getElementById(view_aux).clientHeight- margin.top- margin.bottom;

		document.getElementById(view_aux).innerHTML= "";

		view_aux= "#" + view_aux;


		var canvas= d3.select(view_aux)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var label_set= canvas.append("text")
			.attr("class", "info")
			.attr("x", width- 10)
			.attr("y", height- 5)
			.style("text-anchor", "end");
			
		if (i== 1 || i== 3) label_set.text("Year: ");
		else if (i== 2 || i== 4) label_set.text("Disease: ");
	}
};