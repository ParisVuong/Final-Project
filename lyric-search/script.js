/*
Homework 1/25
Explain what happens in script.js

What is an EventListener?
What is the format for using .addEventListener()? **In this example**
What does e => {} do?
What does .preventDefault() do?
What does API mean?
For each function, explain what it does in 2 sentences
What does the following line do?
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
*/

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";

// EventListener for Form
form.addEventListener('submit', e =>{
    e.preventDefault();
   
    const searchTerm = search.value.trim();

    if(!searchTerm){
        alert("No lyrics entered");
    }
    else{
        searchSongs(searchTerm);
    }
});

// Searches by the Song Name or by Artist Name
async function searchSongs(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// Show song and Artist values in DOM (Document Object Model)
function showData(data){
    result.innerHTML = `
    <ul class = "songs">
        ${data.data.map(
            song => `
            <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class = "btn" data-artist = "${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
            `
        ).join('')}
    </ul>
    `;

    if (data.prev || data.next){
        more.innerHTML = `
        ${
            data.prev
            ? ` <button class = "btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
            data.next
            ? ` <button class = "btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }
        `;
    } else{
        more.innerHTML = '';
    }
}

//Get Prev and Next songs
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

//Get Lyrics for our searched songs
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

    more.innerHTML = '';
}

//Get Lyrics on Button Click
result.addEventListener('click', e=>{
    const clickedEL = e.target;

    if(clickedEL.tagName === 'BUTTON'){
        const artist = clickedEL.getAttribute('data-artist');
        const songTitle = clickedEL.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }

})