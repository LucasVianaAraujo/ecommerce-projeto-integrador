// Por enquanto qualquer email e senha são aceitos (os campos só precisam estar preenchidos).
export function loginAdmin(email: string, senha: string) {
  if (email.trim() !== '' && senha.trim() !== '') {
    localStorage.setItem('adminLogado', 'true');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem('adminLogado');
}

export function adminLogado() {
  return localStorage.getItem('adminLogado') === 'true';
}
