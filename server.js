require('dotenv').config();
const app = require('./api');

const port = process.env.API_PORT || 3001;

app.listen(port, () => console.log(`server started on ${port}`));
