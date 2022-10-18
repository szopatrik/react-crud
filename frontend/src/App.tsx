import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './Navbar'
import Users from './Users'
import UserCreate from './UserCreate'
import UserUpdate from './UserUpdate'

interface appProps {
  basePath: string
}

export default function App(props: appProps) {
  const [searchInput, setSearchInput] = useState('');
  const basePath = props.basePath

    return (
      <Router>
        <div>
          <Navbar basePath={basePath} setSearchInput={setSearchInput}/>
          <Routes>
            <Route path={`${basePath}`} element={<Users basePath={basePath} searchInput={searchInput} />}/>
            <Route path={`${basePath}create`} element={<UserCreate basePath={basePath} />}/>
            <Route path={`${basePath}update/:id`} element={<UserUpdate basePath={basePath} />}/>
          </Routes>
        </div>
      </Router>
  );
}