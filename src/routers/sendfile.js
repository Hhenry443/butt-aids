// Helper function to send a file to the client

import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../public/pages');
const sendPage = (filename) => (req, res) => res.sendFile(path.join(PAGES_DIR, filename));

export default sendPage;