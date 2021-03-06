/*
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2017. All rights reserved.
*/

function load_my_face() {

	var size= document.getElementById("photo").clientWidth;

	var width= size;
	var height= 150;

	var canvas= d3.select("#photo")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var g= canvas.append("g")
		.attr("transform", "translate(0,0)");

	var img= g.append("svg:image")
		.attr("xlink:href", path_i + "eu.jpg")
		.attr("width", 320)
		.attr("height", 320)
		.attr("x", 1)
		.attr("y", -85);
};

function load_logo() {

	var size= document.getElementById("logo").clientWidth;

	var width= size;
	var height= 150;

	var canvas= d3.select("#logo")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var g= canvas.append("g")
		.attr("transform", "translate(0,0)");

	var img= g.append("svg:image")
		.attr("xlink:href", path_i + "logo.JPG")
		.attr("width", 320)
		.attr("height", 320)
		.attr("x", 1)
		.attr("y", -85)
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://www.icmc.usp.br/Portal/"); });
};

function load_my_id() {

	var size= document.getElementById("my_id").clientWidth;

	var width= size;		// Dimensoes internas do gafico
	var height= 150;

	var canvas= d3.select("#my_id")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");

	var tip= d3.select("#my_id")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var nome= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 30)
		.attr("text-anchor", "middle")
		.attr("font-size", "40px")
		.attr("font-weight", "bold")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://lattes.cnpq.br/5545082740387699"); })
		.on("mouseover", function(d) {
			tip.transition()
				.duration(200)
				.style("opacity", 1);

			tip.html("Lattes")
				.style("left", (d3.event.pageX- 30) + "px")
				.style("top", (d3.event.pageY+ 8) + "px");
		})
		.on("mouseout", function(d) {
			tip.transition()
				.duration(500)
				.style("opacity", 0);
		})
		.text("Evandro S. Ortigossa");

	var u_grad= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 65)
		.attr("class", "label-center-up")
		.text("Ciências de Computação (B.Sc.) - ICMC-USP");

	var grad= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 88)
		.attr("class", "label-center-up")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://www.icmc.usp.br/Portal/conteudo/243/13/ciencias-de-computacao-e-matematica-computacional"); })
		.on("mouseover", function(d) {
			tip.transition()
				.duration(200)
				.style("opacity", 1);

			tip.html("ICMC-USP PÓS")
				.style("left", (d3.event.pageX- 30) + "px")
				.style("top", (d3.event.pageY+ 8) + "px");
		})
		.on("mouseout", function(d) {
			tip.transition()
				.duration(500)
				.style("opacity", 0);
		})
		.text("Aluno de M.Sc. em Ciências de Computação e Matemática Computacional - ICMC-USP");

	var area= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 122)
		.attr("class", "label-center-up")
		.text("Atuação: Processamento de Imagens Digitais e Visualização de Dados");

	var orientador= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 145)
		.attr("class", "label-center-up")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://lattes.cnpq.br/3794241680729178"); })
		.on("mouseover", function(d) {
			tip.transition()
				.duration(200)
				.style("opacity", 1);

			tip.html("Lattes")
				.style("left", (d3.event.pageX- 30) + "px")
				.style("top", (d3.event.pageY+ 8) + "px");
		})
		.on("mouseout", function(d) {
			tip.transition()
				.duration(500)
				.style("opacity", 0);
		})
		.text("Orientação: Prof. Dr. Luis Gustavo Nonato");
};

