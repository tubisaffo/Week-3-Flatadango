const endPoint = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
fetchMovies();
// document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

function fetchMovies() {
fetch(endPoint)
.then(res => res.json())
.then(movies => {
movies.forEach(movie => {renderMovieList(movie)})


const firstMovie = document.querySelector("#id1");
firstMovie.dispatchEvent(new Event("click"));
})
}


function renderMovieList(movie) {
const li = document.createElement("li");
li.textContent = `${movie.title}`;
li.id = "id" + movie.id;
const ul = document.querySelector("#films");
ul.appendChild(li);
li.classList.add("film");
li.classList.add('item');
li.addEventListener("click", () => {handleMovieClick(movie)
})
}
// console.log(renderMovieList);

function handleMovieClick(movie) {
const poster = document.querySelector("img#poster")
poster.src = movie.poster;
poster.alt = movie.title;
const info = document.querySelector("#showing");
info.querySelector("#title").textContent = movie.title;
info.querySelector("#runtime").textContent = `${movie.runtime} minutes`;
info.querySelector("#film-info").textContent = movie.description;
info.querySelector("#showtime").textContent = movie.showtime;
info.querySelector("#ticket-num").textContent = `${movie.capacity - movie.tickets_sold } remaining tickets`;
}
// console.log(handleMovieClick)
document.querySelector("#buy-ticket").addEventListener("click", () => {
handleBuyTicket(movie);
});


function handleBuyTicket(Ticket) {
const ticketDiv = document.querySelector("#ticket-num");
const tickets = ticketDiv.textContent.split(" ")[0];
if (tickets > 0) {
    
    fetch(endPoint + "/" + Ticket.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tickets_sold: Ticket.tickets_sold + 1
        })
        
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    })
.catch((err) => 
        console.log(err));
// ticketDiv.textContent = tickets - 1 + " remaining tickets";
} else if (tickets == 0) {
alert("No more tickets!");
e.target.classList.add("sold-out");
e.target.classList.remove("orange");
}

}
// console.log(handleBuyTicket);
