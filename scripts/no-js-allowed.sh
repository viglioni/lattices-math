#!/bin/bash

find_js () {
  find . -regex '^\.\/src/.*\.ts$'
}

check_js_existance () {
  [$(find_js) -eq ''] && true || false
}
