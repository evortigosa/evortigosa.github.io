/*
	Evandro Scudeleti Ortigossa

	Ph.D. Candidate in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2022. All rights reserved.
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
		.attr("y", -85)
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://www.linkedin.com/in/evandro-ortigossa-58062221/?locale=en_US"); });
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
		.text("Computer Scientist (MSc, BSc) - ICMC-USP");

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
		.text("Ph.D. Candidate in Computer Science and Computational Mathematics - ICMC-USP");

	var area= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 122)
		.attr("class", "label-center-up")
		.text("Research area: Explainable Artificial Intelligence (XAI)");

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
		.text("Advisor: Prof. Dr. Luis Gustavo Nonato");
};

function load_research() {

	var size= document.getElementById("middle").clientWidth;

	var width= size;		// Dimensoes internas do gafico
	var height= 840;

	var x_pos1= 45;
	var x_pos2= x_pos1 + size/ 2;

	var canvas= d3.select("#middle")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(0,0)");


	/* y Colunas da esquerda */
	var bio_y= 35;
	var skills_y= 250;
	var title_y= 370;
	var motivation_y= 450;
	var hypothesis_y= 690;

	/* y Colunas da direita */
	var objectives_y= 35;
	var abstract_y= 210;
	var cnpq_y= 600;
	var linkedin_y= 601;
	var awards_y= 770;

	/* Espaçamento entre linhas */
	var dy= 20


	/* BIOGRAFIA */
	var titulo= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", bio_y)
		.attr("class", "label-bold")
		.text("Short Bio");

	var titulo1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", bio_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", 0)
			.text("Bachelor in Computer Science (2015) from the Institute of Mathematics and Computer Science at the University ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("of São Paulo, São Carlos, Brazil (ICMC-USP). I also hold a Master's degree (2018) from the Program in ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("Computer Science and Computational Mathematics at ICMC-USP, where I acquired experience in analyzing and ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("visualizing multidimensional time series. Currently, I am a Ph.D. candidate in Computer Science and Computational ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("Mathematics at ICMC-USP, where I am a member of the Visual and Geometry Processing Group (VGPG), researching ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("explainable artificial intelligence (XAI) and information visualization (InfoVis). I also have experience in data science, ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("machine learning, digital image processing, unstructured data mining; and C, C++, Java, JavaScript, D3.js, and")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("Python programming.");


	/* SKILLS */
	var skills= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", skills_y)
		.attr("class", "label-bold")
		.text("Skills and Expertise");

	var skills1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", skills_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", 0)
			.text("Explainable Artificial Intelligence (XAI), Machine Learning, Data Science, Artificial Intelligence (AI), Python, ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("Information Visualization, Data Mining, Time Series Analysis, D3.js, JavaScript, C++, Algorithms, Programming, ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("Computer Science, Digital Image Processing, Interpretability, Human-Computer Interaction.");


	/* RESEARCH THEME */
	var title= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", title_y)
		.attr("class", "label-bold")
		.text("Ph.D. Research Title");

	var title1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", title_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", 0)
			.text("Feature importance using ranking: a new approach for explainability");


	/* MOTIVATION */
	var motivation= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", motivation_y)
		.attr("class", "label-bold")
		.text("Motivation");

	var motivation1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", motivation_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", 0)
			.text("Machine learning algorithms do not analyze data the same way humans do. Learning models use complex ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("mathematical mechanisms to find patterns that a human analyst may not know or not entirely understand. Thus, the")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("right to explanation arises, i.e., the need to make the learning models applied in decisions that can significantly affect ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("their users' lives more transparent and interpretable, providing reasonable explanations about the logical processes ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("behind models' results and predictions. Modern learning systems have high discriminating power (at the cost of high ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("complexity and consequent low interpretability; this high precision does not guarantee that the decisions produced by ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("such models are, in fact, fair and not permeated by some spurious bias. The lack of explanatory power increases ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("trustworthiness issues and transforms learning algorithms into unreliable decision support systems, making it ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("challenging to implement learning-based systems in critical real-world domains.");


	/* HYPOTHESIS */
	var hypothesis= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", hypothesis_y)
		.attr("class", "label-bold")
		.text("Hypothesis");

	var hypothesis1= canvas.append("text")
		.attr("x", x_pos1)
		.attr("y", hypothesis_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", 0)
			.text("The empirical success of Machine Learning derives from its computationally efficient algorithms and its high-")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("parametric space, with hundreds or even thousands of parameters. If the reasoning involved in the decision")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("processes of an intelligent system could be explained by humans, then it would be possible to extract knowledge ")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("about the working methods of these algorithms, making them more transparent, verifiable, and applicable.")
		.append("tspan")
			.attr("x", x_pos1)
			.attr("dy", dy)
			.text("")


	/* OBJECTIVES */
	var objectives= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", objectives_y)
		.attr("class", "label-bold")
		.text("Research Objectives");

	var objectives1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", objectives_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", 0)
			.text("Promote advances in the sense of elucidating Machine Learning models' predictions in such a way that it is ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("possible to understand why those decisions were reached. XAI explanations can make interpretable the black ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("box problems from a global to a local view, demystifying the logic behind outputs or learning models' internal ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("mechanisms. Therefore, an XAI approach should be designed to verify different aspects of non-linear learning ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("functions, decomposing the opaque elements to generate information in a human interpretable way, aiming to ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("make decisions or learning processes more transparent and verifiable.");


	/* ABSTRACT */
	var abstract= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", abstract_y)
		.attr("class", "label-bold")
		.text("Research Abstract");

	var abstract1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", abstract_y+ 25	)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", 0)
			.text("In recent years, intelligent systems based on Machine Learning have achieved excellent performance rates in a ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("wide range of tasks from many domains. However, when applied in areas that may cause an impact on the life and ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("welfare of its users, the learning-based models raise some issues. The complex nature of these methods' decision ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("mechanisms makes them true black boxes, from which it is impossible to understand the internal logic of the ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("decision-making process. Understanding the reasons why a model makes a prediction is quite essential, in some ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("contexts even more than the accuracy, revealing the need for a tradeoff between interpretability and model accuracy. ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("Although it is not possible to naturally interpret complex models, it is possible to explain them. Providing explanations ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("to computer-aided systems decisions can be seen as a way to justify their reliability, besides providing an effective ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("tool for checking and correcting errors previously hidden within learning models, opening up a large avenue  of ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("possibilities for responsible applications. In this scenario, my work aims to contribute to Machine Learning and ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("EXplainable Artificial Intelligence (XAI) research by deeply discussing the theoretical foundations of algorithmic ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("explainability, supporting data scientists to identify XAI's objectives, challenges, and future opportunities. In addition, ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("my Ph.D. research proposes a new XAI methodology to open the learning-based black boxes. The framework ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("under development seeks to generate explanations regardless of model, identifying and measuring feature ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("importance, both locally and globally. Finally, preliminary results show that the proposed approach is promising ")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("compared to state-of-the-art explainability techniques.");


	/* LOGO CAPES */
	var cnpq= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", cnpq_y)
		.attr("class", "label-bold")
		.text("This study is partially financed by:");

	var g= canvas.append("g")
		.attr("transform", "translate(0,0)");

	var img= g.append("svg:image")
		.attr("xlink:href", path_i + "CAPES.png")
		.attr("width", 110)
		.attr("height", 110)
		.attr("x", x_pos2+ 10)
		.attr("y", cnpq_y+ 5)
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://www.gov.br/capes/pt-br"); });


	/* LINKEDIN */
	var linkedin= canvas.append("text")
		.attr("x", x_pos2+ 560)
		.attr("y", linkedin_y)
		.attr("class", "label-bold")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://www.linkedin.com/in/evandro-ortigossa-58062221/?locale=en_US"); })
		.text("Access my LinkedIn account");


	/* AWARDS */
	var awards= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", awards_y)
		.attr("class", "label-bold")
		.text("Prizes and Honors:");

	var awards1= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", awards_y+25)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", 0)
			.text("Best Paper Award for the paper ''")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dx", 233)
			.attr("dy", 0)
			.attr("cursor", "pointer")
			.on("click", function() { window.open("http://dx.doi.org/10.13140/RG.2.1.4331.4408"); })
			.style("font-style", "italic")
			.text("Using Digital Image Processing to Estimate the Depth of Urban Streams");

	var awards2= canvas.append("text")
		.attr("x", x_pos2)
		.attr("y", awards_y+25)
		.attr("class", "label-text")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dx", 744)
			.attr("dy", 0)
			.text("'', XXVIII")
		.append("tspan")
			.attr("x", x_pos2)
			.attr("dy", dy)
			.text("Conference on Graphics, Patterns and Images - SIBGRAPI, August 2015.");

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
	var pos_y= 35;

	var public= canvas.append("text")
		.attr("x", pos_x)
		.attr("y", pos_y)
		.attr("class", "label-text")
		.text("Publications:");

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

	var rg= canvas.append("text")
		.attr("x", pos_x)
		.attr("y", pos_y+ 80)
		.attr("class", "label-text")
		.attr("cursor", "pointer")
		.on("click", function() { window.open("https://orcid.org/my-orcid?orcid=0000-0003-1459-9643"); })
		.text("ORCID");
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
		.attr("y", 28)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Professional address:");

	var endereco_y= 55;

	var endereco= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", endereco_y)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Institute of Mathematics and Computer Science, University of São Paulo (ICMC-USP)");

	var endereco2= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", endereco_y+ 20)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("Trabalhador São-carlense Avenue, 400, São Carlos, 13566-590, Brazil");

	var email= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 102)
		.attr("text-anchor", "middle")
		.attr("class", "label-text")
		.text("e-mail: evortigosa@usp.br");

	var site= canvas.append("text")
		.attr("x", size/ 2)
		.attr("y", 125)
		.attr("text-anchor", "middle")
		.attr("font-size", "12px")
		.text("This page is better visualized using 1920 x 1080.");
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