import Navbar from './Navbar';
import HomeBodySection from '../sections/HomeBodySection';
import HomeReasoning from '../sections/HomeReasoning';
import HomeCourses from '../sections/HomeCourses';

const Home = () => {
  return (
    <>
        <Navbar />
        <HomeBodySection />
        <HomeReasoning />
        <HomeCourses />
    </>
  )
}

export default Home