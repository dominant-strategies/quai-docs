#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌍 Setting up Quai Documentation Translations...\n');

// Check if translation directories exist
const languages = ['cn', 'jp', 'ko'];
const directories = ['learn', 'build', 'sdk', 'client', 'guides', 'get-involved'];

console.log('📁 Creating translation directory structure...');
languages.forEach(lang => {
  directories.forEach(dir => {
    const targetDir = path.join(lang, dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`  ✓ Created: ${targetDir}`);
    } else {
      console.log(`  - Exists: ${targetDir}`);
    }
  });
});

console.log('\n📋 Checking existing translations...');
const translationManager = require('./translation-manager.js');
translationManager.listTranslationStatus();

console.log('\n✅ Translation setup complete!');
console.log('\n📚 Next steps:');
console.log('1. Run "node scripts/translation-manager.js templates" to generate translation templates');
console.log('2. Start translating files in the zh/, ja/, and ko/ directories');
console.log('3. Follow the guidelines in TRANSLATIONS.md');
console.log('4. Use TRANSLATION_GLOSSARY.md for consistent terminology');
console.log('\n🌐 The documentation now supports:');
console.log('  - English (en) - Default');
console.log('  - Chinese (zh) - 中文');
console.log('  - Japanese (ja) - 日本語');
console.log('  - Korean (ko) - 한국어'); 