#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Supported languages
const LANGUAGES = {
  cn: { name: 'Chinese', native: '中文' },
  jp: { name: 'Japanese', native: '日本語' },
  ko: { name: 'Korean', native: '한국어' }
};

// Directories to translate
const TRANSLATION_DIRS = [
  'learn',
  'build',
  'sdk',
  'client',
  'guides',
  'get-involved'
];

// Files to exclude from translation
const EXCLUDE_FILES = [
  'navigation.json',
  'index.mdx' // Will be handled separately
];

/**
 * Create directory structure for translations
 */
function createTranslationStructure() {
  console.log('Creating translation directory structure...');
  
  Object.keys(LANGUAGES).forEach(langCode => {
    TRANSLATION_DIRS.forEach(dir => {
      const targetDir = path.join(langCode, dir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Created: ${targetDir}`);
      }
    });
  });
}

/**
 * Find all MDX files in a directory recursively
 */
function findMdxFiles(dir, excludeFiles = []) {
  const files = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findMdxFiles(fullPath, excludeFiles));
    } else if (stat.isFile() && item.endsWith('.mdx') && !excludeFiles.includes(item)) {
      files.push(fullPath);
    }
  });
  
  return files;
}

/**
 * Create translation template for a file
 */
function createTranslationTemplate(sourceFile, targetLang) {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const relativePath = path.relative('.', sourceFile);
  const targetPath = path.join(targetLang, relativePath);
  
  // Create target directory if it doesn't exist
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Check if translation already exists
  if (fs.existsSync(targetPath)) {
    console.log(`Translation already exists: ${targetPath}`);
    return;
  }
  
  // Create translation template
  const template = `---
# TODO: Translate the frontmatter
title: "TRANSLATE_TITLE"
description: "TRANSLATE_DESCRIPTION"
---

# TODO: Translate this content

${content}

<!-- 
Translation Notes:
- Original file: ${sourceFile}
- Target language: ${LANGUAGES[targetLang].name}
- Please translate all content while maintaining the same structure
- Keep all links, images, and components intact
- Update internal links to use the appropriate language prefix (/${targetLang}/)
-->
`;

  fs.writeFileSync(targetPath, template);
  console.log(`Created translation template: ${targetPath}`);
}

/**
 * Generate translation templates for all files
 */
function generateTranslationTemplates() {
  console.log('Generating translation templates...');
  
  TRANSLATION_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const mdxFiles = findMdxFiles(dir, EXCLUDE_FILES);
      
      mdxFiles.forEach(file => {
        Object.keys(LANGUAGES).forEach(langCode => {
          createTranslationTemplate(file, langCode);
        });
      });
    }
  });
}

/**
 * List translation status
 */
function listTranslationStatus() {
  console.log('Translation Status:\n');
  
  TRANSLATION_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`\n${dir.toUpperCase()}:`);
      const mdxFiles = findMdxFiles(dir, EXCLUDE_FILES);
      
      mdxFiles.forEach(file => {
        const relativePath = path.relative('.', file);
        console.log(`  ${relativePath}:`);
        
        Object.keys(LANGUAGES).forEach(langCode => {
          const translationPath = path.join(langCode, relativePath);
          const exists = fs.existsSync(translationPath);
          const status = exists ? '✓' : '✗';
          console.log(`    ${LANGUAGES[langCode].native}: ${status}`);
        });
      });
    }
  });
}

/**
 * Main function
 */
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'init':
      createTranslationStructure();
      break;
    case 'templates':
      generateTranslationTemplates();
      break;
    case 'status':
      listTranslationStatus();
      break;
    case 'help':
    default:
      console.log(`
Translation Manager for Quai Documentation

Usage: node scripts/translation-manager.js <command>

Commands:
  init      - Create translation directory structure
  templates - Generate translation templates for all MDX files
  status    - List translation status for all files
  help      - Show this help message

Supported languages: ${Object.keys(LANGUAGES).map(lang => `${lang} (${LANGUAGES[lang].native})`).join(', ')}
      `);
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  LANGUAGES,
  TRANSLATION_DIRS,
  createTranslationStructure,
  generateTranslationTemplates,
  listTranslationStatus
}; 