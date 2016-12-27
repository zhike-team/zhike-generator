# zhike-generator

awesome generator for zhike backend project

## Install

    $ npm install -g zhike-generator

## Usage

*first, enter to your working directory, then run the following command*

    $ zhike-generator myapp 

or    

    $ zhike-generator -t express myapp

## Template

Avaliable template now is only `express`.       
Welcome to add your favourite to the directory of `templates`.

## ChangeLog

2016.12.27: 

1. express模板删除掉bin目录下的init_db和init_config文件
2. bin目录下添加数据库修改的migrate文件，执行数据库修改只需执行npm run migrate即可
2. 添加.eslintrc.js, git commit之前会对代码格式进行相应的检查