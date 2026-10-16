/*
  Troca o número de WhatsApp da Omva em TODAS as páginas do site de uma vez (links wa.me e o telefone escrito no rodapé).

  Uso:  node scripts/trocar-numero-whatsapp.mjs <novo número só com dígitos, com 55> "<como escrever na tela>"
  Ex.:  node scripts/trocar-numero-whatsapp.mjs 554599990000 "(45) 99999-0000"

  Sem argumentos, só lista onde o número aparece hoje.
*/
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..');
const ATUAL = '555121601745';
const ATUAL_ESCRITO = '(51) 2160-1745';
const [novo, escrito] = process.argv.slice(2);

function paginas(pasta) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((e) => {
    const caminho = path.join(pasta, e.name);
    if (e.isDirectory()) return e.name === 'scripts' || e.name === 'node_modules' || e.name.startsWith('.') ? [] : paginas(caminho);
    return /\.(html|md|json|xml)$/.test(e.name) ? [caminho] : [];
  });
}

let total = 0;
for (const arquivo of paginas(RAIZ)) {
  const texto = fs.readFileSync(arquivo, 'utf8');
    const links = texto.split(ATUAL).length - 1;
  const escritos = texto.split(ATUAL_ESCRITO).length - 1;
  if (!links && !escritos) continue;
  total += links + escritos;
  console.log(`${path.relative(RAIZ, arquivo)}: ${links} link(s), ${escritos} escrito(s)`);
  if (novo) {
    if (!/^55\d{10,11}$/.test(novo)) throw new Error('O número novo deve ter só dígitos, começar com 55 e ter DDD (12 ou 13 dígitos).');
    let t = texto.replaceAll(ATUAL, novo);
    if (escrito) t = t.replaceAll(ATUAL_ESCRITO, escrito);
    fs.writeFileSync(arquivo, t);
  }
}
console.log(novo ? `\n${total} ocorrência(s) trocada(s). Atualize ATUAL e ATUAL_ESCRITO neste script e publique o site.` : `\n${total} ocorrência(s) do número atual.`);
