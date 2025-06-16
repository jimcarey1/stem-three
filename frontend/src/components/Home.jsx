import { Outlet } from 'react-router-dom';
import { StaffRoutes } from '../utils/PrivateRoutes';
import Navbar from './Navbar';
import { StaffDashboard } from './staff/StaffDashboard';

const Home = () => {
  return (
    <>
        <Navbar />
        <StaffRoutes>
          <StaffDashboard Children={<Outlet />} />
        </StaffRoutes>
    </>
  )
}

export default Home