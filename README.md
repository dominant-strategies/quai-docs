# Quai Network Documentation

Thanks for your interest in contributing to the [Quai Network documentation](https://qu.ai/docs/)! This document contains information on how this repository is managed, and how to contribute to the documentation.

## Table of Contents

- [Who Owns This Repo?](#who-owns-this-repo)
- [Docs Architecture](#docs-architecture)
- [MDX](#mdx)
- [Images](#images)
- [Local Development](#local-development)
- [Translations](#translations)
- [How To Contribute](#how-to-contribute)

## Who Owns This Repo?

This repository is owned by [Dominant Strategies](https://dominantstrategies.io/), a software development company working on [Quai Network](https://qu.ai/). All changes to this repository must be approved by the Dominant Strategies team before being merged into the main branch.

For help contributing to this repository or to discuss proposed changes, you can join and chat in the [Quai Dev Discord Server](https://discord.gg/s8y8asPwNC).

### Docs Architecture

This documentation runs off of the [Mintlify Framework](https://mintlify.com/).

The Quai documentation is divided into five seperate **tabs**: Learn, Build, SDK, Client, and Guides. Each of the tabs contain a series of `.mdx` docs that are displayed in the sidebar of the documentation.

| Tab    | Description                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| Learn  | General information about Quai Network, including an overview of the network architecture and its features |
| Build  | Information on how to build on Quai Network, including smart contract deployment, APIs, and libraries      |
| SDK    | Information on the quais.js SDK, including how to use it and its features                                  |
| Client | A broad overview of the go-quai client, stratum proxy, and GPU miner.                                      |
| Guides | Guides on how to run the client, develop, and more                                                         |

Most contributions to this repository will not require the creation of a new doc, and will focus on editing existing docs; however, if your proposed changes do require a new doc, you can learn how to create one in the [Mintlify documentation](https://mintlify.com/docs/development). While there are no strict guidelines for the organization of docs within tabs, proposed changes should follow the existing docs structure as closely as possible.

### MDX

Each **doc** is created in Markdown as an .mdx file. `.mdx` files allow for the use of components in your Markdown docs. You can learn more about the full capabilities of .mdx files in the [mdxjs documentation](https://mdxjs.com/docs/).

### Images

Images live in the /images/ folder of this repository. To add a new image, add the file to the /images/ folder and reference it in your Markdown doc(s) with the following: `![AltText](imagepath)` or `<img src="imagepath" alt="image title />`

### Local Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of the documentation (where mint.json is)

```
mintlify dev
```

### Translations

This documentation now supports multiple languages:

- **English (en)** - Default language
- **Chinese (cn)** - 中文
- **Japanese (jp)** - 日本語
- **Korean (ko)** - 한국어

#### Translation Management

We provide tools to help manage translations:

```bash
# Check translation status
node scripts/translation-manager.js status

# Generate translation templates
node scripts/translation-manager.js templates

# Initialize translation structure
node scripts/translation-manager.js init
```

For detailed information about contributing translations, see [TRANSLATIONS.md](./TRANSLATIONS.md).

#### Translation Workflow

1. Use the translation manager to generate templates
2. Translate content following the guidelines in [TRANSLATIONS.md](./TRANSLATIONS.md)
3. Update internal links with language prefixes (e.g., `/zh/learn/...`)
4. Use [TRANSLATION_GLOSSARY.md](./TRANSLATION_GLOSSARY.md) for consistent terminology
5. Test translations in the documentation site

#### Contributing Translations

If you're interested in contributing translations:

1. Check the translation status: `node scripts/translation-manager.js status`
2. Choose a file to translate
3. Follow the guidelines in [TRANSLATIONS.md](./TRANSLATIONS.md)
4. Submit a pull request

For questions about translations, reach out to our team via the [Quai Dev Discord Server](https://discord.gg/s8y8asPwNC).

### How To Contribute

The Quai Network docs are built using the [Mintlify Framework](https://mintlify.com/) and written using MDX.

To contribute to the Quai documentation, you'll need to [fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo), [commit your changes to your fork](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository), and [create an upstream pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) with your changes. This will allow for open-sourced, collaborative review of all changes before they are merged into the main branch.

In the effort of maintaining the quality and integrity of the Quai Network documentation, all changes require:

- DS Team approval: All changes to this repository must be approved by the [Dominant Strategies](https://dominantstrategies.io) team before being merged into the main branch.
- Passing CI: All changes must pass the CI checks before being merged into the main branch.
- Conversation: Reach out to the DS team directly on the [Quai Dev Discord Server](https://discord.gg/s8y8asPwNC) to discuss your proposed changes.

**Translation support is now available! See the [Translations](#translations) section above for information on how to contribute translations.**
```
