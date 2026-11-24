# Asset sources and use

## Current website imagery

The current website uses `public/assets/work/studio-digital.jpg`, generated with OpenAI ImageGen from the prompt “A premium digital product studio monitor showing abstract web design interfaces, UI cards and code, cyan and orange lighting, without people or logos.” It also uses dashboard photographs by [Stephen Dawson](https://unsplash.com/photos/turned-on-monitoring-screen-qwtCeJ5cLYs) and [1981 Digital](https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-data-on-it-bf9sZBcGQl4), under the [Unsplash License](https://unsplash.com/license). These are illustrative visuals, not client projects. The historical Pexels assets described below have been removed from the website.

## Brand originals

The studio approved the two files below from its Downloads folder. The private source copies in `originals/brand/` retain their original names and bytes.

| Original | Dimensions | Web assets |
| --- | --- | --- |
| `FUEL_Nav_White_8K.png` | 7680 × 1450 RGBA | `/assets/brand/fuel-nav-white.png`, 480px wide |
| `FuelX Logo.avif` | 4260 × 668 with alpha | `/assets/brand/fuel-x-logo.webp`, 2000px wide, and `fuel-x-logo-small.webp`, 768px wide |

The navigation uses the white mark. The hero and footer use the gradient mark. Both have transparent backgrounds and preserve their original aspect ratios.

## Type

- **BDO Grotesk Variable** supplies the primary typeface. The local WOFF2 derives from the foundry's variable TrueType file. It retains the original outlines and weight axis from 300 through 900. The font's character map was checked against the Azerbaijani and Bosnian characters specified in the brief, including Ə, ə, İ, ı, Đ, đ, Ć and ć. The license travels with the font in `public/assets/fonts/BDO-OFL.txt`. [Lokal Container project and license](https://github.com/LCTipografi/BDO-Grotesk)
- **Inter** is supplied as an extended-Latin variable fallback for the CSS font stack. The local file covers weights from 100 through 900. Its license is in `public/assets/fonts/Inter-OFL.txt`. [Inter project](https://github.com/rsms/inter) · [Google Fonts distribution](https://fonts.google.com/specimen/Inter)

## Editorial photography

These local WebP derivatives are licensed for commercial website use under the Pexels License. Each row links to the photographer's individual free-photo listing. The site uses the people and settings as editorial imagery. Founder profiles and client case studies have separate content and asset fields. [Pexels License](https://www.pexels.com/license/)

| Local file in `public/assets/editorial/` | Composition | Source and photographer |
| --- | --- | --- |
| `hero.webp` | Backlit profile against burnt orange | [Phuc Lai on Pexels](https://www.pexels.com/photo/a-woman-on-an-orange-background-20788953/) |
| `about.webp` | Motion-blurred figure on muted gray | [charry jin on Pexels](https://www.pexels.com/photo/blurred-woman-in-black-clothes-19130743/) |
| `portfolio.webp` | Face seen through green foliage and white flowers | [Airam Dato-on on Pexels](https://www.pexels.com/photo/the-face-of-a-woman-behind-small-white-flowers-and-dark-green-leaves-9727841/) |
| `contact.webp` | Beige suit against an orange studio backdrop | [Mahmood Alhussein on Pexels](https://www.pexels.com/photo/stylish-man-in-beige-suit-against-orange-backdrop-34116217/) |
| `studio.webp` | Full-length pose on a red backdrop | [YOUSSEF elbelghiti on Pexels](https://www.pexels.com/photo/stylish-woman-posing-in-black-outfit-against-red-background-30877935/) |
| `service-1.webp` | Black lace and a sandy shoreline | [Marcus Queiroga Silva on Pexels](https://www.pexels.com/photo/model-in-black-dress-on-beach-19041839/) |
| `service-2.webp` | Red staircase by the sea | [Zura Modebadze on Pexels](https://www.pexels.com/photo/a-woman-looking-over-her-shoulder-4763439/) |
| `service-3.webp` | Rock, sand, and muted green fabric | [Yan Krukau on Pexels](https://www.pexels.com/photo/graceful-female-model-near-rough-rock-on-sandy-beach-4496980/) |
| `service-4.webp` | Diagonal stair and its shadow | [Jan van der Wolf on Pexels](https://www.pexels.com/photo/modern-architectural-staircase-with-shadows-31344071/) |
| `service-5.webp` | Athlete at the starting line | [Andrius Šimkus on Pexels](https://www.pexels.com/photo/woman-getting-ready-to-run-8820688/) |
| `promo.webp` | Dark figure in a circular pool of orange light | [Daniil Kondrashin on Pexels](https://www.pexels.com/photo/artistic-portrait-in-dramatic-lighting-36991326/) |
| `footer.webp` | Dark studio portrait framed by curly hair | [Jamaal Hutchinson on Pexels](https://www.pexels.com/photo/a-woman-with-curly-hair-and-a-black-background-18563167/) |

The hero and About and Portfolio opening images have landscape crops chosen for their responsive framing. Other derivatives preserve the source aspect ratio for the individual CSS frames. Each locally optimized file is self-hosted. Reference-site photography is used only in the reference audit evidence.

