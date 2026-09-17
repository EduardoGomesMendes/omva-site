# omva — site institucional

Página inicial da **Omva**, em `omva.com.br`.

HTML e CSS puros, sem framework, sem build, sem dependência. São cinco arquivos:
abrir o `index.html` no navegador já mostra o site exatamente como ele fica no ar.

```
index.html                      a página
favicon.svg                     ícone da marca
assets/css/omva.css             tokens da marca + estilos
assets/img/omva-logotipo.svg    lockup (ícone + wordmark)
assets/img/omva-icone.svg       ícone isolado
```

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

## Publicar

O site é estático, então roda em qualquer hospedagem — inclusive a compartilhada.
Basta copiar os cinco arquivos para a pasta pública do domínio (`public_html`),
mantendo a estrutura de pastas.

## Relação com o omvazap

O **omvazap** é o produto, e vive em outro repositório e outro servidor
(`omvazap.omva.com.br`). Este site só aponta para ele; não compartilham código.
