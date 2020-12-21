#!/bin/zsh

# A partir da pasta raiz
#find . -name *.test.js &&
#find . -name *.test.js -not path '*node_modules**' &&
#find . -name *.js -not path '*node_modules**' &&
#
#npm i -g ipt &&
#find . -name *.js -not path '*node_modules**' | ipt &&

# dentro do projeto
# cp -r ../../testing/final-project

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# 1s -> primeira linha
# ^ -> primeira colouna
# subistitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito

# muda tudo
find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
