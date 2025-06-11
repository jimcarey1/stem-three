import {Routes, Route} from 'react-router-dom';

import {PrivateRoutes, StaffRoutes} from './utils/PrivateRoutes';
import Home from './components/Home';
import { AddCourse } from './components/staff/AddCourse';
import { useAuth } from './context/AuthContext';
import { MyCourses } from './components/staff/MyCourses';

function App() {
  const {user, loading} = useAuth();
  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='courses/new' 
      element={
        <StaffRoutes>
          <AddCourse />
        </StaffRoutes>
      } 
      />
      <Route path='courses/mycourses'
      element={
        <StaffRoutes>
          <MyCourses />
        </StaffRoutes>
      }
      />
    </Routes>
    </>
  )
}

export default App;
