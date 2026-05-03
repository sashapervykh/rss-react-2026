import { Component } from "react";
import { SearchWrapper } from "../../widget/SearchWrapper/SearchWrapper";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Header } from "../../shared/ui/Header/Header";

export class Home extends Component {
    render() {
        return <>
            <Header />
            <SearchWrapper />
            <Footer><div>buttom</div></Footer>
        </>
    }


}