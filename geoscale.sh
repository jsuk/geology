#!/bin/bash
REGEX="^[1-6]$"
if [[ $1 =~ $REGEX ]]; then N=$1
else N=1
fi
(
paste -d, <(head -1 geological_time_chart.csv | cut -d, -f1-$N,7) <(echo duration) ;
paste -d, <(./geochronicles.sh $N) <(./geoduration.sh $N) ) | column -s, -t
