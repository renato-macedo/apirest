import app from './app';

import { Database } from './database';

const PORT = process.env.PORT || 3000;

// "connect"
Database.connect('./src/database/db.json');

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
