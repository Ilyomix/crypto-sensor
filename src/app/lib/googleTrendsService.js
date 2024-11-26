const googleTrends = require('google-trends-api');

async function getTrendScore(term) {
  try {
    const results = await googleTrends.interestOverTime({
      keyword: term,
      startTime: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    });
    const parsedResults = JSON.parse(results);
    const timeline = parsedResults.default.timelineData;
    const lastScore = timeline[timeline.length - 1].value[0];
    return { score: lastScore };
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    throw new Error('Error retrieving Google Trends data');
  }
}

module.exports = { getTrendScore };

