import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://3000-ivl9jlq2qzveum2gylzbb.app.cto.new';
const outputPath = path.join(__dirname, 'public', 'qr-code.png');

QRCode.toFile(outputPath, url, {
  color: {
    dark: '#000000',
    light: '#ffffff'
  },
  width: 1000,
  margin: 2
}, function (err) {
  if (err) throw err;
  console.log('QR Code generated successfully at ' + outputPath);
});
