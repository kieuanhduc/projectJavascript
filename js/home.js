
import postApi from "./api/postApi";
import { initPagination, initSearch, renderPagination, renderPostList } from './utils/index';





async function handleFilterChange(filterName,filterValue){

        try {
             // update query params
            const url = new URL(window.location);
            url.searchParams.set(filterName,filterValue)

            //reset page if needed
            if(filterName === 'title_like') url.searchParams.set("_page",1)

            history.pushState({},'',url)

       
            //fetch api 
            const {data,pagination} = await postApi.getAll(url.searchParams)
            //re-render post list
            renderPostList(data)
            renderPagination("pagination",pagination)

        } catch (error) {

            console.log(error)

        }
   
}




;( async () => {
        try {

            const url = new URL(window.location)
            //update param if needed
            if(!url.searchParams.get('_page')) url.searchParams.set('_page',1)
            if(!url.searchParams.get('_limit')) url.searchParams.set('_limit',6)
        
            history.pushState({},'',url)
    
            const queryParams = url.searchParams

        //attach click event
        initPagination({
            elementId: 'pagination',
            defaultParams:queryParams,
            onchange: (page) => handleFilterChange('_page',page)
        })

        initSearch({
            elementId: 'searchInput',
            defaultParams:queryParams,
            onchange: (value) => handleFilterChange('title_like',value)
        })

        //set default pagination on url
       

        // console.log(queryParams.toString())

        const {data,pagination} = await postApi.getAll(queryParams)

        renderPostList(data)
        renderPagination('pagination',pagination)

        } catch (error) {
            console.log("get all failed ",error)
        }
})()