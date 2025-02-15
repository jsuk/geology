#!/usr/bin/env bash
if [ -z $1 ];
then
scale=1
else
scale=$1
fi

duration=$(expr $scale + 2)
./geoscale.sh $scale | cut -d, -f$scale,$duration | tail -n+2 | tail -n12 | gnuplot -e 'set ylabel "Ma";set yrange [0:81];set datafile sep ","; set term dumb 110,40;plot "<cat -" u 0:($2):xtic(1) w boxes title "Duration"'
