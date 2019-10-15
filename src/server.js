const app = require('./app');
const fs = require('fs');
const path = require('path');
const bdPath = path.resolve('bd.json');
const port = process.env.PORT || 3000;

fs.readFile(bdPath, (err, data) => {
  if (err) {
    throw new Error('Could not open file');
  }
  try {
    const dbObject = JSON.parse(data.toString());
    if (Array.isArray(dbObject.data)) {
      app.listen(port, () =>
        console.log(`server running on http://localhost:${port}`)
      );
    } else {
      throw new Error('JSON File must be started with {"data": [] }');
    }
  } catch (error) {
    console.log(error.message);
  }
});
