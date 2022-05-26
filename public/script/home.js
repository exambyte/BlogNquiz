const videoContainer = document.getElementById('video-container');

const loadVideo = async()=>{
    const res = await fetch('/getvideos',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    if(data){
        for(let i =0;i<=data.length;i++){
            videoContainer.innerHTML += `<div class="video_section">
            <iframe src="${data[i].element.player_embed_url}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=244555" width="300" height="280" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" title="Test video" style="margin: 1vmax"></iframe>
            </div>`
        }
         
    }
} 