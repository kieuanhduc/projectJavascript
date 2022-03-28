
export function renderPagination(elementId,pagination){

    const ulPagination = document.getElementById(elementId)


    if(!pagination || !ulPagination) return;
    //calc totalpage

    const {_page,_limit,_totalRows} = pagination
    const totalPage = Math.ceil(_totalRows/_limit)

    //save page and totalPages to ulPagination

    ulPagination.dataset.page = _page
    ulPagination.dataset.totalPages = totalPage

    //check if enable/disable prev/next links
    if(_page <= 1){
        ulPagination.firstElementChild?.classList.add('disabled')
    }else{
        ulPagination.firstElementChild?.classList.remove('disabled')
    }

    if(_page >= totalPage){
        ulPagination.lastElementChild?.classList.add('disabled')
    }else{
        ulPagination.lastElementChild?.classList.remove('disabled')
    }
}


export function initPagination(elementId,defaultParams,onchange){
    // bind click event for prev/next link
    const ulPagination = document.getElementById(elementId)
    if(!ulPagination) return

    //set current active page
    //use default params

    //add click event for prev link
    const prevLink = ulPagination.firstElementChild?.firstElementChild
    if(prevLink){
        prevLink.addEventListener('click',(e)=>{
            e.preventDefault();
            const page = Number.parseInt(ulPagination.dataset.page) || 1
            if(page > 2 ) onchange('_page',page - 1 )
        })
    }

    // add click event for next link
    const nextLink = ulPagination.lastElementChild?.lastElementChild
    if(nextLink){
        nextLink.addEventListener("click",(e) => {
            e.preventDefault();
            const page = Number.parseInt(ulPagination.dataset.page) || 1
            const totalPages = ulPagination.dataset.totalPages
        
            if(page < totalPages ) onchange('_page',page + 1 )
        })
    }


}