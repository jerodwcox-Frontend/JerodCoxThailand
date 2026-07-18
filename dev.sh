#!/bin/bash
cd /Users/jerodcox/jerod-thailand-mission
source ~/.nvm/nvm.sh
nvm use 20 > /dev/null
exec npm run dev -- --port 5190 --strictPort
