#!/bin/bash
#set -ex
if [ $# -eq 0 ]
then
	COL=1
else
	COL=$1
fi

SEQ=$(seq $COL | paste -sd,)
LAST=`expr $COL + 1`
#echo $SEQ
#echo $LAST
#echo $COL $1 $#
#cat geological_time_chart.csv | cut -d, -f1,7| tail +2| datamash -t, -g 1 max 2
cat geological_time_chart.csv | cut -d, -f$SEQ,7| datamash --header-in -t, -g $SEQ max $LAST
