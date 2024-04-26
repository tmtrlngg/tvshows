const form = document.querySelector('#search-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyword = form.elements.query.value
    const config = {
        params: {
            q: keyword
        }
    }
    const res = await axios.get(`https://api.tvmaze.com/search/shows/`, config);
    console.log(res.data)
    getImages(res.data)
    form.elements.query.value = ''
})

const getImages = shows => {
    let temp_html = '';
    for (let result of shows) {
        if(result.show.image) {
            const img = result.show.image.medium
            const judul = result.show.name
            const status = result.show.status
            if (result.show.rating['average'] === null) {
                temp_html += `
                <div class="col-md-3 my-3">
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">${judul}</h5>
                            <p class="card-text">Rating: - <br>Status: ${status}</p>
                        </div>
                    </div>
                </div>
                `;
            } else {
                temp_html += `
                <div class="col-md-3 my-3">
                    <div class="card">
                        <img src="${img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">${judul}</h5>
                            <p class="card-text">Rating: ${result.show.rating['average']}<br>Status: ${status}</p>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }
    document.querySelector('#cards').innerHTML = temp_html
}

