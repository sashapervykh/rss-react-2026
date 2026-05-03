import { Component } from "react";
import { SearchWrapper } from "../../widget/SearchWrapper/SearchWrapper";
import { Footer } from "../../shared/ui/Footer/Footer";

export class Home extends Component {
    render() {
        return <>
            <SearchWrapper />
            <Footer><div>buttom</div></Footer>
        </>
    }


}