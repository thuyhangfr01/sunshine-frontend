import Banner from "../../containers/client/Banner";
import About from "../../containers/client/About";
import LatestProject from "../../containers/client/project/LatestProject";
import MedicalProject from "../../containers/client/project/MedicalProject";
import EduProject from "../../containers/client/project/EduProject";
import Member from "../../containers/client/Member";
import Contact from "../../containers/client/Contact";

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