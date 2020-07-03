#!/bin/bash

find_code_files () {
    find . -regex '^./src/[^index][a-z0-9\-]*\.js'
}

find_test_files () {
    echo $@ | sed 's/\.js/.test.js/g'
}


main (){ 
    code_files=$(find_code_files)
    test_files=$(find_test_files $code_files)

    ret=true
    for file in $test_files
    do
        if test -f $file
        then true
        else
            ret=false
            echo $( echo $file | sed 's/\.test//') does not have a test file!
        fi
    done

    $ret
}

main

