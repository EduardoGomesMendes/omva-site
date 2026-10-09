# omva — site institucional

Página inicial da **Omva**, em `omva.com.br`.

A página apresenta primeiro a **empresa** (Omva: quem somos, o que acreditamos, produtos) e só depois o
**produto** (omvazap: telas, recursos, planos, dúvidas). Os rótulos das seções do produto começam com
"omvazap ·" para ficar claro de quem se fala. O segundo produto, o **omvalic**, aparece ao lado do
omvazap na lista de produtos do topo e no menu "Produtos", e tem página própria em `omvalic/`.

HTML e CSS puros, sem framework, sem build, sem dependência. O único JavaScript é um script curto no
fim do `index.html` que liga as setas e os pontos do carrossel de telas (sem ele, a faixa continua
rolando de lado com o dedo ou o mouse). São poucos arquivos:
abrir o `index.html` no navegador já mostra o site exatamente como ele fica no ar.

```
index.html                      a página
vagas/index.html                página da oferta "10 vagas grátis no teste" (vem do Instagram)
omvalic/index.html              página do segundo produto (licitações + resumo de edital por IA)
favicon.svg                     ícone da marca
assets/css/omva.css             tokens da marca + estilos
assets/img/omva-logotipo.svg    lockup (ícone + wordmark)
assets/img/omva-icone.svg       ícone isolado
```

## Dados estruturados (SEO)

O `<head>` do `index.html` tem dois blocos JSON-LD: o `SoftwareApplication` (com os três preços) e o `FAQPage`.
Eles **espelham** o que está visível na página — as perguntas do FAQ e os valores dos planos. Ao mudar
um preço ou uma pergunta, mude o bloco correspondente também; o Google ignora dado estruturado que
diverge do texto da página.

Os preços e os limites de usuários vêm do sistema (`src/crm/planos.js` do omvazap): mude lá primeiro.

## Identidade visual

Os tokens em `:root` vêm do **design system da Omva** e devem ser alterados lá primeiro,
nunca só aqui — senão o site e o produto passam a divergir.

| | |
|---|---|
| Cor de marca | `#0d9488` (teal) |
| Títulos | Poppins 600 |
| Texto | Inter |
| Espaçamento | 4 · 8 · 16 · 24 · 32px |
| Raios | 8 · 16 · 24px · pill |

**Cuidado com a cor de marca em texto.** `#0d9488` tem 3,74:1 sobre branco — reprova
em acessibilidade para texto pequeno. Por isso botões e textos pequenos coloridos usam
`--brand-hover` (`#0f766e`, 5,47:1). O `--brand` fica para preenchimentos e textos
grandes (24px+).

## Página do omvalic

Estado do produto: **em produção, testes em breve** (ainda não há cadastro nem preço). Por isso a página
não tem botão de "testar grátis": o botão leva ao WhatsApp com a mensagem `(#OMVALIC)`, e a origem
`omvalic` precisa existir na empresa Omva no omvazap para a conversa chegar identificada.

A página separa **"Funciona hoje"** de **"Planejado"** (selos `selo-estado`). Ao entregar uma função planejada,
troque o selo e mova o card para a seção "o que já funciona"; ao liberar os testes, troque o selo do topo,
os textos "em breve" e o card em `index.html`. O JSON-LD do omvalic não tem `offers` de propósito: só
acrescente quando houver preço visível na página.

## Cache do CSS

A hospedagem manda o navegador guardar o CSS por 7 dias (`Cache-Control: max-age=604800`). Por isso o link do CSS
nas páginas leva um número de versão (`omva.css?v=...`). **Toda vez que mudar o `omva.css`, troque esse número**
no `index.html`, no `vagas/index.html` e no `omvalic/index.html`; senão quem já visitou o site recebe o HTML novo com o CSS antigo, e
as partes novas aparecem sem estilo.

## Publicar

O site é estático, então roda em qualquer hospedagem — inclusive a compartilhada.
Basta copiar os arquivos para a pasta pública do domínio (`public_html`),
mantendo a estrutura de pastas.

## Relação com o omvazap

O **omvazap** é o produto, e vive em outro repositório e outro servidor
(`omvazap.omva.com.br`). Este site só aponta para ele; não compartilham código.