function load_research() {

	var size= document.getElementById("middle").clientWidth;

	var width= size;		// Dimensoes internas do gafico
	var height= 800;

	var x_pos1= 70;
	var x_pos2= size/ 2;

	var canvas= d3.select("#middle")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");


	/* y Colunas da esquerda */
	var titulo_y= 35;
	var lacuna_y= 110;
	var justificativa_y= 220;
	var material_y= 385;
	var avaliacao_y= 585;
	var interface_y= 715;
	var conclusao_y= 760;

	/* y Colunas da direita */
	var tema_y= 60;
	var obj_y= 150;
	var resumo_y= 335;
	var cnpq_y= 635;


	/* TITULO DA PESQUISA */
	var titulo= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", titulo_y)
		.attr("class", "label-bold")
		.text("Título da Pesquisa");

	var titulo1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", titulo_y+ 20)
		.attr("class", "label-text")
		.text("Visualização de Dados Multidimensionais Agregados Hierarquicamente e Variáveis no Tempo.");
	
	/* TEMA */
	var tema= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", tema_y)
		.attr("class", "label-bold")
		.text("Tema");

	var tema1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", tema_y+ 20)
		.attr("class", "label-text")
		.text("Estudo e desenvolvimento de metodologias compreensivas de visualização sobre grandes bases de dados");

	var tema2= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", tema_y+ 20 + 18)
		.attr("class", "label-text")
		.text("multidimensionais agregados hierarquicamente e variáveis no tempo.");

	/* LACUNA/PROBLEMA */
	var lacuna= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", lacuna_y)
		.attr("class", "label-bold")
		.text("Lacuna/problema");

	var lacuna1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", lacuna_y+ 20)
		.attr("class", "label-text")
		.text("Em muitos cenários, dados temporais carregam uma estrutura agregada hierarquicamente. Um ");

	var lacuna2= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", lacuna_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text("problema neste contexto é que os níveis inferiores da hierarquia podem conter centenas de");

	var lacuna3= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", lacuna_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("milhares, ou mesmo milhões de instâncias temporais, sendo sua análise uma tarefa exaustiva.");

	/* HIPOTESES E OBJETIVOS */
	var objetivos= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y)
		.attr("class", "label-bold")
		.text("Hipóteses e Objetivos");

	var objetivos1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20)
		.attr("class", "label-text")
		.text("Visualização de dados é a representação de informações no formato gráfico, simplificando sua interpretação");

	var objetivos2= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text("e ajudando a encontrar padrões. Sendo assim, este trabalho tem por objetivo desenvolver e validar uma");

	var objetivos3= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("metodologia de visualização para analisar de séries temporais multidimensionais hierarquicamente agregadas, ");

	var objetivos4= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 3* 18)
		.attr("class", "label-text")
		.text("revelando tendências e discrepâncias dos dados. Para isto, serão aplicadas métricas nos dados, detectando ");

	var objetivos5= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 4* 18)
		.attr("class", "label-text")
		.text("dados, detectando padrões ao longo do tempo, em cada intervalo definido. A partir destes resultados, os ");

	var objetivos6= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 5* 18)
		.attr("class", "label-text")
		.text("dados serão exibidos graficamente, evidenciando os padrões de interesse encontrados, de forma a facilitar ");

	var objetivos7= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", obj_y+ 20+ 6* 18)
		.attr("class", "label-text")
		.text("sua exploração, mantendo seu contexto hierárquico.");

	/* JUSTIFICATIVA/MOTIVACAO */
	var justificativa= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y)
		.attr("class", "label-bold")
		.text("Justificativa/motivação");

	var justificativa1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20)
		.attr("class", "label-text")
		.text("Dados variáveis no tempo agregados hierarquicamente apresentam uma estrutura, na qual cada");

	var justificativa2= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text("ramo da hierarquia representa uma série temporal contendo a informação temporal agregada dos");

	var justificativa3= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("seus níveis inferiores. Por exemplo: o consumo de energia em um país é dado, num certo momento, ");

	var justificativa4= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20+ 3* 18)
		.attr("class", "label-text")
		.text("pela soma da energia consumida em seus estados que, por sua vez, compreende a soma da energia");

	var justificativa5= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20+ 4* 18)
		.attr("class", "label-text")
		.text("gasta em cada cidade e assim por diante. Até o momento, poucas ferramentas foram desenvoldas");

	var justificativa6= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", justificativa_y+ 20+ 5* 18)
		.attr("class", "label-text")
		.text("especificamente para trabalhar com este tipo de dados e, este trabalho visa preencher esta lacuna.");

	/* RESUMO ESTRUTURADO */
	var resumo= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y)
		.attr("class", "label-bold")
		.text("Resumo");

	var resumo1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20)
		.attr("class", "label-text")
		.text("Em muitos cenários, dados temporais carregam uma estrutura agregada e hierárquica intrínseca. Por exemplo, ");

	var resumo2= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text("em muitos países, a quantidade diária de recursos que são gastos pelo governo federal é a soma das despesas");

	var resumo3= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("de seus ministérios nos dias correspondentes, que por sua vez, compreende as despesas das suas respectivas ");

	var resumo4= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 3* 18)
		.attr("class", "label-text")
		.text("secretarias subordinadas, e assim por diante. Quando analisando este tipo de dado temporal estruturado");

	var resumo5= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 4* 18)
		.attr("class", "label-text")
		.text(" hierarquicamente, o analista usualmente começa procurando por padrões e discrepâncias nos níveis superiores ");

	var resumo6= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 5* 18)
		.attr("class", "label-text")
		.text("da hierarquia, descendo até os níveis inferiores para encontrar a origem do comportamento observado. Uma ");

	var resumo7= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 6* 18)
		.attr("class", "label-text")
		.text("questão principal neste contexto é que os níveis inferiores podem conter milhares de instâncias de séries ");

	var resumo8= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 7* 18)
		.attr("class", "label-text")
		.text("temporais, fazendo da análise uma tarefa massante. Este trabalho apresenta uma metodologia de visualização ");

	var resumo9= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 8* 18)
		.attr("class", "label-text")
		.text("para guiar a análise das séries temporais agregadas. O método utiliza o Earth Mover's Distance (EMD) para");

	var resumo10= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 9* 18)
		.attr("class", "label-text")
		.text("detectar discrepâncias e padrões nas séries temporais nos níveis inferiores da hierarquia. As informações a");

	var resumo11= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 10* 18)
		.attr("class", "label-text")
		.text("cerca das discrepâncias e padrões são propagadas aos patamares superiores em que as séries temporais ");

	var resumo12= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", resumo_y+ 20+ 11* 18)
		.attr("class", "label-text")
		.text("são representadas, permitindo ao usuário visualizar e rastrear a origem do fenômeno observado.");

	/* MATERIAIS E METODOS */
	var material= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y)
		.attr("class", "label-bold")
		.text("Materiais e Métodos");

	var material1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20)
		.attr("class", "label-text")
		.text("O Earth Mover's Distance está no core da análise das séries temporais hierárquicas, gerando");

	var material2= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text(" resultados que serão utilizados para clusterização, classificação, identificação de padrões e");

	var material3= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("discrepâncias. Para guiar o usuário na exploração dos dados, será desenvolvida um protótio de");

	var material4= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 3* 18)
		.attr("class", "label-text")
		.text(" interface baseado em web, utilizando principalmente JavaScript, CSS, HTML5 e a biblioteca de");

	var material5= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 4* 18)
		.attr("class", "label-text")
		.text("desenvolvimento gráfico D3.js. Os dados utilizados neste trabalho serão os dos gastos diretos do");

	var material6= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 5* 18)
		.attr("class", "label-text")
		.text("governo federal do Brasil (www.portaldatransparencia.gov.br), contendo pagamentos realizados");

	var material7= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 6* 18)
		.attr("class", "label-text")
		.text("por todas as agências do governo federal de janeiro de 2011 até outubro de 2015, com mais de");

	var material8= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", material_y+ 20+ 7* 18)
		.attr("class", "label-text")
		.text("60 milhões de transações registradas.");

	/* METODOLOGIA DE AVALIACAO */
	var avaliacao= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", avaliacao_y)
		.attr("class", "label-bold")
		.text("Metodologia de Avaliação");

	var avaliacao1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", avaliacao_y+ 20)
		.attr("class", "label-text")
		.text("A eficácia da metodologia proposta, em revelar fenômenos de interesse e suas origens em largas");

	var avaliacao2= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", avaliacao_y+ 20+ 1* 18)
		.attr("class", "label-text")
		.text("bases de dados temporais hierárquicas, será mostrada através de um conjunto de experimentos e");

	var avaliacao3= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", avaliacao_y+ 20+ 2* 18)
		.attr("class", "label-text")
		.text("também medidas qualitativas propostas na literatura.");

	/* LINK */
	var interface= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", interface_y)
		.attr("class", "label-bold")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://daedalus.zapto.org:5080/~evortigosa/frontend/"); })
		.text("Clique aqui para acessar o protótipo em desenvolvimento.");

	var conclusao= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", conclusao_y)
		.attr("class", "label-bold")
		.text("O período de conclusão é estimado para março de 2018.");

	/* LOGO CNPQ */
	var cnpq= canvas.append("text")
		.attr("x", x_pos2+ 10)
		.attr("y", cnpq_y)
		.attr("class", "label-bold")
		.text("Esta pesquisa é financiada pelo:");

	var g= canvas.append("g")
		.attr("transform", "translate(0,0)");

	var img= g.append("svg:image")
		.attr("xlink:href", path_i + "CNPq.png")
		.attr("width", 270)
		.attr("height", 270)
		.attr("x", x_pos2+ 10)
		.attr("y", cnpq_y- 65)
		.attr("cursor", "pointer")
		.on("click", function() { window.open("http://cnpq.br/"); });
};

