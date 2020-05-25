# Contributing

**This repository's issues section is only for bug tracking, code contribution, questions about the inner workings of GAB/design decisions or other code-related purposes. For help on how to use GAB, please visit [our Discord Server](https://discord.gg/g2Yx8pb) instead.**

GAwesomeBot is open source, as such, anyone can clone, fork, and contribute to the code GAB runs. Before you do so, please make sure you're up-to-date on [our license](https://github.com/GAwesomeBot/<repo>/blob/master/LICENSE) and its terms. If you want to contribute to GAB's development, you can help us track down bugs and reporting them [here](https://github.com/GAwesomeBot/<repo>/issues). If you want to contribute to the codebase, make sure you follow [our ESLint rules](https://github.com/GAwesomeBot/<repo>/blob/master/.eslintrc.json), your Pull Request must not contain any ESLint errors, or it will not be merged.

*Pro Tip: Using an editor that has ESLint syntax checking is super useful when working on GAB!*

## Setup

To get ready to edit GAwesomeBot's code, do the following:

1. Fork & clone the repository, and select the **master** branch.
2. Create a new branch in your fork.
3. Run `npm install`
4. Start coding, making sure to document changes using JSDoc accordingly.
5. Commit your changes and push them
6. [Submit a pull request](https://github.com/GAwesomeBot/<repo>/pulls)

Happy coding, GAwesomeUsers!

## Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas. More can be added at any point in time_

- Everything should follow [OOP paradigms](https://en.wikipedia.org/wiki/Object-oriented_programming) and generally rely on behaviour over state where possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.
- Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
- Everything should follow [Discord Bot Best Practices](https://github.com/meew0/discord-bot-best-practices)
