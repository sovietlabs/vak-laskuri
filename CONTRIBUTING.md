# Contributing

Use GitHub Issues for reproducible problems and pull requests for changes. Never include personal information, credentials, or private load details.

## Small changes

1. Create a branch from `main`.
2. Make a focused change to the files under `docs/` or the relevant documentation.
3. Run `node --test tests/*.test.mjs` and `python3 scripts/check-release.py`.
4. Serve the repository through HTTP and test the changed workflow.
5. Explain the problem, resulting behaviour, validation, and remaining limits in the pull request.
6. Obtain review before merging. Merging to the Pages publishing branch can publish the website.

## Local project-path test

The site uses relative resource URLs. To test it under a project prefix without a custom server, place this repository in a directory named `vak-laskuri`, serve its parent directory, and open `http://127.0.0.1:8080/vak-laskuri/docs/`.

The public Pages address serves the contents of `docs/` at `/vak-laskuri/`. Check that modules, JSON, the manifest, icons and browser history still work there. Do not introduce root-relative application URLs.

## Calculation or data changes

Provide the exact official source and section. Explain the quantity basis and boundary conditions. Add tests that can expose a real error; do not merely duplicate the implementation. Test category 0, category 4, category 1 footnotes, category 2's single-category limit, mixed loads, duplicate entries and decimal boundaries where relevant.

Do not infer a classification from a product name alone. Do not silently select a packing group. Do not treat a quantity result as a transport approval. The same UN number can have several entries.

## Data edition changes

Review the workbook and complete annex together. Update the source workbook hash, all affected variants, rule extracts, source edition, and actual data update date. Keep the data date unchanged for code-only changes. Catalogue hash changes invalidate browser-local recent selections.

## Screenshots

Use representative public substance data. Capture only the application. Do not include browser profiles, tabs, account names, local paths, addresses, customer information or load details. Strip optional image metadata. `scripts/check-release.py` rejects PNG ancillary metadata.

## Release checklist

- Tests pass and changed workflows are checked in a browser.
- Source/date warnings are present and visible before calculation.
- Every exported file has been reviewed.
- No personal identity, credentials, private host details or unrelated files are included.
- Links have approved destinations. Untrusted text stays inert.
- An independent reviewer has assessed the candidate, and unresolved findings are recorded.
- Regulatory/correctness review is recorded separately from security review.
- Maintainers explicitly approve publication of the candidate.

## Commit identity

Use the project's pseudonymous identity and the GitHub no-reply email for the account. Check author and committer metadata before pushing. Do not include a personal name or email in screenshots, attribution, commit messages or licence notices.

## Languages

Update the Finnish and English interfaces together. Keep official Finnish substance names and regulatory extracts unchanged. Keep calculation behaviour equal in both engine modules and run the language parity tests. Update README.md and README.fi.md together. Switching language loads a new page and clears the current load.
