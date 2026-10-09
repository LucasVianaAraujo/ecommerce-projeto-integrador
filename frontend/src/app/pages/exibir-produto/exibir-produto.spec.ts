import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExibirProduto } from './exibir-produto';

describe('ExibirProduto', () => {
  let component: ExibirProduto;
  let fixture: ComponentFixture<ExibirProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExibirProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(ExibirProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
