# Usage

1. **Install Backend Dependencies**  
   
   - Rename the `.env.example` file to `.env` in the backend directory.
   - Change the JWT `SECRET`.
   - Navigate to the backend directory: `cd backend`
   - Install the necessary dependencies:
   ```sh
   npm install express dotenv cors mongoose jsonwebtoken bcryptjs colors validator
   ```
   - Install Dev Dependencies
   ```sh
   npm install nodemon jest supertest cross-env -D
   ```
   - Start the server
   ```sh
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
