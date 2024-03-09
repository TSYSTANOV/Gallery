import { getData } from "./getData.js"

function newObserve(element){
    let observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            element.dataset.page = +element.dataset.page + 1
            getData(element.dataset.page)
        }
    },{
        rootMargin:'300px'
    })
    observer.observe(element)
}


export const loadMore = (element) =>{
    newObserve(element)
}