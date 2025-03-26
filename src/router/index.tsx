import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import ConfirmOrder from '../pages/ConfirmOrder';
import ChooseSeating from '../pages/ChooseSeating';
import ChooseTimeOrder from '../pages/ChooseTimeOrder';
import Pin from '../pages/Pin';
import Receipt from '../pages/Receipt';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/seating" element={<ChooseSeating />} />
        <Route path="/time" element={<ChooseTimeOrder />} />
        <Route path="/pin" element={<Pin />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
