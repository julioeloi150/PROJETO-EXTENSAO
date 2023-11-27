function showPopup(author, idea, date, likes, ideaId) {
    var popupContent = document.getElementById('popup-content');
    var popupDate = document.getElementById('popup-date');
    var popupLikes = document.getElementById('popup-likes');
    var popupLikeButton = document.getElementById('popup-like-button');
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');

    idea = idea.replace(/\n/g, '<br>');
    popupContent.innerHTML = 'Autor: ' + author + '<br>Ideia: ' + idea;
    popupDate.innerText = 'Data: ' + date;
    popupLikes.innerText = 'Curtidas: ' + likes;

    // Define o data-idea-id no popup-content
    popupContent.setAttribute('data-idea-id', ideaId);

    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Remove o evento de clique anterior e adicione-o novamente com o novo ideaId
    popupLikeButton.removeEventListener('click', likeIdeaPopup);
    popupLikeButton.addEventListener('click', function () {
        likeIdeaPopup(ideaId);
    });
}

// Adiciona um evento de clique no overlay para fechar o popup
document.getElementById('overlay').addEventListener('click', hidePopup);

// Adiciona um evento de clique no botão de fechar dentro do popup
document.getElementById('close-btn').addEventListener('click', hidePopup);

function likeIdea(button) {
    var box = button.closest('.box');
    var likesElement = box.querySelector('.like-count');
    var ideaId = box.getAttribute('data-idea-id');
    var csrfToken = getCookie('csrftoken');

    fetch(`/like-idea/${ideaId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
    })
    .then(response => response.json())
    .then(data => {
        likesElement.textContent = data.likes;
    })
    .catch(error => {
        console.error('Erro ao curtir a ideia:', error);
    });
}

document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function () {
        likeIdea(this);
    });
});


function likeIdeaPopup(ideaId) {
    var popupContent = document.getElementById('popup-content');
    var popupLikes = document.getElementById('popup-likes');

    fetch(`/like-idea/${ideaId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao curtir a ideia no popup: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Atualizar a contagem de curtidas no front-end
        popupLikes.textContent = 'Curtidas: ' + data.likes;
    })
    .catch(error => {
        console.error('Erro ao curtir a ideia no popup:', error);
    });
}

// Função auxiliar para obter o token CSRF dos cookies
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function hidePopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');

    popup.style.display = 'none';
    overlay.style.display = 'none';
}
