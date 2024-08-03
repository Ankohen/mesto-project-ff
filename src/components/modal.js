export function openModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupOnEsc);
}

export function closeModal(popup) {
    if (popup) {
        popup.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", closePopupOnEsc);

        const form = popup.querySelector("form");
        if (form) {
            form.reset();
        }
    }
}

export function closeOverlayWindow(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target.closest('.popup'));
    }
}

export function openCard(link, name) {
    const popupImage = document.querySelector(".popup__image");
    const popupImageCaption = document.querySelector(".popup__caption");

    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(document.querySelector(".popup_type_image"));
}

function closePopupOnEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector(".popup_is-opened");
        closeModal(activePopup);
    }
}