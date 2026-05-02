import { Component } from "react";
import type { MovieType } from "../../entities/movie/model/MovieType";
import { SearchForm } from "../../features/search/ui/SearchForm";
import { MoviesList } from "../../entities/movie/ui/MoviesList/MoviesList";

interface State {
    movies: MovieType[];
    loading: boolean;
}


export class SearchWrapper extends Component<object, State> {
    constructor(props: object) {
        super(props)
        this.state = { movies: [], loading: true }
    }

    render() {
        return <>
            <h1>Find Your Movie</h1>
            <SearchForm onSearch={(query: string) => console.log(query)} />
            <MoviesList movies={this.state.movies} />
        </>
    }
}