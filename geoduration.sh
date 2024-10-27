#!/bin/bash

#cat geological_time_chart.csv| cut -d, -f1,7 | datamash -t, --narm -H -g 1 max 2 | cut -d, -f2 | tail +2 | cat - <(echo 0) | xargs bash -c 'for ((i = 0; i < $#; i++)); do j=$(expr $i + 1); echo ${!i} - ${!j} ;done'   | bc
#./geochronicles.sh $1 | cut -d, -f2 | cat - <(echo 0) | xargs bash -c 'for ((i = 0; i < $#; i++)); do j=$(expr $i + 1); echo ${!i} - ${!j} ;done'   | bc
./geochronicles.sh $1 | awk -F, '{print $NF}' | cat - <(echo 0) | xargs bash -c 'for ((i = 0; i < $#; i++)); do j=$(expr $i + 1); echo ${!i} - ${!j} ;done'   | bc


#paste -d, <(cat geological_time_chart.csv | cut -d, -f1,7| tail +2| datamash -t, -g 1 max 2) <(./geoduration.sh) | column -s, -t
