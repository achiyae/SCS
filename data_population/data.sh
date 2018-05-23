curl -d name=USERS -X POST http://localhost:3000/api/group
curl -H 'Content-Type: application/json' -d @models/domain.data.json -X POST http://localhost:3000/api/domain
echo curl -X POST http://localhost:3000/api/user -d "group=&domain=&email=achiya_bgu.ac.il"

