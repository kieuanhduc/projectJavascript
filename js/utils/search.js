import debounce from "lodash.debounce"

export function initSearch({elementId,defaultParams,onchange}){

    const searchInput = document.getElementById(elementId)
    if(!searchInput) return 

    //title like
    const queryParams = new URLSearchParams(window.location.search)
    if(defaultParams &&  defaultParams.get('title_like')){
        searchInput.value = defaultParams.get('title_like')
    }
    const debounceSearch = debounce((e) => {
       onchange?.(e.target.value)
    } , 500)

    // set default values from query params
    searchInput.addEventListener('input', debounceSearch)
}
