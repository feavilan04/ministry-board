[...document.querySelectorAll('.home-panel-button')].forEach(function (item) {
    item.addEventListener('click', () => {
        window.location.reload()
    });
});

[...document.querySelectorAll('.sidemenu-option')].forEach(function (item) {
    item.addEventListener('click', () => {
        destination=item.getAttribute("menu-value");
        navigateTo(item, destination)
    });
});


const enable_publisher_listeners = () => {
    document.getElementById('publisher-form').addEventListener('click', () => {
        displayPublisherForm();
    });
} 