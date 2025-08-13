const fs = require('fs');
const path = require('path');

// Read the current docs.json
const docsPath = path.join(__dirname, '..', 'docs.json');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

// Function to add language prefix to all pages
function prefixPages(pages, langCode) {
  return pages.map(page => {
    if (typeof page === 'string') {
      // If it doesn't already have the language prefix, add it
      if (!page.startsWith(`${langCode}/`)) {
        return `${langCode}/${page}`;
      }
      return page;
    } else if (page.group && page.pages) {
      // Recursively handle nested groups
      return {
        ...page,
        pages: prefixPages(page.pages, langCode)
      };
    } else if (page.pages) {
      // Handle pages array without group
      return {
        ...page,
        pages: prefixPages(page.pages, langCode)
      };
    }
    return page;
  });
}

// Update each non-English language navigation
['cn', 'jp', 'ko'].forEach(langCode => {
  const langIndex = docs.navigation.languages.findIndex(lang => lang.language === langCode);
  if (langIndex === -1) {
    console.error(`Language ${langCode} not found!`);
    return;
  }
  
  // Get the current tabs
  const tabs = docs.navigation.languages[langIndex].tabs;
  
  // Update each tab to ensure ALL pages have the language prefix
  const updatedTabs = tabs.map(tab => {
    return {
      ...tab,
      groups: tab.groups.map(group => ({
        ...group,
        pages: prefixPages(group.pages, langCode)
      }))
    };
  });
  
  docs.navigation.languages[langIndex].tabs = updatedTabs;
  
  console.log(`Updated ${langCode} navigation with language prefixes`);
});

// Write the updated docs.json
fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2));
console.log('Successfully updated docs.json with language prefixes for all pages');