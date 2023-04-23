// import Navbar from "../../components/navbar/Navbar";
import Banner from "../../containers/Banner";
import About from "../../containers/About";
import LatestProject from "../../containers/project/LatestProject";
import MedicalProject from "../../containers/project/MedicalProject";
import EduProject from "../../containers/project/EduProject";
import Member from "../../containers/Member";
import Contact from "../../containers/Contact";
import Footer from "../../components/footer/Footer";

function Home(){
    return (
        <div>
            {/* <Navbar/> */}
            <Banner/>
            <About />
            <LatestProject/>
            <MedicalProject/>
            <EduProject/>
            <Member/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default Home;