import axiosClient from "./api/axiosClient";
import postApi from "./api/postApi";
import { setTextContent ,setThumbnailContent,truncateText} from "./utils/index";
import dayjs from "dayjs";
import  relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)


function createPostElement(post){
    if(!post) return;

    //find and clone template 
 
        const postTemplate = document.getElementById('postItemTemplate');
        if(!postTemplate) return;
    
        const liElement  = postTemplate.content.firstElementChild.cloneNode(true);
        
        if(!liElement) return;
        
      //update title , description , author , thumbnail
        setTextContent(liElement,'[data-id="title"]',post.title);
        setTextContent(liElement,'[data-id="description"]',truncateText(post.description,100));
        setTextContent(liElement,'[data-id="author"]',post.author);
      
        
        //caculate timestamp
        setTextContent(liElement,'[data-id="timeSpan"]', dayjs(post.updatedAt).fromNow());

        setThumbnailContent(liElement,'[data-id="thumbnail"]',post.imageUrl);


      //event


      return liElement;

  
}

function renderPostList(postList){

    // console.log(postList)
    
    if(!Array.isArray(postList) || postList.length === 0) return;

    const ulElement = document.getElementById('postsList')

    if(!ulElement) return;

    postList.forEach((post) => {

         const liElement = createPostElement(post)

        ulElement.appendChild(liElement)
    })
}

function renderPagination(pagination){

    const ulPagination = document.getElementById('pagination') 


    if(!pagination || !ulPagination) return;
    //calc totalpage

    const {_page,_limit,_totalRows} = pagination
    const totalPage = Math.ceil(_totalRows/_limit)

    //save page and totalPages to ulPagination

    ulPagination.dataset.page = _page
    ulPagination.dataset.totalPages = totalPage

    //check if enable/disable prev/next links

    if(_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
    else ulPagination.firstElementChild?.classList.remove('disabled')

    if(_page >= totalPage) ulPagination.firstElementChild?.classList.add('disabled')
    else ulPagination.firstElementChild?.classList.remove('disabled')
}

function initPagination(){
    // bind click event for prev/next link
    const ulPagination = document.getElementById('pagination')
    if(!ulPagination) return

    //add click event for prev link
    const prevLink = ulPagination.firstElementChild?.firstElementChild
    if(prevLink){
        prevLink.addEventListener('click',handlePrevClick)
    }

    // add click event for next link
    const nextLink = ulPagination.lastElementChild?.lastElementChild
    if(nextLink){
        nextLink.addEventListener("click",handleNextLink)
    }


}

function handleFilterChange(filterName,filterValue){
     
    // update query params
    const url = new URL(window.location);
    url.searchParams.set(filterName,filterValue)
    history.pushState({},'',url)

    //fetch api 

    //re-render post list
   
}

function handlePrevClick(e){
    
    e.preventDefault();
    console.log("prev link")
   


}

function handleNextLink(e){
   
    e.preventDefault();

    console.log("next link")
}

function initUrl(){
    const url = new URL(window.location)

    //update search params if needed
    if(!url.searchParams.get('_page')) url.searchParams.set('_page',1)
    if(!url.searchParams.get('_limit')) url.searchParams.set('_limit',6)

    history.pushState({},'',url)
}

;( async () => {
        try {
            initPagination()
            initUrl()

        const queryParams = new URLSearchParams(window.location.search)

        // console.log(queryParams.toString())

        const {data,pagination} = await postApi.getAll(queryParams)

        renderPostList(data)
        renderPagination(pagination)

        } catch (error) {
            console.log("get all failed ",error)
        }
})()