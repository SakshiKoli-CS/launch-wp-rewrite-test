# Contentstack Launch & WordPress Proxy Test

## 📝 Context: The "Domain Leak" Problem
When putting a modern frontend (Contentstack Launch) in front of a WordPress backend using rewrite rules, a common issue occurs: **Domain Leaking**.

1. A user visits a page served by WordPress through the Launch proxy (e.g., `/about`).
2. WordPress generates the HTML for this page. Because WordPress thinks its home is `https://sbayfc.wpengine.com`, it generates absolute URLs for all navigation links (e.g., `<a href="https://sbayfc.wpengine.com/tickets">Tickets</a>`).
3. When the user clicks that link, they are taken directly to the WP Engine domain, completely leaving the Contentstack Launch site.

## 🛠️ The Solution: Edge Function HTML Rewriting
To fix this without modifying WordPress code, we use a **Contentstack Launch Edge Function** (`functions/[proxy].edge.js`). 

This Edge Function sits between WordPress and the user's browser:
1. It lets static assets (images, JS, CSS) pass through normally.
2. When WordPress returns a web page (`text/html`), the Edge Function intercepts the HTML text.
3. It performs a simple Find & Replace: changing all instances of `https://sbayfc.wpengine.com` to the current Launch domain (`https://my.domain.contentstackapps.com`).
4. It sends the corrected HTML to the browser.

Now, all links point back to Launch, keeping the user on the correct domain!

## 📂 Project Structure
* `.cs-launch.json`: Contains the rewrite rules routing traffic to WP Engine, except for specific Launch pages (`/`, `/tickets`).
* `functions/[proxy].edge.js`: The Edge Function that intercepts and rewrites the HTML.
* `index.html`: Mock Launch Home Page.
* `tickets/index.html`: Mock Launch Tickets Page.

## 🧪 How to Test and Evaluate
To verify this solution works:

1. **Deploy** this project to Contentstack Launch.
2. **Visit the Home Page** (`/`) on your Launch domain. You should see the local `index.html`.
3. **Visit a WordPress Page** (e.g., `/about` or any known WP URL). The rewrite rule will fetch it from WP Engine.
4. **Inspect the Links:** Hover over the navigation links on that WordPress page. Notice that they point to your **Launch domain**, NOT `sbayfc.wpengine.com`.
5. **Click a Link:** Click the "Tickets" link from the WordPress menu. You should be successfully routed to your Launch `/tickets` page, and the URL bar should remain on your Launch domain.
