/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function read_s2g_data(data_source, year, disease) {
	
	var data1= d3.range(8).map(function() { return bumps(12); });
	var data2= d3.range(2).map(function() { return bumps(10); });

	// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
	// Inspired by Lee Byron’s test data generator.
	function bumps(m) {
		var values= [], i, j, w, x, y, z;

		// Initialize with uniform random values in [0.1, 0.2).
		for (i= 0; i< m; ++i) {
			values[i]= 0.1 + 0.1 * Math.random();
		}

		// Add five random bumps.
		for (j= 0; j< 5; ++j) {
			x= 1 / (0.1 + Math.random());
			y= 2 * Math.random() - 0.5;
			z= 10 / (0.1 + Math.random());
			
			for (i= 0; i< m; i++) {
				w= (i / m - y) * z;
				values[i] += x * Math.exp(-w * w);
			}
		}

		// Ensure all values are positive.
		for (i= 0; i< m; ++i) {
			values[i]= Math.max(0, values[i]);
		}

		return values;
	};

	var subset= [];

	var inicio= new Date(year, 0, 1),
		final= new Date(year, 11, 31);

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		data.forEach(function(d, index) {
			d.date= parseDate(d.Data);

			var aux= new Date(d.date);

			if ((aux.getTime()>= inicio.getTime()) && (aux.getTime()<= final.getTime())) {
				subset.push(data[index]);
			}
		});

		for ((i= 0); (i< age_range.length); (i++)) {
			var age_disease= age_range[i]+ disease;

			console.log(age_disease);
		}

		draw_s2g_bars(data1, "view1");
		draw_g_bars(data2, "view2");

	});
};