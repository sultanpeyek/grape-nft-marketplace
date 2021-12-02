import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = path.join(process.cwd(), '/base');
const ASSETS_DIRECTORY = path.join(process.cwd(), '/assets');

if (!fs.existsSync(ASSETS_DIRECTORY)) {
  fs.mkdirSync(ASSETS_DIRECTORY);
} else {
  fs.rmdirSync(ASSETS_DIRECTORY, { recursive: true });
  fs.mkdirSync(ASSETS_DIRECTORY);
}

async function run() {
  let counter = 0;
  fs.readdirSync(BASE_PATH)
    .filter(file => {
      return path.extname(file).toLowerCase() === '.json';
    })
    .forEach((file, key) => {
      const val = JSON.parse(
        fs.readFileSync(`${BASE_PATH}/${key}.json`, 'utf-8'),
      );
      const valName = val.name;
      for (let i = 0; i < 250; i++) {
        val.name = valName + (i + 1);
        fs.writeFileSync(
          `${ASSETS_DIRECTORY}/${counter}.json`,
          JSON.stringify(val),
        );

        fs.copyFile(
          `${BASE_PATH}/${key}.png`,
          `${ASSETS_DIRECTORY}/${counter}.png`,
          err => {
            if (err) throw err;
          },
        );
        counter++;
      }
    });
}

run();
