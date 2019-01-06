#!/bin/bash

function w() {
	echo "CI: $@"
}

w
w "Continuous Integration script v1.3.3.7"
w

if ! [ "$1" ] ; then
	w "Usage: $0 <command line>"
	w
	w "Aborted"
	w
	exit 1
fi

export cmdline=$@
export pid=""
export githead=""

w "Command line: $@"
w

function process_start() {
	w "Starting process"
	$cmdline &
	pid=$!
}

function process_stop() {
	w "Stopping process"
	kill $pid
	pid=""
}

function process_running() {
	if [ "$pid" == "" ] ; then
		return 1
	fi
	kill -0 $pid
}

function is_pull_needed() {
	git fetch

	UPSTREAM=${1:-'@{u}'}
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "$UPSTREAM")
	BASE=$(git merge-base @ "$UPSTREAM")
	
	if [ $LOCAL == $REMOTE ]; then
		githead=$REMOTE
	    return 1
	fi
	return 0
}

while true ; do
	if is_pull_needed ; then
		if process_running ; then
			process_stop
		fi
		w "Updating to $githead"
		git pull
	fi
	if ! process_running ; then
		process_start
	fi
	sleep 1
done


#process_start
#sleep 3
#process_stop
