# Release Guide

## Stable Release

Used when QA is complete and the version is ready for production.

**Tag format:** `v1.28.0` (semver, no suffix)

```bash
git pull origin master
git tag v1.28.0
git push origin v1.28.0
```

**What CircleCI does (`build-and-release` workflow):**
1. Builds, lints, tests, and generates coverage
2. Pauses for manual approval (`sdk-release-verification`)
3. Publishes to npm as `latest`
4. Publishes documentation to `gh-pages`
5. Creates a GitHub Release with `miniapp.bundle.js` attached

**MiniApp team installs it as:**
```bash
npm install js-miniapp-sdk
# or pinned
npm install js-miniapp-sdk@1.28.0
```

---

## Pre-release

Used to share a work-in-progress version with a specific team before QA is complete.

**Tag format:** `v1.28.0-rc.1` (any suffix after `-`)

```bash
git pull origin master
git tag v1.28.0-rc.1
git push origin v1.28.0-rc.1
```

**What CircleCI does (`pre-release` workflow):**
1. Builds, lints, tests, and generates coverage
2. Pauses for manual approval (`sdk-prerelease-verification`)
3. Publishes to npm under the `next` dist-tag (does **not** affect `latest`)
4. Creates a GitHub Pre-release with `miniapp.bundle.js` attached
5. Documentation is **not** published

**MiniApp team installs it as:**
```bash
npm install js-miniapp-sdk@next
# or pinned to exact version
npm install js-miniapp-sdk@1.28.0-rc.1
```

---

## Promoting a Pre-release to Stable

Once QA passes, tag the same commit as a stable release:

```bash
git tag v1.28.0
git push origin v1.28.0
```

This triggers the `build-and-release` workflow and publishes as `latest` on npm.

---

## Tag Naming Convention

| Scenario | Tag Example |
|---|---|
| Stable release | `v1.28.0` |
| Release candidate | `v1.28.0-rc.1` |
| Beta | `v1.28.0-beta.1` |
| Hotfix candidate | `v1.28.1-rc.1` |

Any tag containing a `-` triggers the pre-release pipeline.
Any tag matching exact semver (`vX.Y.Z`) triggers the stable pipeline.
