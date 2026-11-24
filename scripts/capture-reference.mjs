import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import { existsSync } from "node:fs"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const require = createRequire(import.meta.url)
const runtimeModules = path.resolve(path.dirname(process.execPath), "../node_modules")
const requirePackage = name => require(require.resolve(name, { paths: [root, runtimeModules] }))
const { chromium } = (() => {
  try { return requirePackage("@playwright/test") }
  catch { return requirePackage("playwright") }
})()
const output = path.join(root, "docs/reference")
const base = "https://fuel.framer.website"
const sizes = [[1440, 900], [768, 1024], [390, 844], [834, 1112]]
const localChrome = process.env.ProgramFiles && path.join(process.env.ProgramFiles, "Google/Chrome/Application/chrome.exe")
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (localChrome && existsSync(localChrome) ? localChrome : undefined)
const browser = await chromium.launch({ executablePath, headless: true })
const routeKey = route => route.split("/").filter(Boolean).join("-") || "home"
await fs.mkdir(output, { recursive: true })
const measurements = []
const errors = []

// Visible Framer variants are singled out because the source also keeps
// inactive breakpoint copies in the HTML.
async function measure(page) {
  return page.evaluate(() => {
    const visible = element => element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0
    const rows = elements => [...elements].filter(visible).map(element => {
      const { x, y, width, height } = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      return {
        name: element.getAttribute("data-framer-name") || element.tagName.toLowerCase(),
        x: Math.round(x), y: Math.round(y + scrollY), w: Math.round(width), h: Math.round(height),
        background: style.backgroundColor, position: style.position
      }
    })
    const titles = [...document.querySelectorAll("h1,h2,h3,h4,p")].filter(visible)
    const styles = new Map()
    for (const element of titles) {
      const style = getComputedStyle(element)
      const key = [style.fontFamily, style.fontSize, style.lineHeight, style.fontWeight, style.fontVariationSettings, style.letterSpacing, style.textTransform].join(" | ")
      styles.set(key, (styles.get(key) || 0) + 1)
    }
    const hero = document.querySelector('[data-framer-name="Hero"]')
    const selectors = ["Top", "Bottom", "Logo", "Place Your Logo Here", "Mobile Menu Icon", "All Active", "BG Image", "Year Details"]
    const parts = hero ? hero.querySelectorAll(selectors.map(name => '[data-framer-name="' + name + '"]').join(",")) : []
    const images = [...(hero?.querySelectorAll("img") || [])].filter(visible).slice(0, 6).map(image => {
      const style = getComputedStyle(image)
      return { description: image.alt, fit: style.objectFit, position: style.objectPosition, loaded: image.complete && image.naturalWidth > 0 }
    })
    const sections = [...document.querySelectorAll("section, header, footer")].filter(el => !el.closest("section section") && el.getAttribute("data-framer-name") !== "Overlap Detailing")
    return {
      documentHeight: document.documentElement.scrollHeight, scrollWidth: document.documentElement.scrollWidth,
      structure: rows(sections), hero: rows(parts), images,
      typography: Object.fromEntries([...styles].sort((a, b) => b[1] - a[1]).slice(0, 12))
    }
  })
}

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(output, name + ".jpg"), type: "jpeg", quality: 72, timeout: 45000 })
}
async function settle(page, delay = 500) {
  await page.evaluate(async () => {
    await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 2400))])
    const onscreen = [...document.images].filter(img => {
      const r = img.getBoundingClientRect()
      return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0
    })
    await Promise.race([Promise.all(onscreen.map(img => img.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 2600))])
  })
  await page.waitForTimeout(delay)
}
async function sectionScreenshot(page, key, name, locator) {
  const el = locator.first()
  if (!await el.count()) return
  await el.evaluate(e => window.scrollTo({ top: scrollY + e.getBoundingClientRect().top, behavior: "instant" }))
  await settle(page, 550)
  await screenshot(page, key + "--" + name)
}

async function capture(route, [width, height]) {
  const key = routeKey(route) + "--" + width
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  try {
    const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 })
    await settle(page, route === "/" ? 5200 : 1650)
    measurements.push({ route, width, height, status: response.status(), ...await measure(page) })
    await screenshot(page, key)
    if (route === "/" && [1440, 390, 768].includes(width)) {
      if (width !== 1440) {
        const button = page.locator('[data-framer-name="Mobile Menu Icon"]:visible').first()
        await button.click({ timeout: 4500 })
        await settle(page, 700)
        await screenshot(page, key + "--menu")
        await page.reload({ waitUntil: "domcontentloaded" })
        await settle(page, 1200)
      }
      for (const name of ["About", "Portfolio", "Services", "Pricing", "Testimonial", "Archive", "Stats"]) {
        await sectionScreenshot(page, key, name.toLowerCase(), page.locator('section[data-framer-name="' + name + '"]:visible'))
      }
      await sectionScreenshot(page, key, "faq", page.locator('[data-framer-name="Question"]:visible').first().locator("xpath=ancestor::section[1]"))
      await sectionScreenshot(page, key, "footer", page.locator("footer:visible"))
    }
    if (width === 1440 && ["/about", "/contact", "/work/portfolio", "/work/portfolio/vellfire-calibration", "/blog/velocity-becomes"].includes(route)) {
      const sections = page.locator("section:visible").filter({ hasNot: page.locator("header") })
      const major = page.locator('section:is([data-framer-name="About"],[data-framer-name="Work"],[data-framer-name="Content"]):visible').first()
      if (await major.count()) await sectionScreenshot(page, key, "content", major)
      else if (await sections.count()) await sectionScreenshot(page, key, "faq", sections)
    }
    console.log(key, response.status())
  } catch (error) {
    errors.push({ key, error: error.message })
    console.error(key, error.message)
  } finally { await page.close() }
}

