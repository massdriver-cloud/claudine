
async function entitiesLinking(client, request) {
  const prompt = request.body.prompt || "Ce document est rédigé en Français.";
  const languageResult = await client.entitiesLinking([prompt]);

  const results = [];
  languageResult.forEach(document => {
    console.log(`\tPrimary Language ${document.primaryLanguage.name}`)
    results.push(document);
  });
  return results;
}

export {
    entitiesLinking,
};
