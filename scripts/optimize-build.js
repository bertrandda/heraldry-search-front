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

  html = html.replace(
    /<link href="([^"]*\.css)" rel="stylesheet">/g,
    '<link href="$1" rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
    + '<noscript><link href="$1" rel="stylesheet"></noscript>',
  )

  fs.writeFileSync(indexPath, html)
  console.log('✅ index.html optimized')
}

optimizeIndex()

console.log('✅ Post-build optimization completed!')
