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


def to_int(x):
	return x.dayofyear	# MUDAR AQUI PRA MAIS ANOS


file_up= pd.read_table(sys.argv[1], usecols=[0,1])	# leitura do primeiro arquivo de dados

aux_d_up= file_up.iloc[0:,0:1].values
dates_up= to_int(pd.to_datetime(aux_d_up[:,0]))

conce_up= file_up.iloc[0:,1:2].values	# valores para a concentracao do MP, conjunto do grafico superior
conce_up= conce_up[:,0]

x_up= np.array(dates_up)
y_up= np.array(conce_up)

ninst= len(x_up)

for i in range(0, ninst):
	if cd.isleap(pd.to_datetime(aux_d_up[i][0]).year): x_up[i]= x_up[i]- 1


file_down= pd.read_table(sys.argv[2], usecols=[0,1])	# leitura do segundo arquivo de dados

aux_d_down= file_down.iloc[0:,0:1].values
dates_down= to_int(pd.to_datetime(aux_d_down[:,0]))

conce_down= file_down.iloc[0:,1:2].values	# valores para a concentracao do MP, conjunto do grafico inferior
conce_down= conce_down[:,0]

x_down= np.array(dates_down)
y_down= np.array(conce_down)

ninst= len(x_down)

for i in range(0, ninst):
	if cd.isleap(pd.to_datetime(aux_d_down[i][0]).year): x_down[i]= x_down[i]- 1


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


if (len(x_up)> len(x_down)):
	dia_1= pd.to_datetime(aux_d_up[0][0])	# le a data e transforma em objeto data
else:
	dia_1= pd.to_datetime(aux_d_down[0][0])


line= "Data\tConcentra_up\tConcentra_down\n"

with open("dif_anoUP_anoDW.tsv", "w") as f_out:
	f_out.write(line)

	for i in range(0, ninst):
		dia= dia_1.strftime("%-m/%-d/%Y")

		valor_A= ("%.2f" % f_up(insts[i]))
		valor_B= ("%.2f" % f_down(insts[i]))

		line= dia + "\t" + str(valor_A) + "\t" + str(valor_B) + "\n"

		dia_1= dia_1 + timedelta(days=1)

		f_out.write(line)