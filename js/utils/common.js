export function setTextContent(parentElement,selector,text){
    if(!parentElement) return;
    
    const element = parentElement.querySelector(selector);

    if(element) element.textContent = text;

}

export function setThumbnailContent(parentElement,selector,images){
    if(!parentElement) return;
    
    const element = parentElement.querySelector(selector);

    if(element) {
        element.src = images;
        element.addEventListener('error' , () => {
            element.src = 'https://via.placeholder.com/1368x400?text=kieu anh duc'
        })
    }
}


export function truncateText(text,maxLength){
    if(text.length <= maxLength) return text;

    return `${text.slice(0,maxLength-1)}…`
}