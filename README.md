# Efficient Privacy-Preserving Location Query (EPLQ)

## What is the project about?
EPLQ is a comprehensive location-based service platform that allows users to discover, share, and manage location information while maintaining privacy. The system provides a secure way to query and share location-based data with features like user authentication, role-based access control, and privacy-preserving recommendation systems.

## What does it do?
- **User Management**: Supports both regular users and administrators with secure authentication
- **Location Management**: Allows users to add, update, and delete location information with rich details
- **Privacy-Preserving Search**: Implements efficient location querying while protecting user privacy
- **Interactive Map Integration**: Uses Leaflet maps for visualization and location selection
- **Rating & Comments**: Enables users to rate and comment on locations
- **Smart Recommendations**: Provides personalized location recommendations using a Python-based recommendation system
- **Advanced Filtering**: Offers filtering by city, tags, and other attributes
- **Real-time Route Planning**: Shows routes between user location and selected destinations

## How does it help in real-life?
- **Tourism & Travel**: Helps travelers discover and navigate to interesting locations
- **Business Discovery**: Assists users in finding businesses and services in their area
- **Community Engagement**: Allows users to share experiences through ratings and comments
- **Privacy Protection**: Ensures user location data and personal information remain secure
- **Local Exploration**: Helps people discover new places in their vicinity with personalized recommendations
- **Trip Planning**: Facilitates better trip planning with detailed location information and routing

## Tech Stack
### Frontend
- **React**: Main frontend framework
- **Vite**: Build tool and development server
- **PrimeReact**: UI component library
- **Leaflet**: Interactive mapping library
- **Firebase**: Storage for location images
- **React Router**: Client-side routing

### Backend
- **Node.js**: Runtime environment
- **Express**: Web application framework
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **Python**: For recommendation system
- **JWT**: Authentication and authorization
- **bcrypt**: Password hashing

## APIs
- **Authentication API**
  - Register user
  - Login user
  - Update profile
  - Update profile image

- **Location API**
  - Create location
  - Update location
  - Delete location
  - Get locations
  - Get location details

- **Comments API**
  - Add comment
  - Update comment
  - Delete comment
  - Get comments

- **Recommendation API**
  - Get personalized recommendations
  - Process user interactions

- **External APIs**
  - OpenStreetMap for geocoding
  - Firebase Storage for image handling
  - TrueWay Directions for route planning

## Frameworks and Libraries
### Frontend Libraries
- primereact: UI components
- primeflex: CSS utility framework
- primeicons: Icon pack
- leaflet: Interactive maps
- react-leaflet: React components for Leaflet maps
- firebase: Cloud storage
- chart.js: Data visualization
- react-router-dom: Routing

### Backend Libraries
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: Authentication
- bcrypt: Password hashing
- cors: Cross-origin resource sharing
- python-shell: Python script integration
- dotenv: Environment variable management
- scikit-learn: Machine learning for recommendations

## Getting Started
1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   # Client setup
   cd client
   npm install

   # Server setup
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Configure MongoDB connection
   - Set up Firebase credentials
   - Configure JWT secret

4. Start the development servers:
   ```bash
   # Start client (in client directory)
   npm run dev

   # Start server (in server directory)
   npm run dev
   ```

5. Access the application at `http://localhost:5173`