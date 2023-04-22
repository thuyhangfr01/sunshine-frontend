// import Navbar from "../../components/navbar/Navbar";
import Banner from "../../containers/Banner";
import About from "../../containers/About";
import LatestProject from "../../containers/project/LatestProject";
import Contact from "../../containers/Contact";
import Footer from "../../components/footer/Footer";

function Home(){
    return (
        <div>
            {/* <Navbar/> */}
            <Banner/>
            <About />
            <LatestProject/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default Home;