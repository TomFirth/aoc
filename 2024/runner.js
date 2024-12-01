const { exec } = require('child_process');

const fileNumber = process.argv[2];

if (!fileNumber) {
  console.error('Please provide a file number, e.g., "npm run day 1".');
  process.exit(1);
}

const fileName = `${fileNumber}.ts`;

exec(`npx ts-node ${fileName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing ${fileName}:`, error.message);
    return;
  }
  if (stderr) {
    console.error(`Error in script ${fileName}:`, stderr);
    return;
  }
  console.log(stdout);
});