function load_publications() {

	var size= document.getElementById("publi").clientWidth;

	var width= size;		// Dimensoes internas do gafico
	var height= 130;

	var canvas= d3.select("#publi")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");

	var pos_x= 40;
	var pos_y= 50;

	var public= canvas.append("text")
		.attr("x", pos_x)
		.attr("y", pos_y)
		.attr("class", "label-text")
		.text("Publicações:");

	var scholar= canvas.append("text")
		.attr("x", pos_x)
		.attr("y", pos_y+ 30)
		.attr("class", "label-text")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://scholar.google.com.br/citations?user=ICFHzKcAAAAJ&hl=pt-BR&oi=ao"); })
		.text("Google Scholar");

	var rg= canvas.append("text")
		.attr("x", pos_x)
		.attr("y", pos_y+ 55)
		.attr("class", "label-text")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://www.researchgate.net/profile/Evandro_Ortigossa"); })
		.text("ResearchGate");
};

function load_b_info() {

	var size= document.getElementById("b_info").clientWidth;

	var width= size;		// Dimensoes internas do gafico
	var height= 130;

	var canvas= d3.select("#b_info")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");

	var contato= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 32)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Informações para contato:");

	var endereco_y= 60;

	var endereco= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", endereco_y)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Universidade de São Paulo, Instituto de Ciências Matemáticas e de Computação");

	var endereco2= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", endereco_y+ 20)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Av. Trabalhador São-carlense, 400, 13560-970, São Carlos-SP, Brasil");

	var email= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 110)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("email: evortigosa@usp.br");

	var site= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 130)
		.attr("text-anchor", "middle")
		.attr("font-size", "12px")
		.text("Este site é melhor visualizado em 1920 x 1080.");
};

function load_vgpg() {

	var size= document.getElementById("grupo").clientWidth;

	var width= size;
	var height= 130;

	var canvas= d3.select("#grupo")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var g= canvas.append("g")
		.attr("transform", "translate(0,0)");

	var img= g.append("svg:image")
		.attr("xlink:href", path_i + "vgpg.jpg")
		.attr("width", 200)
		.attr("height", 200)
		.attr("x", 75)
		.attr("y", -25);
};