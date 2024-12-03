import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Setup the database connection and sync models
    // await setupDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();