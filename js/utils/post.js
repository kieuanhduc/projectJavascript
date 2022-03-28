
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent, setThumbnailContent, truncateText } from './common';
dayjs.extend(relativeTime)



export function createPostElement(post){
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

export function renderPostList(elementId,postList){

    console.log(postList)
    const ulElement = document.getElementById(elementId)

    if(!Array.isArray(postList) || postList.length === 0) {
        ulElement.textContent = ""
        return
    }

  

    if(!ulElement) return;

    //clear current list
    ulElement.textContent = ""

    postList.forEach((post) => {

         const liElement = createPostElement(post)

        ulElement.appendChild(liElement)
    })
}
