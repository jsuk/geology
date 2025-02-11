#!/usr/bin/env bash
duration=$(expr $1 + 2)
./geoscale.sh $1 | cut -d, -f$1,$duration | tail -n+2 | tail -n7 | gnuplot -e 'set ylabel "Ma";set yrange [0:24];set datafile sep ","; set term dumb 110,30;plot "<cat -" u 0:2:xtic(1) w boxes title "Duation"'
