
const geminiService = require('./services/geminiService');

async function testContent() {
    try {
        console.log("Testing with Monday...");
        const result = await geminiService.getDailySpiritualContent("Monday", null, null);
        console.log("RESULT:", JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("ERROR:", err.message);
    }
}

testContent();
