const formPessoa = document.getElementById('#formPessoa');
formPessoa.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch('/pessoas', {
    method: 'POST',
    body: data
  })
  .then(response => {
    if (response.ok) {
      console.log('Pessoa cadastrada com sucesso!');
    } else {
      console.error('Erro ao cadastrar pessoa: ', response.status);
    }
  })  
});

const formTransacao = document.getElementById('#formTransacao');
formTransacao.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch('/transacoes', {
    method: 'POST',
    body: data
  })
  .then(response => {
    if (response.ok) {
      console.log('Transação cadastrada com sucesso!');
      window.location.reload();
    } else {
      console.error('Erro ao cadastrar transação: ', response.status);
    }
  })
  .catch(error => {
    console.error('Erro ao cadastrar transação: ', error);
  });
});
