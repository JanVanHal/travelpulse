# TravelPulse — Build Brief

## Goal
TravelPulse is a plain-language, visitor-first guide to staying connected while travelling: local SIMs, eSIMs, roaming, wifi and staying safe online. Thailand is the first destination and gets the full treatment. Build the site so more countries can be added later without restructuring it. The eSIM content is the main funnel for eSIM affiliate programs (links come later). The site also points readers to VPNPulse and NetPulse.

Static site on Cloudflare Pages (project `travelpulse`, https://travelpulse.pages.dev). Hosting is set up separately, so don't add hosting config. There's no custom domain yet, so use `https://travelpulse.pages.dev` as the base URL in the sitemap and canonical tags.

## Reference repos (read-only: clone to a temp dir and do NOT modify or push)
- https://github.com/JanVanHal/netpulse: the style master.
- https://github.com/JanVanHal/vpnpulse: a sister site already built from the same pattern. Follow its structure.
- https://github.com/JanVanHal/internet-from-thailand: an older Thailand toolbox for expats (speed, DNS, site check, timezones). Use it only as background on the audience. Don't copy its styles or tools.

## Style (same as the other Pulse sites)
- Copy NetPulse `styles.css` **unchanged** (byte-identical). If TravelPulse needs its own styles, put them in a separate `travelpulse.css`.
- Use the same layout: a header with a mobile nav toggle, the footer, tool/info cards, the blog list and post layout, and the legal pages. Use the same fonts (Inter + Source Serif 4).
- Logo: `img/travelpulse-icon.svg`, a simple SVG in the NetPulse logo style (for example a globe or plane with a pulse line) next to the "TravelPulse" wordmark. Use it as the favicon and in the header and footer.
- Put the same AdSense head script on **every** page:
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5573618445420036" crossorigin="anonymous"></script>`
- Put `ads.txt` at the root with exactly this content: `google.com, pub-5573618445420036, DIRECT, f08c47fec0942fa0`
- Don't add fake ad slot IDs or empty ad boxes.

## Structure (multi-destination ready)
```
index.html                    Home
esim.html                     eSIM guide (main funnel page)
roaming.html                  Roaming and bill shock warning
wifi-and-vpn.html             Public/hotel wifi safety + VPN
destinations.html             Destination index (Thailand now, others "coming soon")
destinations/thailand.html    Full Thailand guide
blog.html + blog/*.html       Guides
about.html contact.html privacy.html terms.html dmca.html affiliate-disclosure.html 404.html
sitemap.xml robots.txt ads.txt img/
```
Each destination page uses the same section layout (Quick answer → Options compared → Local SIM → Tourist SIM → eSIM → Wifi → Practical tips → VPN → Check before you go). A new country is then just a copy of the template. Add a short HTML comment at the top of `destinations/thailand.html` explaining how to add a country. Pages in subfolders use `../` relative links.

## Page content
1. **index.html**: Hero ("Stay connected abroad without the bill shock"). Show cards for eSIM, Roaming warning, Wifi and VPN, and Destinations (Thailand). Add a short "Our quick recommendation" box: get an eSIM before you fly, and keep home roaming off.
2. **roaming.html**: A clear warning about home-carrier roaming plans and daily "travel passes" used abroad.
   - Explain how bill shock happens: data roaming left on, background app updates and photo/cloud backups, auto-play video, passes charged per day even for light use, out-of-bundle rates once a pass runs out, calls or voicemail forwarding charged while abroad, and plane/ship networks.
   - Explain how to avoid it: turn data roaming off, set your home line to calls/SMS only or make it secondary, use Low Data Mode, set spending caps with your carrier, and check your carrier's current rates before you leave.
   - Don't quote any specific carrier prices.
3. **esim.html** (funnel): What an eSIM is, phone compatibility (how to check: carrier-unlocked, settings path for iPhone and Android, `*#06#` EID), and how to install it before departure and activate it on arrival. Cover data-only vs. a plan with a local number, keeping your home SIM for 2FA SMS, and the pros and cons vs. a local SIM.
   - Provider cards for Airalo, Holafly, Nomad and Saily. Use only facts the providers publish themselves (for example coverage of regional/global plans, or whether unlimited plans exist). Add a note: "Plans and prices change. Check the provider's site for current details."
   - Button format: `<a href="https://<provider homepage>/" data-affiliate="TODO" rel="nofollow noopener sponsored">See Thailand plans at …</a>`. Use the plain homepage only and never invent affiliate URLs.
   - Put a one-line affiliate disclosure next to the buttons, linking to `affiliate-disclosure.html`.
   - Add a CTA block that can be reused on the Thailand page and in the blog posts.
4. **destinations/thailand.html** (the full guide):
   - Quick answer: an eSIM bought before you leave, or a tourist SIM at the airport. Never default roaming.
   - Networks: AIS, TrueMove H and dtac. Mention that True and dtac merged (2023), that both brands still exist, and that coverage differs by region and islands, so readers should check each operator's coverage map.
   - Where to buy: airport counters on arrival (BKK, DMK, HKT, CNX etc.), operator shops, and 7-Eleven/convenience stores. Mention the passport requirement for SIM registration and that it's a legal requirement.
   - Tourist SIMs: what they usually include and their validity periods. Don't give prices. Say "check the operator's current tourist SIM page" and link to the official AIS/TrueMove H/dtac sites. Any figure that is included must be marked "as of <month year>" with a source link.
   - Topping up, and checking your balance with USSD codes (only if verifiable on official sites, otherwise say "check with the operator").
   - Wifi: hotels, cafés, malls and airport wifi, and the risks. Link to wifi-and-vpn.html and VPNPulse.
   - Practical tips: download offline maps, the LINE app is widely used, bring a phone that's carrier-unlocked, keep your home number for bank OTPs, carry a power bank, and check coverage before island trips.
   - Speed check: "Test your connection with NetPulse" → https://netpulse.site
   - Add the eSIM CTA block plus the disclosure.
5. **wifi-and-vpn.html**: The risks of public and hotel wifi (open networks, fake hotspots, captive portals), with simple habits (HTTPS, forget networks, avoid banking on open wifi or use a VPN). Explain why a VPN helps and what it doesn't do (honest limits). Add a prominent link: "Learn how to choose a VPN at VPNPulse" → https://vpnpulse.site
6. **destinations.html**: A card for Thailand, plus a "More destinations coming soon" note. Don't add placeholder country pages.
7. **blog.html** + 4 guides:
   - `blog/esim-vs-local-sim-thailand.html`
   - `blog/avoid-roaming-bill-shock.html`
   - `blog/set-up-esim-before-you-fly.html`
   - `blog/staying-safe-on-hotel-wifi.html` (links to VPNPulse)
   Each guide ends with a relevant CTA (eSIM block or VPNPulse link).
8. **Legal and meta pages**:
   - `about.html` (a sister site to NetPulse and VPNPulse) and `contact.html` (use contact@netpulse.site for now).
   - `privacy.html`: cover Google AdSense cookies and third-party ad vendors, and link to Google's ad settings.
   - `terms.html`, `dmca.html` and `affiliate-disclosure.html`.
   - `404.html`.

On every page:
- A unique `<title>`, a meta description and a canonical tag.
- A one-line affiliate disclosure near any provider button.
- Footer links to every legal page.
- The footer line "A Pulse site: NetPulse · VPNPulse" linking to https://netpulse.site and https://vpnpulse.site.

Add `sitemap.xml` and `robots.txt` with the base URL https://travelpulse.pages.dev and a sitemap reference.

## Accuracy rules
- No made-up prices, data allowances or rates. Where something changes often, tell readers to check the current price, or mark the figure "as of <month year>" with a source link.
- No fake statistics, reviews, star ratings, scores, testimonials, "best eSIM" winners, or visitor numbers.
- Don't show commission, payout or earnings talk to visitors.
- No AI likenesses of real people (no fake team photos).

## Tech
- Write in English.
- Mobile-first and accessible: semantic HTML, alt text, good contrast, keyboard navigation.
- Vanilla HTML/CSS/JS, no build step, no npm, no frameworks.
- Relative internal links.

## Must not do
- Don't touch the NetPulse, VPNPulse or internet-from-thailand repos.
- Don't add hosting config.
- Don't use real affiliate links (keep them as `data-affiliate="TODO"`).

## Done when
- All the pages above exist and every internal link works.
- `styles.css` is byte-identical to NetPulse's.
- The AdSense script is on every page and `ads.txt` is present.
- Everything is committed and pushed to `main`, ideally in one push (each push to main counts as one Cloudflare deploy).

## Fix list
- [ ] (empty: the reviewer adds items here)
