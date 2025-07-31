# Quai Documentation Translations

This document explains how to contribute translations to the Quai documentation.

## Supported Languages

- **English (en)** - Default language
- **Chinese (cn)** - 中文
- **Japanese (jp)** - 日本語  
- **Korean (ko)** - 한국어

## Directory Structure

Translations are organized in language-specific directories:

```
quai-docs/
├── learn/                    # English content (default)
├── cn/                       # Chinese translations
│   ├── learn/
│   ├── build/
│   ├── sdk/
│   └── ...
├── jp/                       # Japanese translations
│   ├── learn/
│   ├── build/
│   ├── sdk/
│   └── ...
└── ko/                       # Korean translations
    ├── learn/
    ├── build/
    ├── sdk/
    └── ...
```

## Translation Management

We provide a translation management script to help organize translations:

### Setup

```bash
# Initialize translation directory structure
node scripts/translation-manager.js init

# Generate translation templates for all MDX files
node scripts/translation-manager.js templates

# Check translation status
node scripts/translation-manager.js status
```

### Translation Workflow

1. **Generate Templates**: Use the script to create translation templates
2. **Translate Content**: Translate the content while maintaining structure
3. **Update Links**: Ensure internal links use the correct language prefix
4. **Review**: Test the translations in the documentation site

## Translation Guidelines

### Content Structure

- Maintain the same frontmatter structure as the original
- Keep all images, components, and external links intact
- Update internal links to use language prefixes (e.g., `/zh/learn/...`)

### Frontmatter Translation

```yaml
---
title: "Translated Title"
description: "Translated Description"
---
```

### Link Updates

When translating, update internal links to include the language prefix:

```markdown
# Original (English)
[Learn more](/learn/introduction)

# Chinese translation
[了解更多](/cn/learn/introduction)

# Japanese translation  
[詳細を見る](/jp/learn/introduction)

# Korean translation
[자세히 보기](/ko/learn/introduction)
```

### Code Blocks

- Keep code examples unchanged
- Translate comments within code blocks
- Maintain code formatting and syntax highlighting

### Technical Terms

- Use consistent translations for technical terms
- Consider creating a glossary for common terms
- Maintain consistency across all translated content

## Quality Assurance

### Before Submitting

1. **Spell Check**: Use appropriate spell checkers for each language
2. **Grammar Review**: Ensure proper grammar and natural flow
3. **Technical Accuracy**: Verify technical terms are correctly translated
4. **Link Testing**: Test all internal and external links
5. **Formatting**: Ensure proper markdown formatting

### Review Process

1. **Self-Review**: Review your own translations
2. **Peer Review**: Have another translator review your work
3. **Technical Review**: Have a technical expert review for accuracy
4. **Final Review**: Final review before merging

## Common Translation Patterns

### Navigation Terms

| English | Chinese | Japanese | Korean |
|---------|---------|----------|--------|
| Getting Started | 入门指南 | はじめに | 시작하기 |
| Advanced Topics | 高级主题 | 高度なトピック | 고급 주제 |
| API Reference | API 参考 | API リファレンス | API 참조 |
| Guides | 指南 | ガイド | 가이드 |

### Technical Terms

| English | Chinese | Japanese | Korean |
|---------|---------|----------|--------|
| Blockchain | 区块链 | ブロックチェーン | 블록체인 |
| Smart Contract | 智能合约 | スマートコントラクト | 스마트 컨트랙트 |
| Wallet | 钱包 | ウォレット | 지갑 |
| Mining | 挖矿 | マイニング | 채굴 |

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch for your translations
3. Use the translation manager to generate templates
4. Translate the content following the guidelines
5. Submit a pull request

### Translation Assignments

- Coordinate with other translators to avoid duplicate work
- Focus on specific sections or topics
- Update the translation status regularly

### Communication

- Use GitHub issues for translation-related discussions
- Tag issues with appropriate language labels
- Coordinate with the documentation team for technical questions

## Resources

### Translation Tools

- **Chinese**: Use standard Chinese input methods and dictionaries
- **Japanese**: Consider using specialized technical dictionaries
- **Korean**: Use Korean technical terminology databases

### Reference Materials

- Official Quai documentation terminology
- Blockchain and cryptocurrency glossaries
- Technical documentation style guides

## Support

For questions about translations:

1. Check existing issues and discussions
2. Create a new issue with the `translation` label
3. Contact the documentation team

## License

Translations are subject to the same license as the original documentation. 