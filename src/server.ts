import app from './app';

import { Database } from './database';

const PORT = process.env.PORT || 3000;

// "connect"
Database.connect();

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
