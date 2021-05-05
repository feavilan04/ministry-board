const navigateTo = (element, route) => {
    document.querySelectorAll(".nav-group-item").forEach((item, index) => {
        item.classList.remove("active")
    })
    element.classList.add("active")
    switch (route){
        case 'data':
            const title = "Manage Data" 
            fetch('./views/publisher/publishers_list.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById("content").innerHTML= data;
                    getPublishers();
                });
            document.title = title
            document.getElementById("page-title").innerHTML = title
    }
}

const getPublishers = () => {
    const publishers= window.db.find('publisher')
    console.log(publishers)
}

const goHome = () => window.location.reload()

