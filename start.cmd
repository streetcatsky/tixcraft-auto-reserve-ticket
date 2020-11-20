@echo off
rem 拓元搶票助手
rem Description: 這個工具很不錯用惹就知道.
rem Author: street_cat
rem Contact: streetcatsky@gmail.com
rem Copyright: (c) 2020 - 小可愛事業股份無限公司.

cd .
title Good Luck !

IF NOT EXIST node_modules (
    echo library is not exist
    call npm i
) 

call npm run start-ts
pause>nul