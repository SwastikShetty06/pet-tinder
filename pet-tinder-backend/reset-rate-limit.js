#!/usr/bin/env node

console.log('🔄 Rate Limit Reset Utility');
console.log('============================');

console.log('\n📝 Note: express-rate-limit stores data in memory by default.');
console.log('   To reset rate limits, simply restart your server:');
console.log('');
console.log('   1. Stop the server (Ctrl+C if running)');
console.log('   2. Start it again: npm start');
console.log('');
console.log('💡 With the updated configuration, you now have:');
console.log('   • Development: 1000 requests per 15 minutes');
console.log('   • Production: 100 requests per 15 minutes');
console.log('');
console.log('🧪 To test the new settings, run:');
console.log('   node debug-api.js');
console.log('');

// Check if server is running
const axios = require('axios');
const BASE_URL = 'http://localhost:5001/api';

async function checkServer() {
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      validateStatus: () => true,
      timeout: 2000
    });
    
    if (response.status === 429) {
      console.log('❌ Server is running but rate limited');
      console.log('   Restart the server to reset rate limits');
    } else {
      console.log(`✅ Server is running and responding (status: ${response.status})`);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️  Server is not running');
      console.log('   Start it with: npm start');
    } else {
      console.log(`❓ Server check failed: ${error.message}`);
    }
  }
}

checkServer();
