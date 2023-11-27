// Aguarde o carregamento completo do documento antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // Adicione um manipulador de eventos ao formulário de ideias
    const ideaForm = document.getElementById('ideaForm');
    if (ideaForm) {
      ideaForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const authorName = document.getElementById('authorName').value;
        const ideaText = document.getElementById('idea').value;
  
        // Enviar os dados para a API
        fetch('/api/ideas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
          },
          body: JSON.stringify({
            author_name: authorName,
            idea_text: ideaText,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao enviar a ideia');
            }
            return response.json();
          })
          .then((data) => {
            // Redirecionar para a página de agradecimento após o envio bem-sucedido
            window.location.href = '/thank_you/';
          })
          .catch((error) => {
            console.error('Erro ao enviar a ideia:', error);
          });
  
        // Limpar o formulário após o envio
        document.getElementById('authorName').value = '';
        document.getElementById('idea').value = '';
      });
    }
  
    // Função para obter o token CSRF
    function getCSRFToken() {
      const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
      return csrfCookie ? csrfCookie.split('=')[1] : null;
    }
  
  });
  