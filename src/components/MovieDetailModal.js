import React, { useEffect, useState } from "react"
import ReactDom from 'react-dom'
import Axios from "axios"
import { API_KEY } from "../App"

const MovieDetailModal = props => {
    const { open, selectedMovie } = props
    const [movieInfo, setMovieInfo] = useState()

    // fetch detail movie if user clicked movie list item
    useEffect(() => {
        Axios.get(
            `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
        ).then((response) => setMovieInfo(response.data))
    }, [selectedMovie])

    // if user close modal this modal will be removed from the DOM
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" />
            <div className="modal-container">
                <button className="close-modal" onClick={() => { props.onClose(); props.onMovieSelect() }}>
                    <img src='https://raw.githubusercontent.com/januarmaksum/januarmaksum.github.io/master/close_icon.svg' alt="icon close modal" />
                </button>
                {movieInfo ? (
                    <div className="modal-body">
                        <img src={movieInfo?.Poster} alt={movieInfo?.Title} />
                        <div className="modal-body-content">
                            <div className="movie-info movie-title">{movieInfo?.Type} <span>{movieInfo?.Title}</span></div>
                            <div className="movie-info">IMDB Rating: <span>{movieInfo?.imdbRating}</span></div>
                            <div className="movie-info">Year: <span>{movieInfo?.Year}</span></div>
                            <div className="movie-info">Language: <span>{movieInfo?.Language}</span></div>
                            <div className="movie-info">Runtime: <span>{movieInfo?.Runtime}</span></div>
                            <div className="movie-info">Genre: <span>{movieInfo?.Genre}</span></div>
                            <div className="movie-info">Director: <span>{movieInfo?.Director}</span></div>
                            <div className="movie-info">Actors: <span>{movieInfo?.Actors}</span></div>
                            <div className="movie-info">Synopsis: <span>{movieInfo?.Plot}</span></div>
                        </div>
                    </div>
                ) : (
                    "Loading..."
                )}
            </div>

        </>,
        // this element for container modal, so there is no conflict with elements other than modal popup
        document.getElementById('portal')
    )
}

export default MovieDetailModal