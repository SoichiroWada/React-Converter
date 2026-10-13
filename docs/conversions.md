# Conversion accuracy and definitions

The application supports **85 fields**: 21 length, 24 mass, 24 area,
14 duration and 2 temperature fields. This audit covers every field reachable
from `App.js`. `src/components/trush/` contains unused historical prototypes;
they are not imported by the application and are not supported calculators.

## Calculation and display

- `src/conversion/units.js` is the single registry. All factors, including
  fractions, are strings. Reference units are m, kg, m², s and °C.
- `decimal.js` calculations return 30 significant digits with half-even
  rounding. Its constructor is cloned so this configuration is isolated.
- Finite factors remain exact decimals; repeating factors remain fractions.
  Conversion cross-multiplies source/target definitions and uses sufficient
  guard precision for exact products, then rounds the final division to 30
  digits. This avoids rounding the ratio before multiplication. Temperature
  guard precision covers the full input/offset digit span before their final
  division: even an integer offset can break a rounding tie at exponent 1000.
- The active field always preserves the original input string. Other fields
  use **12 significant digits by default**, selectable from 1–30 significant
  digits or 0–30 decimal places. Significant digits specifies a maximum;
  unnecessary trailing zeros are omitted. Decimal places includes trailing
  zeros. Rounded negative zero displays as unsigned zero.
- Formatting never changes the original input or cached Decimal results.
  Decimal-place mode may intentionally display tiny values as zero. Results
  above exponent 60 use scientific notation to avoid enormous fixed strings;
  the selected decimal-place rounding still applies.
- Accept complete signed decimal/scientific strings, including `.5`, `1.` and
  `1e-20`. Reject trailing junk, grouping separators, hexadecimal, NaN and
  infinity. Incomplete edits stay visible in the active field while the other
  fields clear. Maximum input size is 1,000 significant digits, a raw string
  length of 1,016 characters and exponent magnitude 10,000; normalized exponent
  magnitude must also be ≤10,000. Out-of-range input is rejected, not silently
  converted to infinity or zero.
- Linear results can round-trip to within about 30 significant digits; an
  infinitely repeating result cannot be represented exactly. Affine
  temperature conversions can lose extremely small differences around an
  offset: at 30 digits, `1e-1000 °C` becomes `32 °F`, so reversing that value
  cannot recover the original tiny quantity. More display digits cannot
  restore digits beyond the internal precision.
- Parse once per input edit, create factor objects once, and cache exact
  numerator/denominator pairs on demand. Changing display precision or the IME
  alert reuses the same result objects without repeating the conversion.

An indicative Node 24 measurement in the development workspace, excluding
React rendering and formatting: 5,000 area edits (24 outputs per edit) averaged
0.043 ms per edit. Repeatedly recomputing an unchanged value took 200 ms for
5,000 runs, while the session cache returned those results in 0.43 ms. These
numbers describe local calculation overhead, not a browser performance promise.

## Authoritative references

Reviewed 2026-10-13. Tables may publish rounded values; exact definitions and
integer relationships take precedence over rounded table entries.

