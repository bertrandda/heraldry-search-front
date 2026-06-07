#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Post-build optimization in progress...')

const buildDir = path.join(__dirname, '..', 'build')

// Function to add preload attribute to critical CSS files
function optimizeIndex() {
  const indexPath = path.join(buildDir, 'index.html')

  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html not found')
    return
  }

  let html = fs.readFileSync(indexPath, 'utf8')

  // Matches <link rel="stylesheet" [crossorigin] href="..."> in any attribute order (Vite output)
  html = html.replace(
    /<link ([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*\.css)"([^>]*)>/g,
    (_, before, between, href, after) => {
      const crossorigin = (before + between + after).includes('crossorigin') ? ' crossorigin' : ''
      return `<link rel="preload" as="style"${crossorigin} href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet"${crossorigin} href="${href}"></noscript>`
    },
  )

  fs.writeFileSync(indexPath, html)
  console.log('✅ index.html optimized')
}

optimizeIndex()

console.log('✅ Post-build optimization completed!')
