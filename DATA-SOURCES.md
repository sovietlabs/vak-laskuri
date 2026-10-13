# Data sources and regulatory material

## Bundled source edition

- Edition: **VAK tie 2025**, TRAFICOM/463168/03.04.03.00/2024.
- Source data acquired and bundled: **11 October 2026**.
- 2,939 classification variants across 2,347 UN numbers.
- The SHA-256 hash of the source workbook is stored in `docs/data.json`.
- Original workbook: [Traficom Table A, VAK tie 2025](https://traficom.fi/sites/default/files/media/file/2025%20VAK%20tie%20A-taulukko.xlsx).
- Official regulation and annex: [Finlex](https://www.finlex.fi/fi/viranomaiset/maarayskokoelmat/traficom-tieliikenne/2025/51212).
- [Traficom legal index](https://traficom.fi/fi/liikennejarjestelma/vaarallisten-aineiden-kuljetus/vaarallisten-aineiden-kuljetusta-koskevia-saadoksia-ja-maarayksia).
- [Traficom description of VAK search](https://traficom.fi/fi/liikennejarjestelma/vaarallisten-aineiden-kuljetus/vak-haku).

## Transformations

The workbook's Table A fields were converted to JSON. Whitespace was normalised. Classifications were retained as separate rows. Transport category was read from column 15; it was not inferred from packing group. Row IDs identify variants within this exact workbook edition. A changed workbook requires a new source hash and review.

`docs/rules.json` contains text extracts from the official Finnish annex for SP, V, CV and S codes. Each extract includes an original PDF page reference. Text extraction can lose formatting, tables, formulas and footnotes. The original annex is authoritative. The full PDF is linked at its official source and is not bundled in this repository.

## Rights and attribution

The MIT licence applies to original application code. It does not assert ownership of Traficom's material or apply a new licence to the official rules.

The regulatory text and Table A are identified as official regulatory material. Finnish Copyright Act 404/1961 section 9 excludes specified laws, regulations and official documents from copyright. This statement is not a blanket declaration that every item on Traficom's website is unprotected. Independently protected material and database rights must be assessed separately where applicable. See [the Copyright Act](https://www.finlex.fi/fi/lainsaadanto/1961/404).

The application does not contain Traficom's website implementation, logo, or application code. Source references identify the origin of the regulatory information. Traficom has not approved or endorsed the application.

## Updates

This edition is manually maintained. A later website deployment does not establish that the data was updated. The displayed data date must reflect the actual reviewed source snapshot.

Before changing a source edition, compare the full official table and annex, review legal and calculation changes, preserve provenance, update tests and the date, and obtain release review. Reported errors never modify the bundled data automatically.
