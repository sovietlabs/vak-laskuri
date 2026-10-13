# Security and release status

This is a static test application. It has no writable server API, remote calculation service, user database, automatic data-update job or embedded credential. Reports are prepared in the browser. A report is only submitted to GitHub when the user completes submission on GitHub.

## Reporting a vulnerability

Use the repository's GitHub Security Advisories private reporting channel if maintainers have enabled it. If private reporting is unavailable, open an issue requesting a private reporting channel without including exploit details, credentials or personal information. Do not post a working exploit against an active service in a public issue.

## Design controls

- Catalogue and rule schemas are validated before rendering.
- User and dataset text is rendered with text nodes; no HTML-string rendering or dynamic code evaluation is used.
- External source links have fixed or validated destinations.
- Recent selections are bounded and validated against the exact catalogue edition.
- Report text is bounded. GitHub draft URL parameters are encoded.
- A Content Security Policy is supplied in the HTML. GitHub Pages controls HTTP response headers; the HTML policy cannot set every server-level protection.
- Only static application files are published. No backend files or credentials are required.
- Images must contain no optional PNG metadata.

These controls and automated tests are not proof that all vulnerabilities are absent. Public release requires an independent review of the exact candidate. Calculation and regulatory acceptance are separate tasks. Test status must not be represented as operational transport certification.

## Maintenance

Review incoming changes, follow official source updates, run tests before deployment, and correct reported problems through reviewed changes. To stop a problematic deployment, disable GitHub Pages or restore a reviewed commit. Do not automatically accept user-reported data corrections.
