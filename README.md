# 🐾 Pet Tinder

A Tinder-like application for pet adoption and matching, built with Next.js and Node.js. Swipe through adorable pets, find your perfect companion, and connect with pet owners in your area.

**Developed by:** [Swastik Ravi Shetty](https://github.com/SwastikShetty06) - Full Stack Developer passionate about creating scalable applications with modern web technologies.

![Pet Tinder](https://img.shields.io/badge/Pet-Tinder-ff6b6b?style=for-the-badge&logo=heart&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-blue?style=for-the-badge&logo=cloudinary&logoColor=white)

## 🌟 Features

### Core Functionality
- **🔐 User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **🐕 Pet Profiles**: Create detailed profiles with multiple images, breed, age, and bio
- **💫 Smart Swiping**: Tinder-style card interface with smooth animations
- **💝 Match System**: Connect with pet owners when both parties show interest
- **📱 Responsive Design**: Mobile-first design with intuitive navigation
- **🖼️ Image Management**: Cloudinary integration for optimized image storage and delivery

### Technical Features
- **⚡ Real-time Updates**: SWR for efficient data fetching and caching
- **🛡️ Security**: Helmet.js, rate limiting, and CORS protection
- **🎨 Modern UI**: Tailwind CSS with smooth animations using React Spring
- **📊 State Management**: Custom hooks for safe state management
- **🔄 Error Handling**: Comprehensive error boundaries and middleware

## 🏗️ Project Structure

```
pet-tinder/
├── pet-tinder-frontend/          # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── login/           # Authentication pages
│   │   │   ├── signup/          
│   │   │   ├── pets/            # Pet browsing
│   │   │   ├── matches/         # Match management
│   │   │   └── profile/         # User profile
│   │   ├── components/          # Reusable components
│   │   │   ├── PetCard.tsx      # Individual pet display
│   │   │   ├── SafeTinderCard.tsx # Swipe functionality
│   │   │   ├── AuthGuard.tsx    # Route protection
│   │   │   └── ...
│   │   ├── hooks/               # Custom React hooks
│   │   └── lib/                 # API utilities
│   └── package.json
│
└── pet-tinder-backend/           # Node.js Backend
    ├── config/                   # Configuration files
    │   ├── cloudinary.js        # Cloudinary setup
    │   └── db.js               # MongoDB connection
    ├── controllers/             # Business logic
    │   ├── petController.js     # Pet CRUD operations
    │   ├── authController.js    # Authentication logic
    │   └── ...
    ├── models/                  # MongoDB schemas
    │   ├── Pet.js              # Pet data model
    │   ├── User.js             # User data model
    │   └── ...
    ├── routes/                  # API endpoints
    ├── middlewares/            # Custom middleware
    └── server.js               # Express server setup
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for image storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SwastikShetty06/pet-tinder.git
cd pet-tinder
```

2. **Backend Setup**
```bash
cd pet-tinder-backend
npm install
```

3. **Frontend Setup**
```bash
cd ../pet-tinder-frontend
npm install
```

### Environment Configuration

#### Backend (.env)
Create a `.env` file in the `pet-tinder-backend` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/pet-tinder

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

#### Frontend Environment
The frontend is configured to connect to `http://localhost:5001` by default. Update the API base URL in `src/lib/axios.ts` if needed.

### Database Setup

1. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or start MongoDB service
brew services start mongodb/brew/mongodb-community
```

2. **Database will be created automatically** when you first run the backend.

### Running the Application

#### Start Backend Server
```bash
cd pet-tinder-backend
npm run dev
```
Backend will run on `http://localhost:5001`

#### Start Frontend Application
```bash
cd pet-tinder-frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: React Spring, React Tinder Card
- **HTTP Client**: Axios
- **Data Fetching**: SWR
- **State Management**: React Hooks + Custom Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv

### DevOps & Tools
- **Image Storage**: Cloudinary CDN
- **Development**: Nodemon, Next.js Dev Server
- **Code Quality**: ESLint, TypeScript
- **Package Management**: npm

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Pets
- `GET /api/pets` - Get swipeable pets
- `POST /api/pets` - Create pet profile (with image upload)
- `GET /api/pets/:id` - Get specific pet
- `PUT /api/pets/:id` - Update pet profile
- `DELETE /api/pets/:id` - Delete pet profile

### Swipes & Matches
- `POST /api/swipes` - Record a swipe
- `GET /api/matches` - Get user's matches

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔄 How It Works

### Image Upload Flow
1. **Frontend**: User selects images via file input
2. **Multer**: Receives files in server memory
3. **DataURI**: Converts file buffers to uploadable format
4. **Cloudinary**: Processes and stores images, returns secure URLs
5. **MongoDB**: Stores only the Cloudinary URLs
6. **Display**: Frontend shows images using Cloudinary URLs

### Swipe & Match Logic
1. User swipes left (pass) or right (like) on pet cards
2. Swipe data is recorded in the database
3. If both users like each other's pets, a match is created
4. Matched users can see each other in the matches section

## 🎨 Key Components

### Frontend Components
- **PetCard**: Displays pet information with images
- **SafeTinderCard**: Handles swipe gestures and animations
- **AuthGuard**: Protects routes requiring authentication
- **BottomNavigation**: Mobile-friendly navigation

### Backend Features
- **JWT Authentication**: Secure token-based authentication
- **Image Processing**: Automatic image optimization via Cloudinary
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: Comprehensive error management

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Stateless authentication
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Sets security headers
- **Input Validation**: Mongoose schema validation

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Update CORS origins for production domains
3. Ensure MongoDB connection string points to production database
4. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Update API base URL for production
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platforms

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please feel free to reach out to me at [swastikshetty06ss@gmail.com](mailto:swastikshetty06ss@gmail.com) for any questions or collaboration opportunities!

## 📝 Future Enhancements

- [ ] Real-time chat between matched users
- [ ] Location-based pet discovery
- [ ] Advanced filtering (age, breed, size)
- [ ] Push notifications for matches
- [ ] Social media integration
- [ ] Pet adoption agency partnerships
- [ ] Video profiles for pets
- [ ] AI-powered pet recommendations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Swastik Ravi Shetty** - *Full Stack Developer* - [SwastikShetty06](https://github.com/SwastikShetty06)
  - 📧 swastikshetty06ss@gmail.com
  - 📱 (+91) 9309166232
  - 💼 [LinkedIn Profile](https://linkedin.com/in/swastik-shetty-186802235)
  - 📍 Virar West, Maharashtra, India

## 🙏 Acknowledgments

- React Tinder Card library for swipe functionality
- Cloudinary for image management
- The amazing open-source community

---

**Made with ❤️ for pet lovers everywhere** 🐾

For questions or support, please open an issue or contact [swastikshetty06ss@gmail.com](mailto:swastikshetty06ss@gmail.com).
