// write your code here

function fetchRamenImg(){
    fetch(`http://localhost:3000/ramens`)
    .then(resp => resp.json())
    .then(obj => loadRamenImgs(obj));
}

function loadRamenImgs(ramenObj){
    const divMenu = document.getElementById('ramen-menu');

    for(let dish in ramenObj){
        let ramenImg = document.createElement('img');
        ramenImg.setAttribute('src', `${ramenObj[dish]['image']}`);
        ramenImg.id = ramenObj[dish]['name'];

        ramenImg.addEventListener('click', () => loadRamenDetails(ramenObj[dish]));
         
        divMenu.appendChild(ramenImg);

    }

    const addRamenForm = document.getElementById('new-ramen');
    addRamenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = document.getElementById('new-name').value;
        let restaurant = document.getElementById('new-restaurant').value;
        let img = document.getElementById('new-image').value;
        let rating = document.getElementById('new-rating').value;
        let comment = document.getElementById('new-comment').value;

        addNewRamen(name, restaurant, img, rating, comment);
    });

    


}

function loadRamenDetails(ramenObj){
    const ramenDetail = document.getElementById('ramen-detail');

    let ramenImg = ramenDetail.querySelector('.detail-image');
    ramenImg.setAttribute('src', `${ramenObj['image']}`);

    let ramenName = ramenDetail.querySelector('.name');
    ramenName.textContent = ramenObj['name'];

    let ramenRestaurant = ramenDetail.querySelector('.restaurant');
    ramenRestaurant.textContent = ramenObj['restaurant'];

    let ramenRating = document.getElementById('rating-display');
    ramenRating.textContent = ramenObj['rating'];

    let ramenComment = document.getElementById('comment-display');
    ramenComment.textContent = ramenObj['comment'];

}


function addNewRamen(name, restaurant, img, rating, comment){
    fetch(`http://localhost:3000/ramens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            restaurant: restaurant,
            img: img,
            rating: rating,
            comment: comment,
        })
    })
    .then(resp => resp.json())
    .then(() => fetchRamenImg());
}


document.addEventListener('DOMContentLoaded', () => {
    fetchRamenImg();

})