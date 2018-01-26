"""
	Evandro Scudeleti Ortigossa

	M.Sc. Student in Computer Science
	Institute of Mathematical and Computer Sciences - ICMC
	University of São Paulo - USP
	São Carlos, São Paulo, Brazil.
	
	2018. All rights reserved.

	Run with "python3 interpolator.py data_1.tsv data_2.tsv"
"""

import sys
import numpy as np
import pandas as pd
import calendar as cd

from datetime import timedelta
from scipy.interpolate import interp1d

# observacao: os intervalos compreendidos pelos arquivos processados devem ter mesma amplitude, seja em meses ou anos
def is_29_fev(x):
	if x.day== 29 and x.month== 2:
		return True
	else:
		return False

def processa_dados(x, y):	# processamento dos vetores originados nos dados
	ninst= len(x)

	x_new= np.array([])
	y_new= np.array([])

	for i in range(0, ninst):
		mod= x[i].year% x[0].year	# operacao para saber se houve mudanca de ano durante o processamento
		
		ajuste_dia= (365* mod)+ np.int64(x[i].dayofyear)	# ajuste para garantir continuidade da interpolacao em mais de um ano

		if cd.isleap(x[i].year):
			if x[i].month>= 3:
				x_new= np.append(x_new, (ajuste_dia- 1))		# ajuste para desconsiderar o dia 29 de fev em anos bissextos
				y_new= np.append(y_new, np.float64(y[i]))
			elif not is_29_fev(x[i]):
				x_new= np.append(x_new, ajuste_dia)
				y_new= np.append(y_new, np.float64(y[i]))
		else:
			x_new= np.append(x_new, ajuste_dia)
			y_new= np.append(y_new, np.float64(y[i]))

	return x_new, y_new


# leitura do primeiro arquivo de dados
file_up= pd.read_table(sys.argv[1], usecols=[0,1])

dates_up= file_up.iloc[0:,0:1].values
dates_up= pd.to_datetime(dates_up[:,0])

conce_up= file_up.iloc[0:,1:2].values	# valores para a concentracao do MP, conjunto do grafico superior
conce_up= conce_up[:,0]

x_up, y_up= processa_dados(dates_up, conce_up)

# leitura do segundo arquivo de dados
file_down= pd.read_table(sys.argv[2], usecols=[0,1])

dates_down= file_down.iloc[0:,0:1].values
dates_down= pd.to_datetime(dates_down[:,0])

conce_down= file_down.iloc[0:,1:2].values	# valores para a concentracao do MP, conjunto do grafico inferior
conce_down= conce_down[:,0]

x_down, y_down= processa_dados(dates_down, conce_down)


f_up= interp1d(x_up, y_up, kind="cubic")	# (x,y,"cubic spline interpolation")
f_down= interp1d(x_down, y_down, kind="cubic")


"""	# plot para comparacao entre interpolacao linear e cubica
f_linear= interp1d(x_up, x_up)

xnew = np.linspace(121, 151, num=10000, endpoint=True)

import matplotlib.pyplot as plt
plt.plot(xnew, f_linear(xnew), "--", xnew, f_up(xnew), "-")
plt.legend(["linear", "cubic"], loc="best")
plt.show()
"""

insts= np.unique(np.append(x_up, x_down))
ninst= len(insts)

#dia_1= dates_up[0]		# le a data e transforma em objeto data
dia_1= dates_down[0]	# deve-se escolher por qual base de dados se quer registrar


line= "Data\tConcentra_up\tConcentra_down\n"

with open("dif_anoUP_anoDW.tsv", "w") as f_out:
	f_out.write(line)

	for i in range(0, (ninst- 1)):
		dia= dia_1.strftime("%-m/%-d/%Y")

		valor_A= f_up(insts[i])
		valor_B= f_down(insts[i])

		if valor_A< 0: valor_A= 0
		if valor_B< 0: valor_B= 0

		line= dia + "\t" + str("%.2f" % valor_A) + "\t" + str("%.2f" % valor_B) + "\n"

		dia_1= dia_1 + timedelta(days=(insts[i+ 1]- insts[i]))

		f_out.write(line)