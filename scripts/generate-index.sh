#!/bin/bash

find_modules () {
  find . -regex '\./src/.*[^spec][^index]\.ts$'
}

name () {
  echo $1 | sed -e 's/.*\///' -e 's/\.ts//' -e 's/\-//'
}

module () {
  echo $1 | sed -e 's/\/src//' -e 's/\.ts//'
}

imports() {
  for mod in $(find_modules)
  do
    echo "import * as $(name $mod) from '$(module $mod)'" >> $1
  done
}

exports(){
  echo export default \{ >> $1
  for module in $(find_modules)
  do
    echo "...$(name $module)," >> $1
  done
  echo \} >> $1
}

generate_index(){
  rm -f ./src/index.ts
  touch ./src/index.ts
  imports  ./src/index.ts
  echo "" >> ./src/index.ts
  exports  ./src/index.ts
  echo "" >> ./src/index.ts
  echo "// this file is generated automatically with 'yarn index'" >> ./src/index.ts
  echo "// please do not change this file" >> ./src/index.ts
  git add ./src/index.ts
}

generate_index

