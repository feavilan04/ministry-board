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
                    console.log(publisher_list)
                    getPublishers(setPublisherList);
                });
            document.title = title
            document.getElementById("page-title").innerHTML = title
    }
}

const getPublishers = (callback, filter=null) => {
    const publishers= window.db.find('publisher', callback, filter)
}

const setPublisherList = (publishers) => {
    const publisher_list=document.getElementById("publisher_list")
    const loading_flag=document.querySelector("#pl-loading-flag")
    loading_flag.parentNode.removeChild(loading_flag);
    if(publishers.length==0){
        empty_list = `<li class="top-space" id="pl-loading-flag">
                <strong class="sidebar-center-element">Loading results</strong>
            </li>`
        publisher_list.prepend(stringToHTML(empty_list));
    }else{
        publishers.forEach((publisher, index) => {
            publisher_item = `<li class="list-group-item link">
                    <div class="media-body">
                        <strong>${publisher.name}</strong>
                    </div>
                </li>`
            publisher_list.prepend(stringToHTML(publisher_item));
        })
    }
}

var stringToHTML = (str) => {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

const goHome = () => window.location.reload()

