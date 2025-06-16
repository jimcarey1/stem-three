import {Routes, Route} from 'react-router-dom';

import {StaffRoutes} from './utils/PrivateRoutes';
import Home from './components/Home';
import { AddCourse } from './components/staff/AddCourse';
import { useAuth } from './context/AuthContext';
import { MyCourses } from './components/staff/MyCourses';
import {Course} from './components/Course'

function App() {
  const {user, loading} = useAuth();
  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/courses' element={<Home />}>
        <Route index element={
          <StaffRoutes>
            <MyCourses />
          </StaffRoutes>
        } 
        />
        <Route path=':id' element={
          <StaffRoutes>
            <Course />
          </StaffRoutes>
        }
        />
        <Route path='new' element={
          <StaffRoutes>
            <AddCourse />
          </StaffRoutes>
        } 
        />
      </Route>
    </Routes>
    </>
  )
}

export default App;
