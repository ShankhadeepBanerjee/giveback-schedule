import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from 'modules/home/home';
import Login from 'modules/login/login';
import {PrivateRoute} from 'private_route';
import ProfilePage from 'modules/profile/profile';
import Schedules from 'modules/schedules/schedules';
import CreateSchedule from 'modules/schedules/create/create-schedule';
import BookSchedule from 'modules/schedules/book/book-schedule';
import ScheduleDetails from 'modules/schedules/details/schedules-details';

/**
 *
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute redirectTo="/login" />}>
          <Route path="/profile/:email" element={<ProfilePage />} />
          <Route path="/schedules" element={<Schedules />}></Route>
          <Route path="/schedules/create" element={<CreateSchedule />}></Route>
          <Route path="/schedules/book" element={<BookSchedule />}></Route>
          <Route
            path="/schedules/details/:scheduleId"
            element={<ScheduleDetails />}
          ></Route>
          <Route path="/profile/:email/book" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
