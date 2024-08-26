//api.js
const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21', // Идентификатор группы
    headers: {
      authorization: '7f79b7e7-9a5b-49ce-b53b-2d24ad36cb42', // Токен
      'Content-Type': 'application/json'
    }
  };

  const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject('...');
  }
  
  export const getUserInfo = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      headers: apiConfig.headers
    })
    .then(res => checkResponse(res))
  };

  export const getStartingcard = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    })
    .then(res => checkResponse(res))
  }

  export const updateUserInfo = (nameUser, aboutUser) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body : JSON.stringify({
            name: nameUser,
            about: aboutUser
        })
  })
  .then(res => checkResponse(res))
}

export const addCard = (placeName,linkImg) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: placeName,
            link: linkImg
        })
    })
    .then(res => checkResponse(res))
}

export const toggleLikebutton = (cardID, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
return fetch(`${apiConfig.baseUrl}/cards/likes/${cardID}`, {
  method,
  headers: apiConfig.headers
})
    .then(res => checkResponse(res))
  }


export const deleteCard = (cardID) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(res => checkResponse(res))
};

export const avatarUpdate = (linkImg) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: linkImg
    })
  })
  .then(res => checkResponse(res))
};