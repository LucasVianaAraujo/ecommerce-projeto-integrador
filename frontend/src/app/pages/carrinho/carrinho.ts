import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// Exemplo de interface para representar os itens no carrinho 
interface ItemCarrinho {
  id: number;
  nome: string;
  variacao?: string;
  preco: number;
  quantidade: number;
  cor: string;
}

const FRETE_GRATIS_A_PARTIR_DE = 200;
const VALOR_FRETE = 19.9;
const CUPONS: Record<string, number> = { BEMVINDO10: 0.1, PROMO20: 0.2 };

@Component({
  selector: 'app-carrinho-compra',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho{
  // Estado do carrinho
  itens = signal<ItemCarrinho[]>([
    { id: 1, nome: 'Tênis Urbano Flex', variacao: 'Tam. 42 · Preto', preco: 289.9, quantidade: 1, cor: '#2f3e46' },
    { id: 2, nome: 'Camiseta Algodão Pima', variacao: 'M · Off-white', preco: 79.9, quantidade: 2, cor: '#c9b79c' },
    { id: 3, nome: 'Mochila Compacta 18L', variacao: 'Verde musgo', preco: 159.0, quantidade: 1, cor: '#52796f' },
  ]);

  cupomAplicado = signal<string | null>(null);
  erroCupom = signal('');


  totalItens = computed(() => this.itens().reduce((totalAcumulado, i) => totalAcumulado + i.quantidade, 0));

  subtotal = computed(() => this.itens().reduce((totalAcumulado, i ) => totalAcumulado + i.preco * i.quantidade, 0));

  desconto = computed(() => {
    const cupom = this.cupomAplicado();
    return cupom ? this.subtotal() * CUPONS[cupom] : 0;
  });

  frete = computed(() => {
    if (this.itens().length === 0) return 0;
    return this.subtotal() - this.desconto() >= FRETE_GRATIS_A_PARTIR_DE ? 0 : VALOR_FRETE;
  }
  )

  total = computed(() => this.subtotal() - this.desconto() + this.frete());

  faltaParaFreteGratis = computed(() => Math.max(0, FRETE_GRATIS_A_PARTIR_DE - (this.subtotal() - this.desconto())));

  progressoFrete = computed(() => Math.min(100, ((this.subtotal() - this.desconto()) / FRETE_GRATIS_A_PARTIR_DE) * 100));

    alterarQuantidade(id: number, delta: number): void {
      this.itens.update(lista => lista.map(i => i.id === id ? {...i, quantidade: Math.max(1, Math.min(99, i.quantidade + delta))}: i))
    };

    removerItem(id: number): void {
      this.itens.update(lista => lista.filter(i => i.id !== id));
    }

    limpar(): void {
      this.itens.set([]);
      this.cupomAplicado.set(null);
    }

    aplicarCupom(codigo: string, input: HTMLInputElement): void {
      const chave = codigo.trim().toUpperCase();
      if (!chave){
        this.erroCupom.set('Digite um código de cupom.');
        return;
      }
      if(chave in CUPONS){
        this.cupomAplicado.set(chave);
        this.erroCupom.set('');
        input.value = '';
      } else {
        this.erroCupom.set('Cupom inválido.');
      }
    }

    removerCupom(): void {
      this.cupomAplicado.set(null);
    }

    finalizarCompra(): void {
      console.log('Finalizar compra', this.itens(), this.total());
    }
}