const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Pet = require('./models/Pet');
const Match = require('./models/Match');
const Swipe = require('./models/Swipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pet-tinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to add dummy data
async function addDummyData() {
  try {
    console.log('🧹 Clearing existing data...');
    
    // Clear existing data
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Match.deleteMany({});
    await Swipe.deleteMany({});
    
    console.log('✅ Data cleared');
    
    // Create dummy users with proper password hashing
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      },
      {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        password: 'password123'
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123'
      }
    ];

    const createdUsers = [];
    
    for (const userData of users) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      const user = new User({
        name: userData.name,
        email: userData.email,
        passwordHash
      });
      
      await user.save();
      createdUsers.push(user);
      console.log(`👤 Created user: ${user.name} (${user.email})`);
    }

    // Create dummy pets with realistic data
    const petData = [
      // John's pets
      {
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        bio: 'Loves playing fetch and long walks in the park! Very friendly with other dogs and kids.',
        images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
        ownerId: createdUsers[0]._id
      },
      {
        name: 'Mittens',
        species: 'Cat',
        breed: 'Maine Coon',
        age: 2,
        bio: 'Fluffy and cuddly! Loves to purr and sit on laps. Great with children.',
        images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
        ownerId: createdUsers[0]._id
      },
      // Jane's pets
      {
        name: 'Luna',
        species: 'Dog',
        breed: 'Husky',
        age: 4,
        bio: 'Energetic and playful! Loves running and outdoor adventures. Great hiking companion.',
        images: ['https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400'],
        ownerId: createdUsers[1]._id
      },
      {
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Siamese',
        age: 5,
        bio: 'Elegant and vocal! Very social and loves attention. Gets along well with other cats.',
        images: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400'],
        ownerId: createdUsers[1]._id
      },
      // Bob's pets
      {
        name: 'Charlie',
        species: 'Dog',
        breed: 'Beagle',
        age: 6,
        bio: 'Gentle and calm. Perfect family dog who loves treats and belly rubs.',
        images: ['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400'],
        ownerId: createdUsers[2]._id
      },
      {
        name: 'Nemo',
        species: 'Fish',
        breed: 'Goldfish',
        age: 1,
        bio: 'Beautiful orange goldfish who loves swimming around his castle. Very peaceful.',
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'],
        ownerId: createdUsers[2]._id
      },
      // Alice's pets
      {
        name: 'Bella',
        species: 'Dog',
        breed: 'Labrador',
        age: 2,
        bio: 'Sweet and gentle lab who loves swimming and playing with toys. Great with kids!',
        images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400'],
        ownerId: createdUsers[3]._id
      },
      {
        name: 'Shadow',
        species: 'Cat',
        breed: 'Black Cat',
        age: 3,
        bio: 'Mysterious and independent but very loving. Enjoys sunny windowsills and catnip.',
        images: ['https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400'],
        ownerId: createdUsers[3]._id
      },
      {
        name: 'Kiwi',
        species: 'Bird',
        breed: 'Cockatiel',
        age: 2,
        bio: 'Cheerful and chatty! Loves to whistle tunes and show off his beautiful crest.',
        images: ['https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400'],
        ownerId: createdUsers[3]._id
      }
    ];

    const createdPets = [];
    for (const pet of petData) {
      const newPet = new Pet(pet);
      await newPet.save();
      createdPets.push(newPet);
      console.log(`🐾 Created pet: ${newPet.name} (${newPet.species}) - Owner: ${createdUsers.find(u => u._id.equals(newPet.ownerId))?.name}`);
    }

    // Create some sample swipes and matches
    console.log('💕 Creating sample interactions...');
    
    // John likes Jane's Luna (should create a match if Jane likes Buddy back)
    const swipe1 = new Swipe({
      userId: createdUsers[0]._id, // John
      petId: createdPets[2]._id,   // Luna
      direction: 'like'
    });
    await swipe1.save();
    
    // Jane likes John's Buddy (creates a match!)
    const swipe2 = new Swipe({
      userId: createdUsers[1]._id, // Jane
      petId: createdPets[0]._id,   // Buddy
      direction: 'like'
    });
    await swipe2.save();
    
    // Create a match between John and Jane (Buddy & Luna)
    const match1 = new Match({
      userId: createdUsers[0]._id, // John
      petId: createdPets[2]._id    // Luna
    });
    await match1.save();
    
    const match2 = new Match({
      userId: createdUsers[1]._id, // Jane
      petId: createdPets[0]._id    // Buddy
    });
    await match2.save();
    
    // Bob passes on Alice's Bella
    const swipe3 = new Swipe({
      userId: createdUsers[2]._id, // Bob
      petId: createdPets[6]._id,   // Bella
      direction: 'pass'
    });
    await swipe3.save();
    
    console.log('✅ Sample interactions created!');
    console.log('\n🎉 Dummy data added successfully!');
    console.log('\n📋 Summary:');
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🐾 Pets: ${createdPets.length}`);
    console.log(`   💕 Matches: 2`);
    console.log(`   👍/👎 Swipes: 3`);
    console.log('\n🔐 Test login credentials:');
    console.log('   Email: john@example.com, Password: password123');
    console.log('   Email: jane@example.com, Password: password123');
    console.log('   Email: bob@example.com, Password: password123');
    console.log('   Email: alice@example.com, Password: password123');
    
  } catch (error) {
    console.error('❌ Error adding dummy data:', error);
  } finally {
    mongoose.connection.close();
  }
}

addDummyData();
