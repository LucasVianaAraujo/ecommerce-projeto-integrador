import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatIconModule], 
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css'
})

export class CadastroUsuario {
  cadastroForm: FormGroup; // Esse FromGroup é uma ferramenta de manipulação de formulário.
  ocultarSenha = true; // Declarando a váriavel usada no html pra fazer o olho da senha abrir e fechar 
  ocultarConfirmaSenha = true;

  constructor( // definindo ferramentas
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ){
    this.cadastroForm = this.fb.group({ //criando os itens do formulário
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // precisa ser preenchido e ser e-mail
      senha: ['', Validators.required],
      confirmeSenha: ['', Validators.required]
    });
  }

  toggleSenha(){ // faz o olhinho esconder a senha ou nao
    this.ocultarSenha = !this.ocultarSenha;
  }

  toggleConfirmarSenha(){
    this.ocultarConfirmaSenha = !this.ocultarConfirmaSenha
  }

  fazerCadastro(){
    if(this.cadastroForm.valid){ // se tiver corrido tudo bem no cadastroForm antes

      if(this.cadastroForm.value.senha !== this.cadastroForm.value.confirmeSenha){ // verifica se a confirmaçao e igaula a senha
        alert('As senhas não coincidem!');
        return;
      }

      const dadosDoUsurio = { //const com os dados o usuario
        nome: this.cadastroForm.value.nome,
        senha: this.cadastroForm.value.senha,
        email: this.cadastroForm.value.email,
      }

      this.usuarioService.cadastrarUsuario(dadosDoUsurio).subscribe({ // verifica se os dados do usuario foram etregues
        next: () =>{ // caso sim redireciona para o login
          alert('Conta criada com sucesso!')
          this.router.navigate(['/login'])
        },
        error: (erro: any) => { // caso nao reporta o erro
          console.error('Erro ao salvar: ', erro);
          alert('Ocorreu um erro ao criar a conta.');
        }
      });

    }else{ // debug final, caso nao se encaixe dentro dos parametros anteriores.
      alert('Por favor, preencha os campos corretamente.')
    }
  }
}