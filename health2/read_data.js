/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.
*/

function read_s2g_data(data_source, year, disease) {

	d3.tsv(data_source, function(error, data) {
		if (error) throw error;

		var pm10= [];		// Subconjunto de pm10
		var pm10_year= [];	// Subconjunto de pm10 restrito a year

		var subset= [];		// Subconjunto de data restrito a year
		var s_aggr= [];		// Subconjunto de data: doenca agregada por ano e faixa etaria 

		var aux_sub_year= [];

		data.forEach(function(d, index) {
			d.date= parseDate1(d.Data);
			d.pm10= +d.PM10;

			pm10.push([d.date, d.pm10]);
			aux_sub_year.push(data[index]);

			if ((d3.timeFormat("%b")(d.date))=== "Dec") {

				var aux= disease_subset_gen(aux_sub_year, disease);
				s_aggr.push(year_disease_aggregator(aux, disease));

				if ((d3.timeFormat("%Y")(d.date))=== year) {
					
					pm10_year= pm10_subset_gen(aux_sub_year);
					subset= aux;
				}

				aux_sub_year= [];
			}
		});

		var pm10_max= d3.max(pm10, function(d) { return d[1]; })

		if (year>= 2014) {
			draw_line_area(pm10_year, "pm10_v1", pm10_max);
			draw_line_area(pm10, "pm10_v2", pm10_max);
			draw_g_bars(subset, "view1");
			draw_s_bars(s_aggr, "view2");
			draw_small_info(aggregated_subset_diseases(data, diseases), disease, "small_up");
		}
		else {
			draw_line_area(pm10_year, "pm10_v3", pm10_max);
			draw_line_area(pm10, "pm10_v4", pm10_max);
			draw_g_bars(subset, "view3");
			draw_s_bars(s_aggr, "view4");
			draw_small_info(aggregated_subset_diseases(data, diseases), disease, "small_dw");
		}
	});
};


function pm10_subset_gen(data) {	// Retorna um subconjunto de data contendo apenas date e pm10

	var subset= [];

	for ((i= 0); (i< data.length); (i++)) {
		subset.push([parseDate1(data[i].Data), +data[i].PM10]);
	}

	return subset;
};

function disease_subset_gen(data, disease) {	// Retorna um subconjunto de data restrito a doenca alvo por faixa etaria

	var subset= [];
	var age_dis_set= [];

	for ((i= 0); (i< age_range.length); (i++)) {	// Gera o conjunto de identificadores (age_range + disease) para as
		var age_disease= (age_range[i]+ disease);		// faixa etarias relativas a doenca alvo

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

		aux_b.push(data[i].Data);

		aux_b= aux_b.concat(aux_a);

		subset.push(aux_b);
	}

	return subset;
};

function year_disease_aggregator(data) {	// Retorna um subconjunto com os numeros da doenca agregados por faixa etaria (data tem q ser pre-processado)

	var data_t= d3.transpose(data);

	var dise_year= [];

	for ((i= 1); (i< data_t.length); (i++)) {		// Gera os valores acumulados por ano
		var aux_sum= 0;

		for ((j= 0); (j< data.length); (j++)) {
			aux_sum += data_t[i][j];
		}

		dise_year.push(aux_sum);
	}

	return [d3.timeFormat("%Y")(parseDate1(data[0][0]))].concat(dise_year);
};

function disease_aggregator(data) {		// Retorna um subconjunto de data com valores totais agregados (data tem q ser pre-processado)

	var subset= [];

	for ((i= 0); (i< data.length); (i++)) {
		var aux_sum= 0;

		for ((j= 0); (j< age_range.length); (j++)) {
			aux_sum += data[i][j+ 1];
		}

		subset.push([parseDate1(data[i][0]), aux_sum]);
	}

	return subset;
};

function aggregated_subset_diseases(data, idx) { // Retorna data com valores totais agregados (data tem q ser pre-processado)

	var subset= [], aux_dis= [];

	for ((id= 0); (id< idx.length); (id++))
		aux_dis.push(disease_aggregator(disease_subset_gen(data, idx[id])));

	for ((k= 0); (k< aux_dis[0].length); (k++)) {
		var aux= [aux_dis[0][k][0]];

		for ((id= 0); (id< idx.length); (id++))
			aux= aux.concat(aux_dis[id][k][1]);

		subset.push(aux);
	}

	return subset;
};