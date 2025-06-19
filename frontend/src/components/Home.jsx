import { Outlet } from 'react-router-dom';
import { StaffRoutes } from '../utils/PrivateRoutes';
import Navbar from './Navbar';
import { StaffDashboard } from './staff/StaffDashboard';

const Home = () => {
  return (
    <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <StaffRoutes>
          <StaffDashboard Children={<Outlet />} />
        </StaffRoutes>
    </div>
  )
}

export default Home