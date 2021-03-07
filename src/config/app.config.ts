// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as path from "path"
require('dotenv').config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET = process.env.AWS_BUCKET;
export const PUBLIC_PATH = path.join(__dirname, '../../public');
export const DOWNLOAD_PATH = path.join(PUBLIC_PATH, '/downloads');