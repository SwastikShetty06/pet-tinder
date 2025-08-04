#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

async function testRateLimiting() {
  console.log('🧪 Testing Rate Limiting and API Endpoints');
  console.log('==========================================');
  
  try {
    console.log('\n1. Testing server connectivity...');
    const healthResponse = await axios.get(`${BASE_URL}/auth/me`, {
      validateStatus: () => true // Accept any status code
    });
    
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   URL used: ${healthResponse.config.url}`);
    
    if (healthResponse.status === 401) {
      console.log('   ✅ Server is responding (401 is expected without auth)');
    } else if (healthResponse.status === 429) {
      console.log('   ❌ Rate limit hit immediately - rate limiting too strict');
      return;
    } else {
      console.log(`   ✅ Server responded with status ${healthResponse.status}`);
    }

    console.log('\n2. Testing multiple requests to check rate limiting...');
    let successCount = 0;
    let rateLimitCount = 0;
    
    // Make 10 rapid requests
    for (let i = 0; i < 10; i++) {
      try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
          validateStatus: () => true
        });
        
        if (response.status === 429) {
          rateLimitCount++;
          console.log(`   Request ${i + 1}: ❌ Rate limited (429)`);
        } else {
          successCount++;
          console.log(`   Request ${i + 1}: ✅ Success (${response.status})`);
        }
      } catch (error) {
        console.log(`   Request ${i + 1}: ❌ Error: ${error.message}`);
      }
      
      // Small delay to avoid overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n📊 Results:`);
    console.log(`   Successful requests: ${successCount}`);
    console.log(`   Rate limited requests: ${rateLimitCount}`);
    
    if (rateLimitCount === 0) {
      console.log('   ✅ Rate limiting is properly configured for development!');
    } else if (rateLimitCount < 5) {
      console.log('   ⚠️  Some rate limiting occurred, but manageable');
    } else {
      console.log('   ❌ Rate limiting too strict for development');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('   💡 Make sure the server is running: npm start');
    }
    
    if (error.config?.url) {
      console.log(`   🔍 Attempted URL: ${error.config.url}`);
    }
  }
}

// Run the test
testRateLimiting().then(() => {
  console.log('\n🏁 Test complete!');
}).catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
