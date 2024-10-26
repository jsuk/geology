#!/bin/bash

paste -d, <(./geochronicles.sh $1) <(./geoduration.sh $1) | column -s, -t
