const fs = require('fs');
const path = require('path');

// Read the current docs.json
const docsPath = path.join(__dirname, '..', 'docs.json');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

// Find the English navigation
const englishNav = docs.navigation.languages.find(lang => lang.language === 'en');
if (!englishNav) {
  console.error('English navigation not found!');
  process.exit(1);
}

// Extract the non-Learn tabs from English navigation
const nonLearnTabs = englishNav.tabs.filter(tab => tab.tab !== 'Learn');

// Update each language navigation
['cn', 'jp', 'ko'].forEach(langCode => {
  const langIndex = docs.navigation.languages.findIndex(lang => lang.language === langCode);
  if (langIndex === -1) {
    console.error(`Language ${langCode} not found!`);
    return;
  }
  
  // Keep the Learn tab (which is translated) and add all other English tabs
  const learnTab = docs.navigation.languages[langIndex].tabs.find(tab => tab.tab === 'Learn');
  
  // Replace the navigation with Learn first, then all other English tabs
  docs.navigation.languages[langIndex].tabs = [
    learnTab,
    ...nonLearnTabs
  ];
  
  console.log(`Updated ${langCode} navigation with English sections`);
});

// Write the updated docs.json
fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2));
console.log('Successfully updated docs.json with language fallback navigation');