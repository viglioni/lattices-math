#!/bin/bash

find_js () {
  find . -regex '^\.\/src/.*\.js$'
}

check_js_existance () {
  js_files=$(find_js)
  if [$js_files -eq '']
  then true
  else (echo "There are js files in ./src! \n $js_files \n Please use typescript" && false)
  fi
}


check_js_existance
