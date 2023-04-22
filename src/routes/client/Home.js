// import Navbar from "../../components/navbar/Navbar";
import Banner from "../../containers/Banner";
import About from "../../containers/About";
import LatestProject from "../../containers/project/LatestProject";

function Home(){
    return (
        <div>
            {/* <Navbar/> */}
            <Banner/>
            <About />
            <LatestProject/>
        </div>
    )
}

export default Home;