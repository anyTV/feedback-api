## Feedback API
Standalone project help us add feedback feature easily into existing project

## Usage
1. Install
> npm install git+https://gitlab.com/mcnfreedom/vn-team/feedback-api.git

2. Import
```
import Feedback from './../index'
```

3. Configure
* configuration
```
// feedback setup
let feedback_api = new Feedback({
  DATABASE: {
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'crypto.miner-dev'
  }
}).set_logger(winston)
```
* Feedback field
You can custom feedback field by custom config `FIELDS`
```
FIELDS: [{
    name: 'description',
    required: true
  },
  { name: 'screenshot' },
  { name: 'additionalinfo' },
  { name: 'version' }]
```

* table name
You can custom name of feedback table by field `TABLE_NAME`

* router
```
app.use('/api/feedback', feedback_api.router)
```

Don't foget to config limit payload value of bodyParser in you server
```
app.use(bodyParser.json({ limit: '5mb' }))
```

## Test
Running server
> npm run dev

CURL example to create a new feedback
```
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
  "description":"description text",
  "version" : "0.0.1",
  "additionalinfo": "additional information"
}' \
 'http://localhost:3000/api/feedback'
```
