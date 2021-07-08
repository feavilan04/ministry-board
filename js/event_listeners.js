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

const enable_publishers_form = () => {
    [...document.querySelectorAll('.form-input')].forEach(function (item) {
        item.addEventListener('keyup', () => {
            item.classList.remove('warning-field');
            document.getElementById(item.id + '-warning').setAttribute('hidden', 'hidden');
        });
    });


    document.getElementById('create_publisher').addEventListener('click', () => {
        const form_check = check_publisher_form()
        if(form_check.status==="ERROR"){
            for (let index = 0; index < form_check.fields.length; index++) {
                const element = form_check.fields[index];
                showWarningData(element);
            }
        }else{
            console.log("helo")
        }
    })
}