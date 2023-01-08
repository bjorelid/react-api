import React, {useState} from 'react'
import axios from 'axios'

function ApiRequest() {
    const [movies, setMovies] = useState([])
    const [gif, setGif] = useState([])

    function searchRequest(event){
        if(event.key === 'Enter' && event.target.value !== '' ){

            axios.get('https://www.omdbapi.com/?apikey=dcdc882a&type=movie&s=' + event.target.value)
                .then(res=> {
                    console.log(res)
                    setMovies(res.data.Search)
                })
                .catch(err => {
                    console.log(err)
                }
            )

            axios.get('https://api.giphy.com/v1/gifs/search?api_key=LqO2SoKAaXo8PhQSq7ov9hFqDvG9iYDZ&limit=1&q=' + event.target.value)
            .then(res=> {
                console.log(res)
                setGif(res.data.data[0].images.original.url)
            })
            .catch(err => {
                console.log(err)
            }
            )
        }
    }


    return (
        <div>
            <main style={{backgroundImage: `url(${gif})`}}>

            <div className="flex">
            <input placeholder='Search for any movie' onKeyDown={searchRequest} />

            <ul>
                {
                   movies.map(item => <li key={item.imdbID}><a href={'https://imdb.com/title/' + item.imdbID}>{item.Title}</a></li>)
                }
            </ul>

            </div>
            </main>
        </div>
    )
}

export default ApiRequest