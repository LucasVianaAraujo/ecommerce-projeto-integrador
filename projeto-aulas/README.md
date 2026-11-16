# Projeto de aula - versão LÓGICA (JavaScript + localStorage)

Recriação do e-commerce **OldShoes** usando apenas o conteúdo dos slides das aulas.
Esta branch tem **a parte lógica**: JavaScript puro com dados salvos no `localStorage`.
O HTML aqui é o mínimo necessário para o JavaScript funcionar (sem CSS, então a aparência é a padrão do navegador).

Abra `index.html` no navegador (não precisa de servidor nem de instalação).

O que funciona: listagem e busca de produtos, ordenação, detalhe do produto, carrinho (quantidade, cupom,
frete grátis), cadastro/login de cliente, recuperação de senha por dica, perfil e pedidos,
login do admin e CRUD de produtos.

Dados salvos no navegador (chaves do `localStorage`): `produtos`, `carrinho`, `cupom`, `usuarios`,
`usuarioLogado`, `pedidos`, `newsletter`, `adminLogado`, `busca`, `produtoSelecionado`, `produtoEditando`.
