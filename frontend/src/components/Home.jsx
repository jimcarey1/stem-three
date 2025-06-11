import { StaffRoutes } from '../utils/PrivateRoutes';
import Navbar from './Navbar';
import { StaffDashboard } from './staff/StaffDashboard';

const Home = () => {
  return (
    <>
        <Navbar />
        <StaffRoutes>
          <StaffDashboard />
        </StaffRoutes>
    </>
  )
}

export default Home