try {
  const sitemap = await fetch(base + "/sitemap.xml").then(response => response.text())
  const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
  if (!routes.length) throw new Error("The reference sitemap did not contain any routes")
  const existing = process.argv.includes("--repair") && existsSync(path.join(output, "measurements.json"))
    ? JSON.parse(await fs.readFile(path.join(output, "measurements.json"), "utf8")).measurements : []
  const queue = []
  for (const size of sizes) {
    for (const route of routes) {
      if (size[0] === 834 && route !== "/") continue
      const row = existing.find(item => item.route === route && item.width === size[0])
      const imagePath = path.join(output, routeKey(route) + "--" + size[0] + ".jpg")
      if (row && existsSync(imagePath)) measurements.push(row)
      else queue.push([route, size])
    }
  }
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const [route, size] = queue.shift()
      await capture(route, size)
    }
  }))
  measurements.sort((a, b) => a.route.localeCompare(b.route) || b.width - a.width)
  await fs.writeFile(path.join(output, "measurements.json"), JSON.stringify({ source: base, capturedAt: new Date().toISOString(), measurements, errors }, null, 2))
  await captureAppearData(routes)
  await captureInteractions()
  if (errors.length) process.exitCode = 1
} finally { await browser.close() }

async function captureAppearData(routes) {
  const animations = {}
  for (const route of routes) {
    const html = await fetch(base + route).then(response => response.text())
    const json = html.match(/<script[^>]+type="framer\/appear"[^>]*>([\s\S]*?)<\/script>/)?.[1]
    if (!json) continue
    animations[route] = []
    for (const [id, variants] of Object.entries(JSON.parse(json))) {
      const tag = html.match(new RegExp('<[^>]+data-framer-appear-id="' + id + '"[^>]*>'))?.[0] || ""
      const names = Object.entries(variants).map(([variant, spec]) => {
        const adjusted = Object.fromEntries(Object.entries(spec.initial || {}).filter(([key, value]) => {
          const rest = key === "opacity" || key === "scale" ? 1 : 0
          return value !== rest
        }))
        return { variant, from: adjusted, transition: spec.animate?.transition }
      })
      animations[route].push({ id, name: tag.match(/data-framer-name="([^"]+)"/)?.[1] || null, variants: names })
    }
  }
  await fs.writeFile(path.join(output, "appear-motion.json"), JSON.stringify(animations, null, 2))
}

async function captureInteractions() {
  const eventLog = []
  for (const [width, height] of sizes) {
    const key = "home--" + width
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    await page.goto(base, { waitUntil: "domcontentloaded" })
    await settle(page, 5200)
    await screenshot(page, key)
    const snapshot = async (label, selector) => {
      const items = await page.evaluate(sel => [...document.querySelectorAll(sel)].filter(el => el.offsetWidth && el.getBoundingClientRect().height).slice(0, 15).map(el => {
        const r = el.getBoundingClientRect(), s = getComputedStyle(el)
        return { name: el.getAttribute("data-framer-name"), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), opacity: s.opacity, transform: s.transform, background: s.backgroundColor }
      }), selector)
      eventLog.push({ label, width, url: new URL(page.url()).pathname, items })
    }
    if (width < 810) {
      const menu = page.locator('[data-framer-name="Mobile Menu Icon"]:visible').first()
      await menu.click()
      await page.waitForTimeout(110)
      await screenshot(page, key + "--menu-enter")
      await page.waitForTimeout(550)
      await screenshot(page, key + "--menu")
      await snapshot("mobile menu fully open", "header,[data-framer-name*='Menu Item']")
    } else if (width === 1440) {
      const link = page.locator('nav a[data-framer-name="Menu Item"]:visible').nth(1)
      await link.hover()
      await page.waitForTimeout(300)
      await screenshot(page, key + "--nav-hover")
      await snapshot("portfolio nav hover", "nav [data-framer-name='Line']")
      const faq = page.locator('[data-framer-name="Question"]:visible').first()
      await faq.scrollIntoViewIfNeeded()
      await page.waitForTimeout(400)
      await snapshot("FAQ initial", "[data-framer-name='Closed']")
      await faq.click()
      await page.waitForTimeout(650)
      await screenshot(page, key + "--faq-open")
      await snapshot("FAQ open", "[data-framer-name='Open'],[data-framer-name='Answer']")
      const archive = page.locator('section[data-framer-name="Archive"] [data-framer-name="XL Primary"]:visible').first()
      if (await archive.count()) {
        await archive.scrollIntoViewIfNeeded()
        await archive.hover()
        await page.waitForTimeout(300)
        await screenshot(page, key + "--archive-hover")
        await snapshot("archive hover", "section[data-framer-name='Archive'] [data-framer-name^='XL']")
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }))
      await page.waitForTimeout(500)
      await Promise.all([page.waitForURL("**/work/portfolio"), link.click()])
      await screenshot(page, "route-home-to-portfolio--early")
      await page.waitForTimeout(800)
      await screenshot(page, "route-home-to-portfolio--settled")
    }
    await page.close()
  }
  await fs.writeFile(path.join(output, "interactions.json"), JSON.stringify(eventLog, null, 2))
}

