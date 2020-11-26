#!/bin/bash

# 拓元搶票助手
# Description: 這個工具很不錯用惹就知道.
# Author: street_cat
# Contact: streetcatsky@gmail.com
# Copyright: (c) 2020 - 小可愛事業股份無限公司.

cd .

if [ ! -d "node_modules" ]; then
    # 目錄 /path/to/dir 不存在
    echo "Directory /node_modules does not exists."
    echo "install library"
    npm i
fi

npm run start-ts

read -p "Press any key to continue."