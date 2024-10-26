#!/bin/bash
if [ $# -eq 0 ]
then
	COL=1
else
	COL=$1
fi

#echo $COL $1 $#
#cat geological_time_chart.csv | cut -d, -f1,7| tail +2| datamash -t, -g 1 max 2
cat geological_time_chart.csv | cut -d, -f$COL,7| datamash --header-in -t, -g 1 max 2
