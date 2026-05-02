import { Component } from "react";
import { SearchForm } from "../../features/search/ui/SearchForm";
import type { MovieType } from "../../entities/movie/model/MovieType";

interface State {
    movies: MovieType[];
}


export class Home extends Component<undefined, State> {
    constructor(props: undefined) {
        super(props)
        this.state = { movies: [] }
    }
    render() {
        return <>
            <h1>Find Your Movie</h1>
            <SearchForm onSearch={(query: string) => console.log(query)} />
        </>
    }
}