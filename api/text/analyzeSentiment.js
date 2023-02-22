
async function analyzeSentiment(client, request) {
  const prompt = request.body.prompt || "Ce document est rédigé en Français.";
  const languageResult = await client.analyzeSentiment([prompt]);

  const results = [];
  languageResult.forEach(document => {
    results.push(document);
  });
  return results;
}

export {
  analyzeSentiment,
};
