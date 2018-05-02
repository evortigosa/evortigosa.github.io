/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function read_s2g_data(data_source, year, disease) {

	var year_first, year_last;

	if (year< 2014) {
		year_first= 1998;
		year_last= 2006;
	}
	else {
		year_first= 2014;
		year_last= 2017;
	}

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		var dis_year= [];
		var dis_aggr= [];

		for ((ano= year_first); (ano<= year_last); (ano++)) {

			var subset= year_subset_gen(data, ano);	// Subconjunto de data restrito a year

			var disease_subset= disease_subset_gen(subset, disease);	// Subconjunto com pm10 e a doenca alvo por faixa etaria

			if (year== ano) {
				dis_year= disease_subset;
			}

			dis_aggr.push(year_data_aggregator(disease_subset));	// Valores de pm10 e doenca alvo acumulados por ano
		}

		if (year< 2014) {
			draw_g_bars(d3.transpose(dis_year), "view1");
			draw_g_bars(d3.transpose(dis_aggr), "view2");
		}
		else {
			draw_g_bars(d3.transpose(dis_year), "view3");
			draw_g_bars(d3.transpose(dis_aggr), "view4");
		}
	});
};

function year_subset_gen(data, year) {	// Gera e retorna um subconjunto de data restrito ao ano alvo

	var subset= [];

	var inicio= new Date(year, 0, 1),
		final= new Date(year, 11, 31);

	data.forEach(function(d, index) {
		d.date= parseDate1(d.Data);

		var aux= new Date(d.date);

		if ((aux.getTime()>= inicio.getTime()) && (aux.getTime()<= final.getTime())) {
			subset.push(data[index]);
		}
	});

	return subset;
};

function disease_subset_gen(data, disease) {	// Gera e retorna um subconjunto de data restrito a doenca alvo por faixa etaria

	var subset= [];
	var age_dis_set= [];

	for ((i= 0); (i< age_range.length); (i++)) {	// Gera o conjunto de identificadores (age_range + disease) para as
		var age_disease= age_range[i]+ disease;		// faixa etarias relativas a doenca alvo

		age_dis_set.push(age_disease);
	}

	for ((i= 0); (i< data.length); (i++)) {
		var aux_a= [];
		var aux_b= [];

		for ((j= 0); (j< age_dis_set.length); (j++)) {		

			if (data[i][age_dis_set[j]]=== undefined)	// Caso a doenca nao tenha sido registrada, recebe valor zero
				aux_a.push(0);
			else 
				aux_a.push(+data[i][age_dis_set[j]]);
		}

		aux_b.push(data[i].Data, +data[i].PM10);

		aux_b= aux_b.concat(aux_a);

		subset.push(aux_b);
	}

	return subset;
};

function year_data_aggregator(data) {	// Gera um subconjunto com os numeros da doenca e pm10 agregados por ano

	var pm10_year= 0;
	var dise_year= 0;

	for ((i= 0); (i< data.length); (i++)) {		// Gera os valores acumulados por ano
		pm10_year += data[i][1];

		for ((j= 0); (j< age_range.length); (j++)) {
			dise_year += data[i][2+ j];
		}
	}

	return [d3.timeFormat("%Y")(parseDate1(data[0][0])), pm10_year, dise_year];
};