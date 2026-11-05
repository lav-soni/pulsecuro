const fs = require('fs');
const path = require('path');

function fixImports(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log('⚠ Not found: ' + filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  replacements.forEach(([oldStr, newStr]) => {
    if (content.includes(oldStr)) {
      content = content.replace(new RegExp(oldStr, 'g'), newStr);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Fixed imports in: ' + filePath);
  } else {
    console.log('— No changes needed: ' + filePath);
  }
}

// Fix layout components (they import from ./pulse-logo, ./floating-sos, etc.)
fixImports('components/layout/navigation.tsx', [
  ['from "./pulse-logo"', 'from "@/components/shared/pulse-logo"'],
]);

fixImports('components/layout/footer.tsx', [
  ['from "./pulse-logo"', 'from "@/components/shared/pulse-logo"'],
]);

fixImports('components/layout/mobile-tabs.tsx', [
  ['from "next/link"', 'from "next/link"'], // already correct
]);

// Fix app/layout.tsx (imports from components)
fixImports('app/layout.tsx', [
  ['from "@/components/navigation"', 'from "@/components/layout/navigation"'],
  ['from "@/components/footer"', 'from "@/components/layout/footer"'],
  ['from "@/components/floating-sos"', 'from "@/components/shared/floating-sos"'],
  ['from "@/components/mobile-tabs"', 'from "@/components/layout/mobile-tabs"'],
]);

// Fix pages that import shared components
const pages = [
  'app/page.tsx',
  'app/hospitals/page.tsx',
  'app/resources/page.tsx',
  'app/doctors/page.tsx',
  'app/scans/page.tsx',
  'app/ai-help/page.tsx',
  'app/ai-help/prescription/page.tsx',
];

pages.forEach(page => {
  fixImports(page, [
    ['from "@/components/pulse-divider"', 'from "@/components/shared/pulse-divider"'],
    ['from "@/components/demo-badge"', 'from "@/components/shared/demo-badge"'],
  ]);
});

console.log('\n✅ All imports fixed! Refresh your browser.');