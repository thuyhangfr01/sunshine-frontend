import Banner from "../../containers/Banner";
import About from "../../containers/About";
import LatestProject from "../../containers/project/LatestProject";
import MedicalProject from "../../containers/project/MedicalProject";
import EduProject from "../../containers/project/EduProject";
import Member from "../../containers/Member";
import Contact from "../../containers/Contact";

function Home(){
    return (
        <div>
            <Banner/>
            <About />
            <LatestProject/>
            <MedicalProject/>
            <EduProject/>
            <Member/>
            <Contact/>
        </div>
    )
}

export default Home;