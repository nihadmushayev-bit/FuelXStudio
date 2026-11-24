# FUEL reference audit

Measured on 24 November 2026 in Chromium, with device scale factor 1 and the reference’s default motion settings. The capture visits all thirteen sitemap routes at 1440 × 900, 768 × 1024 and 390 × 844, with an additional 834 × 1112 homepage capture. The 404 page returned HTTP 404. Every other reference route returned HTTP 200. [Reference homepage](https://fuel.framer.website/) · [Sitemap](https://fuel.framer.website/sitemap.xml)

## Evidence and reproduction

- [Raw DOM measurements](reference/measurements.json) contain the route, viewport, section bounds, hero image crops and type measurements for 40 visits. [Section styles](reference/sections.json) include padding, spacing and variable-font axes. Heights below the fold can change as the original lazy content hydrates.
- [Published entrance animation values](reference/appear-motion.json) are extracted from the reference’s public Framer appear definitions. [Interaction states](reference/interactions.json) and [browser frame samples](reference/interaction-timing.json) document browser observations. Frame timing is sensitive to load.
- [Desktop](reference/home--1440.jpg), [tablet](reference/home--768.jpg), [mobile](reference/home--390.jpg) and [834px tablet](reference/home--834.jpg) are settled homepage screenshots. Section, menu and hover captures are alongside them in the same directory. Each other route has a first-viewport screenshot at the three required sizes. These screenshots are comparison evidence.
- Run `node scripts/capture-reference.mjs` with Playwright and a Chromium installation to refresh the set. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to choose a browser. `--repair` fills missing route captures and refreshes interaction evidence. The first viewport needs time for the source’s canvas layer and entry animations to settle.

## Responsive composition

The emitted CSS changes at 810px and 1200px. The 768px test therefore uses the phone composition. At 834px the tablet also has a compact menu but its wordmark and metadata share a row. At 390px and 768px the metadata sits underneath the full-width wordmark. The page draws full-bleed imagery; inside content is generally inset 24px. [Measured breakpoints and hero bounds](reference/measurements.json)

| Initial homepage region | 1440 × 900 | 768 × 1024 | 390 × 844 |
| --- | --- | --- | --- |
| Hero | Full viewport | Full viewport | Full viewport |
| Header | x24 y24, 1392 × 70 | Logo/menu row x24 y24, 720 × 24 | Logo/menu row x24 y24, 342 × 24 |
| Intro region | x24 y193, 249 × 132 | x24 y307, 720 × 132 | x24 y247, 342 × 132 |
| Lower composition | x24 y584, 1392 × 292 | x24 y653, 720 × 347 | x24 y532, 342 × 288 |
| Main wordmark | x372 y712, 1044 × 164 | x24 y811, 720 × 113 | x24 y690, 342 × 54 |

The source header is embedded in the opening composition. On desktop the four numbered links occupy a central 493 × 19px band. The source balances the mark at left with a 306 × 70px off-white panel at right. At 390px the closed header is 72px tall. The menu expands to approximately 373px from the top edge. A cross closes the panel, while the four links occupy separate hairline-divided rows. The photograph remains visible beneath it. [Mobile menu](reference/home--390--menu.jpg)

## Typography and surfaces

The dominant face is BDO Grotesk Variable. Its nominal computed weight of 1000 is overridden by an explicit `"wght" 500` axis for the visible headings, body and nav labels. Superscript navigation counters use axis 600. Inter appears in the reference’s font declarations. [Measured font axes](reference/sections.json) · [BDO Grotesk source](https://github.com/LCTipografi/BDO-Grotesk)

| Role | Desktop size / leading | Tracking |
| --- | --- | --- |
| Large portfolio and project hero titles | 100 / 100px | −3px |
| Contact headline and project intro | 70 / 70px | −2.1px |
| Footer contact headline and medium headings | 56 / 56px | −1.7px |
| Intro and CTA | 16 / 20.2px | −0.5px |
| Section labels, navigation, supporting copy | 12 / 16.2px | −0.5px |
| Navigation numbers | 10 / 11.2px | Normal |

The phone layout uses 40 / 40px and 30 / 30px editorial scales. Primary planes are white, black and charcoal `#111`, with `#f7f7f7` panels, black or white translucent hairlines, and pale `#d1e1e8` registration marks. The orange, red and icy blue backgrounds of editorial photos supply most of the color. [Homepage](reference/home--1440.jpg) · [About](reference/about--1440.jpg) · [Services section](reference/home--1440--services.jpg)

## Page and section behavior

| Reference composition | Observed structure |
| --- | --- |
| [Home](reference/home--1440.jpg) | Sticky, full-height hero. Intro and underlined CTA at upper left. Three stacked disciplines, four alternating cross marks, year and tick marks. Oversize gradient wordmark at the lower right on desktop. The following white section overlaps the hero during scrolling. |
| [About introduction](reference/home--1440--about.jpg) | Numbered full-width ribbon, oversized paragraph with a pronounced first-line indent, then editorial photography on the left and structured text columns on the right. A horizontal image strip separates it from selected work. |
| [Selected work](reference/home--1440--portfolio.jpg) | Sticky side annotations flank an approximately 800px central series of overlapping project covers. A 24px card separation and 80px top-to-body gap set the desktop rhythm. Mobile places the content in one column. |
| [Services](reference/home--1440--services.jpg) | Dark section with light text, compact portrait image adjoining its statement, a line-arrow CTA, and numbered image-and-text rows. Desktop padding is 24px at top and sides and 160px below. |
| [Pricing position](reference/home--1440--pricing.jpg) | Light cards and numbered ribbon. Use the approved five-step process here. The reference uses 60px between ribbon and content and 120px bottom padding on desktop. Cards stack on mobile. |
| [Client experience](reference/home--1440--testimonial.jpg) and [archive](reference/home--1440--archive-hover.jpg) | Spacious editorial statements precede fine-rule archive rows. Archive rows distribute dates, titles and small image previews across the width. Use studio principles and populated project records. |
| [Capabilities](reference/home--1440--stats.jpg) and insights | Oversized type is arranged in a desktop grid. Numbered article cards follow. Approved capability statements and the publication state determine the studio adaptation. |
| [FAQ](reference/home--1440--faq-open.jpg) and [footer](reference/home--1440--footer.jpg) | Desktop FAQ has a heading/media column at left and an accordion column at right. Opening a row reveals supporting text and changes plus to minus. Footer uses a charcoal plane, large two-line contact text, right-hand numbered navigation, registration marks and a large wordmark. Mobile stacks content and ends with the full-width mark. |
| [Portfolio index](reference/work-portfolio--1440.jpg) | Full-viewport, edge-to-edge photo; two stacked 100px lines at lower left. Small count sits by the first line, supporting copy near center-right, year at far right. A two-column work grid and FAQ follow. |
| [About](reference/about--1440.jpg) | Full-height zoomed image with a sharper 924 × 520px inset at x258 y164. Centered heading, cross marks, and a compact caption row immediately below. The process, people, awards, clients and stats sections give the structure for the approved studio content. The inset survives on phone. |
| [Contact](reference/contact--1440.jpg) | Charcoal page with tall orange editorial portrait on left and a form on right, beginning with 70px type at x725 y214. First name/last name and category/email pair on desktop. Mobile shows a single-column form and omits this large portrait. |
| [Project detail](reference/work-portfolio-vellfire-calibration--1440.jpg) | Full-height project photo, centered large title, small edge-aligned metadata. Followed by a numbered editorial introduction, research/results, gallery, related work and FAQ. All four project slugs share this layout. |
| [Article detail](reference/blog-velocity-becomes--1440.jpg) | Dark opening plane, wide inset photograph, centered category/title/description, bottom metadata. Below are numbered text and image blocks, more articles and FAQ. All four article slugs share the template. |
| [404](reference/404--1440.jpg) | Charcoal backdrop with a framed, centered orange portrait, oversized error title, hairline return link, edge marks and a caption row. |

The sitemap includes the root, About, Contact, portfolio index, 404, projects `vellfire-calibration`, `dunwill-lanson`, `noara-willis`, `nike-studios`, and articles `velocity-becomes`, `way-to-clearance`, `all-grapples`, `flowers-love`. Services is a homepage section in the source. The requested standalone Services page should extend its visual system. [Reference sitemap](https://fuel.framer.website/sitemap.xml)

## Motion specifications

| Element | Measured entrance |
| --- | --- |
| Homepage background | Opacity 0.001 → 1 and scale 1.2 → 1 over 1s, cubic Bézier (0.44, 0, 0.56, 1). |
| Header | Translate Y −100px → 0 with spring stiffness 300, damping 60, mass 1. Delay 0.3s. |
| Four navigation links | Translate Y −10px → 0 with opacity over 0.5s. Delays 0.4s, 0.5s, 0.6s, 0.7s. Cubic Bézier (0.44, 0, 0.34, 0.98). |
| Three intro lines | Translate Y +10px → 0 with opacity using the same 0.5s tween. Delays 0.4s, 0.6s, 0.8s. |
| Three disciplines | Translate Y +10px, +8px, +6px → 0 over 0.5s with delays 0.9s, 1.1s, 1.3s. Cubic Bézier (0.76, 0.02, 0.13, 1.01). |
| Large wordmark | Translate Y +170px → 0 with opacity, same spring, delay 0.1s. |
| Four registration marks | Alternate −100px and +100px Y → 0. Same spring, delay 0.8s. |
| About, project and article hero group | Translate Y +70px → 0 with opacity. Same spring, delay 0.1s. |
| Portfolio content plane | Translate Y +20px → 0 over 0.7s, cubic Bézier (0.44, 0, 0.56, 1). |
| Contact fields | Translate Y +20px → 0 with opacity and spring. The source sequences fields at 0.1s intervals. |

Desktop navigation hovers extend a 1px underline horizontally under the word. On Portfolio its resting 1px width extends to about 47.6px, with its left edge anchored. The desktop CTA uses a clipped arrow pair. Mobile menu height and FAQ row height interpolate between content states. The reference applies character-level color progression on large statements, and clips image motion within stable cover containers. Captures document [nav hover](reference/home--1440--nav-hover.jpg), [menu entrance](reference/home--390--menu-enter.jpg), and the [early](reference/route-home-to-portfolio--early.jpg) and [settled](reference/route-home-to-portfolio--settled.jpg) homepage-to-portfolio navigation. Exact runtime easing for the FAQ and archive hover was not exposed in the published entrance definitions.

## Business adaptations in comparison

Check geometry, placement, typography, hierarchy and timing against the screenshots. The studio version uses approved marks, licensed alternative photographs, three languages, two text-only founder profiles, five service categories, a five-step process, editorial client principles and publishable work records. Distinct image pixels, copy wrapping and section heights follow from those changes. Unpublished articles, draft work and showreel controls have no public counterparts. No reference screenshot or borrowed photograph belongs in the public application asset bundle.

