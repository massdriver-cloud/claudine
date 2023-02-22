
async function sentiment(client, request) {
  const prompt = request.body.prompt || "Ce document est rédigé en Français.";
  const languageResult = await client.sentiment([prompt]);

  const results = [];
  languageResult.forEach(document => {
    results.push(document);
  });
  return results;
}

export {
  sentiment,
};
