import React from 'react';

import SideBar from '../../components/Sidebar';
import UserDashboard from '../../components/UserDashboard';
import {Container} from '../../assets/styles/Home';

export default function Home() {
  return (
    <Container>
      <SideBar />
      <UserDashboard />
    </Container>
  );
}
