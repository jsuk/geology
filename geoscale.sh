#!/bin/bash
(
paste -d, <(head -1 geological_time_chart.csv | cut -d, -f1-$1,7) <(echo duration) ;
paste -d, <(./geochronicles.sh $1) <(./geoduration.sh $1) ) | column -s, -t
