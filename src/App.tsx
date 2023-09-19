import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { CMDBPage } from './pages/CMDBPage/CMDBPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cmdb" element={<CMDBPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