| Registry source | Reference |
| --- | --- |
| `si` | [BIPM SI Brochure](https://www.bipm.org/en/publications/si-brochure): SI prefixes, c = 299792458 m/s, accepted time units and hectare |
| `nist` | [NIST revised conversion definitions](https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors) and [SP 811 Appendix B](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors): international lengths/areas, nautical mile and temperature |
| `nistMass` | [NBS/NIST LC 1071, high-precision conversion factors](https://nvlpubs.nist.gov/nistpubs/Legacy/LC/nbslettercircular1071.pdf), mass tables; [NIST SP 811 quantity tables](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9) for hundredweights and tons |
| `japan` | [1951 Measurement Act Enforcement Act, Articles 4–5](https://www.shugiin.go.jp/internet/itdb_housei.nsf/html/houritsu/01019510608208.htm): historical definitions of shaku, tsubo, kan and their subdivisions. [MAFF conversion table](https://www.maff.go.jp/e/data/stat/96th/attach/pdf/index-16.pdf) corroborates rounded equivalents |
| `ryo` | [Japan Search / cultural heritage record for Goto weights](https://jpsearch.go.jp/item/bunka-400118): conventional mass ryo = 10 monme; not a universal historical currency or mass value |
| `iau` | [IAU astronomical-unit definition](https://iauarchive.eso.org/public/themes/measuring/) and [NASA/JPL astronomical parameters](https://ssd.jpl.nasa.gov/astro_par.html): au = 149597870700 m; Julian year = 365.25 days |
| `duration` | Explicit application duration convention, derived from the SI second and a fixed day = 86400 s; does not assert an exact calendar month/year |
| `legacy` | Existing illustrative comparison values, preserved and visibly marked `≈`. Numerical provenance and limitations are discussed below |

Only use the Japanese historical law for its Japanese definitions. Its old
yard/pound and temperature provisions are not the modern authority for those
units. Modern international definitions come from NIST.

## Length — meters per unit

All entries here are exact definitions except the four comparisons marked `≈`.

| Unit ID | Factor in m | Definition / source |
| --- | --- | --- |
| kilo | 1000 | SI |
| meter | 1 | SI |
| centi | 0.01 | SI |
| milli | 0.001 | SI |
| inch | 0.0254 | International inch |
| feet | 0.3048 | International foot = 12 inches |
| yard | 0.9144 | 3 international feet |
| mile | 1609.344 | 5280 international feet |
| sun | 1/33 | 1/10 standard shaku |
| shaku | 10/33 | Standard Japanese shaku (曲尺) |
| ken | 20/11 | 6 shaku |
| cho | 1200/11 | 60 ken |
| ri | 43200/11 | 36 cho |
| kairi | 1852 | International nautical mile |
| fuji | ≈3776 | Approximate mountain height |
| everest | ≈8848.86 | Reported mountain snow height |
| tokyoLondon | ≈9553000 | Illustrative distance; endpoints unspecified |
| equator | ≈40075017 | Rounded equatorial circumference |
| lightSec | 299792458 | c × 1 s |
| earthOrbit | 149597870700 | Astronomical unit; corrected from 149597870000 |
| lightYear | 9460730472580800 | c × 31557600 s (Julian year) |

The `earthOrbit` ID is retained for compatibility; its displayed name is now
Astronomical Unit / 天文単位. An orbital circumference is a different quantity.

The historical U.S. survey foot is 1200/3937 m, not 0.3048 m. The application
uses international feet/miles and does not add a survey-unit selector.
Kujirajaku (鯨尺) is 25/66 m; the existing shaku field uses 10/33 m.

## Mass — kilograms per unit

The existing Weight route measures mass, not force. These are exact for the
named conventions, except the illustrative animal/person comparisons.

| Unit ID | Factor in kg | Definition |
| --- | --- | --- |
| milligram | 0.000001 | SI |
| gram | 0.001 | SI |
| kilogram | 1 | SI |
| ton | 1000 | Metric tonne |
| avoirdupoisGrain | 0.00006479891 | International pound / 7000 |
| avoirdupoisDram | 0.0017718451953125 | Pound / 256 |
| avoirdupoisOunce | 0.028349523125 | Pound / 16 |
| avoirdupoisPound | 0.45359237 | International pound |
| avoirdupoisStone | 6.35029318 | 14 pounds |
| avoirdupoisUShundredweight | 45.359237 | 100 pounds |
| avoirdupoisLonghundredweight | 50.80234544 | 112 pounds |
| avoirdupoisShortTon | 907.18474 | 2000 pounds |
| avoirdupoisLongTon | 1016.0469088 | 2240 pounds |
| troyGrain | 0.00006479891 | Same grain as avoirdupois |
| troyPennyweight | 0.00155517384 | 24 grains |
| troyOunce | 0.0311034768 | 480 grains |
| troyPound | 0.3732417216 | 5760 grains; 12 troy ounces |
| monme | 0.00375 | Kan / 1000 |
| ryo | 0.0375 | Conventional Japanese mass: 10 monme |
| kin | 0.6 | Japanese kin = 160 monme |
| kan | 3.75 | Japanese historical definition |
| sumoWrestler | ≈160 | Illustrative individual mass |
| africanElephant | ≈6000 | Illustrative adult male mass |
| blueWhale | ≈190000 | Illustrative large individual mass |

A Japanese kin is not the modern Chinese jin (500 g). Historical ryo varies;
the existing 10-monme convention is explicit rather than implying a universal
definition. Avoirdupois dram is not an apothecaries' dram (60 grains).

## Area — square meters per unit

Exact defined areas except country/planet comparisons. All customary areas use
international feet rather than U.S. survey feet.

| Unit ID | Factor in m² | Definition |
| --- | --- | --- |
| squareKiloMeter | 1000000 | SI |
| squareMeter | 1 | SI |
| squareCentiMeter | 0.0001 | SI |
| squareMilliMeter | 0.000001 | SI |
| are | 100 | Metric area convention |
| hectare | 10000 | 100 are |
| squareInch | 0.00064516 | (0.0254 m)²; corrected from 0.0006451612903 |
| squareFeet | 0.09290304 | (0.3048 m)² |
| squareYard | 0.83612736 | (0.9144 m)² |
| squarePerch | 25.29285264 | (16.5 international feet)² |
| squareMile | 2589988.110336 | (1609.344 m)² |
| acre | 4046.8564224 | 43560 international square feet |
| cho | 1200000/121 | 3000 tsubo |
| tan | 120000/121 | 300 tsubo |
| se | 12000/121 | 30 tsubo |
| tsubo | 400/121 | (6 standard shaku)² |
| gou | 40/121 | Tsubo / 10 |
| shaku | 4/121 | Tsubo / 100 (勺, not 平方尺) |
| Canada | ≈9985000000000 | Legacy rounded total area |
| Japan | ≈378000000000 | Legacy rounded total area |
| Australia | ≈7692024000000 | Legacy reported area |
| USA | ≈9834000000000 | Legacy rounded total area |
| China | ≈9597000000000 | Legacy rounded total area |
| LandOnEarth | ≈147244000000000 | Legacy illustrative land area; provenance unverified |

## Time — seconds per unit

These are fixed durations, exact **under the stated convention**.

| Unit ID | Factor in s | Convention |
| --- | --- | --- |
| milli | 0.001 | SI millisecond |
| second | 1 | SI second |
| minute | 60 | Accepted SI time unit |
| hour | 3600 | 60 minutes |
| day | 86400 | Fixed 24 hours |
| week | 604800 | 7 fixed days |
| month28 | 2419200 | Explicit 28-day month |
| month29 | 2505600 | Explicit 29-day month |
| month30 | 2592000 | Explicit 30-day month |
| month31 | 2678400 | Explicit 31-day month |
| year | 31536000 | Fixed 365 days |
| fourYears | 126144000 | Fixed 1460 days |
| decade | 315360000 | Fixed 3650 days |
| century | 3153600000 | Fixed 36500 days |

Calendar months/years need a starting date and calendar. This application does
not do date arithmetic, timezone/DST adjustment or leap-second accounting.
Four calendar years do not necessarily mean 1460 or 1461 days. The astronomical
light-year independently uses a Julian year of exactly 365.25 fixed days.

## Temperature — affine conversion

Both supported units are preserved:

- °F = (9 × °C + 160) / 5, equivalent to °C × 9/5 + 32.
- °C = (°F − 32) × 5/9.

The coefficients and offset are exact. Only the final result is rounded to the
internal precision. The existing boiling message uses the internal Celsius
result, not the formatted field. Invalid/empty input produces no verdict.
The existing 100 °C boiling threshold remains a conventional assumption.

## Comparison quantities: audit outcome

High arithmetic precision does not turn a measured/illustrative comparison
into an exact physical unit. Existing values are retained as requested, with
visible `≈` marks and explanatory tooltips:

- Fuji's rounded 3776 m height is supported by [GSI's 2024 announcement](https://www.gsi.go.jp/WNEW/PRESS-RELEASE/keikaku61003.html).
- Everest's 8848.86 m reported height is supported by [Nepal's tourism publication](https://www.tourism.gov.np/files/publication_files/337.pdf).
- Equator's value agrees to the nearest meter with 2π × 6378137 m using
  [NASA's Earth equatorial radius](https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html).
- Tokyo–London's 9553 km has no specified endpoints or geodesic model in the
  original project; it is an illustrative distance, not an audited exact route.
- Sumo's 160 kg is illustrative, not a current average: [Japan Sumo Association](https://www.sumo.or.jp/Entertainment/quiz/1322)
  reported 155.26 kg for the July 2025 makuuchi roster.
- The 6000 kg male African elephant comparison agrees with [Smithsonian](https://qrius.si.edu/taxonomy/term/12159).
- Blue whale's 190000 kg is an illustrative large individual, not a species
  average. [NOAA Fisheries](https://www.fisheries.noaa.gov/species/blue-whale)
  describes a size range rather than a universal mass.
- Canada's 9985000 km² rounds [Statistics Canada's 9984670 km²](https://www150.statcan.gc.ca/n1/pub/11-402-x/2011000/pdf/geography-geographie-eng.pdf)
  total land/freshwater area. Japan's 378000 km² is a rounded comparison,
  consistent with [Statistics Bureau's 378.0 thousand km² table](https://www.stat.go.jp/english/data/nenkan/pdf/yhyou01.pdf).
- Australia, USA and China preserve the project's comparison snapshots;
  reported areas depend on measurement date, boundaries and water inclusion.
  Relevant authorities are [Geoscience Australia](https://www.ga.gov.au/scientific-topics/national-location-information/dimensions),
  [U.S. Census Bureau](https://data.census.gov/profile/333993), and [China's NBS](https://www.stats.gov.cn/zt_18555/ztsj/hjtjzl/2008/202303/t20230302_1922341.html).
  These links are checks on the approximate scale, not claims that the legacy
  figures are their latest exact measurements.
- Earth land's 147244000 km² has no traceable source in the project. Preserve it
  only as an explicitly illustrative legacy value, not a verified global land
  measurement. Its tooltip also states that its provenance is unverified.

## Verification and runtime

`CI=true npm test -- --runInBand --watchAll=false` runs the CRA/Jest suite.
Independent fixtures cover every factor in both directions. All 1789 linear
unit pairs are checked for six inputs (zero, negative decimal, decimal with
embedded zeros, >Number's integer precision, 1e1000, 1e-1000) against a
100-digit Decimal oracle, plus round trips with a 1e-28 relative tolerance.
Additional tests cover exact relationships, calendar/definition variants,
temperature offsets (all four temperature pairs against a 1200-digit oracle),
strict validation, display precision and React edits.

`npm run lint` checks `src` and `scripts`. The unused historical prototype
`src/components/trush/zlength2.js` has an existing unused-variable warning;
it does not enter the application bundle.

`npm run build` builds production output. CRA 3/Webpack 4 uses MD4 hashes,
which fail under modern OpenSSL defaults. `scripts/react-scripts.js` enables
Node's legacy provider only for the build/start subprocess on Node ≥17.
`react-scripts` is pinned to 3.4.4, which includes webpack-dev-server 3.11.0.
The previous server (3.1.14) loaded `spdy` at module initialization, causing
`No such module: http_parser` on Node 24 even for HTTP. The
[updated server loads it only in the old-Node HTTPS branch](https://github.com/webpack/webpack-dev-server/blob/v3.11.0/lib/Server.js).
React remains 16.6.3 in the lockfile; routing, conversions, unit inventory and
the existing responsive grid remain unchanged by this tooling update.

Final validation in the workspace (Node 24.21.0):

| Check | Result |
| --- | --- |
| CRA/Jest, noninteractive | 2 suites, 195 tests passed; includes 10,734 linear pair/input comparisons and reverse checks |
| `npm run lint` | Exit 0; 0 errors, 1 existing unused-variable warning in the archived prototype |
| `npm run build` | Exit 0; production build compiled successfully with the compatibility wrapper |
| `npm start` (browser opening disabled, test port 3100) | Development compilation succeeded; `/length` and the runtime/application JavaScript returned HTTP 200; server stopped after verification |
| Git whitespace check with CRLF recognized | Passed |

The existing toolchain reports Node deprecation notices. These do not prevent
the tests, development server or production build.
