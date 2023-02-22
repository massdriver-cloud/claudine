
async function languages(client, request) {
  const prompt = request.body.prompt || "Ce document est rédigé en Français.";
  const languageResult = await client.languages([prompt]);

  const results = [];
  languageResult.forEach(document => {
    console.log(`\tPrimary Language ${document.primaryLanguage.name}`)
    results.push(document);
  });
  return results;
}

export {
    languages,
};
