const fs = require('fs');
const path = require('path');

function getAllFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getAllFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

const componentsDir = path.join(__dirname, '../components');
if (!fs.existsSync(componentsDir)) {
  console.error('Components directory not found:', componentsDir);
  process.exit(1);
}

const files = getAllFiles(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
const report = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n').length;
  report.push({ file: path.relative(process.cwd(), file), lines });
}

report.sort((a,b) => b.lines - a.lines);

console.log('Component size report (lines):\n');
report.forEach(r => {
  const flag = r.lines > 290 ? '⚠️ EXCEEDS 290' : '';
  console.log(`${r.lines.toString().padStart(4)}  ${r.file} ${flag}`);
});

const oversized = report.filter(r => r.lines > 290);
if (oversized.length) {
  console.log('\nFiles exceeding 290 lines:');
  oversized.forEach(r => console.log(` - ${r.file} (${r.lines} lines)`));
  process.exitCode = 2;
} else {
  console.log('\nAll component files are within the 290-line limit.');
}
