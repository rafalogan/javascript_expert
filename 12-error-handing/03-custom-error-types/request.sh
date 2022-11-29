echo "\n\n[request: normal request]"
curl -i localhost:3000 -X POST --data '{"name": "Wolverine", "age": 300}' #correct

echo "\n\n[request: wromg age]"
curl -i localhost:3000 -X POST --data '{"name": "Wanda", "age": 17}'

echo "\n\n[request: wromg name]"
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 30}'

echo "\n\n[request: connection error]"
curl -i localhost:3000 -X POST --data '{"connectionError": "W"}'

