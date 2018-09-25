import Auth from "../events/auth.js";
import Quill from 'quill';

export async function apiGetEpisode(url){
    let data = JSON.stringify({url:url});
    try {
        const response = await fetch("/getepisode", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: data
        });
        const episode = await response.json();
        return episode;
    } catch(e){
        console.error("API request raised an error: ", e);
    }
};

export async function apiUpdateEpisode(data){
    let d = JSON.stringify(data);
    try{
        const response = await fetch("/updateepisode", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            method: 'POST',
            credentials: 'same-origin',
            body: d
        });
        const episode = await response.json();
        return episode;
    } catch(e){
        console.error("API request raised an error: ", e);
    }
}

export function createQuill(id){
    let toolbarOptions = [
        [
            'bold', 
            'italic', 
            'underline', 
            'strike', 
            'blockquote', 
            { 'header': 1 }, 
            { 'header': 2 }, 
            { 'list': 'ordered'}, 
            { 'list': 'bullet' }, 
            { 'script': 'sub'}, 
            { 'script': 'super' },
            'image',
            { 'color': [] }, 
            { 'background': [] },
            'clean'
        ]
      ];
      let editor = new Quill(`#${id}`, {
          modules: {
              toolbar: toolbarOptions
          },
          placeholder: "Type Full Description Here...",
          theme: 'snow'
      });
      return editor;
}