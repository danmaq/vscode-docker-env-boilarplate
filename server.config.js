// TODO: このスクリプトも ts-node で TypeScript 化したかったが、
// TS 化するとなぜか `app.prepare()` でフリーズすると言う奇怪な事象に直面。
// これ以上の調査は悪戯に工数を圧迫するだけなので、一旦断念している。

const express = require('express');
const fs = require('fs');
const https = require('https');
const { default: next } = require('next');

/** PEM 形式の証明書チェーン ファイルへのパス。 */
const CERT = './.cert/localhost.pem';

/** PEM 形式の秘密鍵ファイルへのパス。 */
const KEY = './.cert/localhost.key.pem';

/**
 * TLS を使用しない場合のポート番号。
 *
 * 使用する場合、`443` を使用します。
 */
const NON_TLS_PORT = 3000;

/**
 * TLS 接続が必要な場合適切なオプションを、不要な場合は false を取得します。
 * @returns {https.ServerOptions | false}
 */
const getTlsOptions = () =>
  process.env.HTTPS === 'true' &&
  fs.existsSync(CERT) &&
  fs.existsSync(KEY) && {
    cert: fs.readFileSync(CERT),
    key: fs.readFileSync(KEY),
  };

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const exp = express();
  exp.get('*', (req, res) => handle(req, res));
  const tls = getTlsOptions();
  const server = tls ? https.createServer(tls, exp) : exp;
  server.listen(tls ? 443 : NON_TLS_PORT, '0.0.0.0');
  const url = `http${tls ? 's' : ''}://localhost${tls ? '' : NON_TLS_PORT}/`;
  // eslint-disable-next-line no-console
  console.info(`> Ready on ${url}`);
});
