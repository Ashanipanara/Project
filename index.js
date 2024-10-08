import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';


// Sample data for Tiles
const tilesData = [
  { id: 1, name: 'Glossy Surface', price: 355, cost: 320, image: 'https://dukaan.b-cdn.net/700x700/webp/upload_file_service/41af7fbb-95db-40b3-9051-6a4255ae6e96/rb-2-600x1200mm-gvt.jpg' },
  { id: 2, name: 'Matt Surface', price: 355, cost: 320, image: 'https://5.imimg.com/data5/SELLER/Default/2024/7/434520592/RZ/SV/AM/147173319/marlin-bianco-500x500.jpg' },
  { id: 3, name: 'carving Surface', price: 420, cost: 360, image:'https://5.imimg.com/data5/SELLER/Default/2023/5/304710867/MH/XX/YY/188669954/600x1200mm-glazed-vitrified-tiles-carving-series-1000x1000.jpg' },
   
  
];

const SalesForm = ({ addSale }) => {
  const [tilesId, setTilesId] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => 
    {

    e.preventDefault();
    if (tilesId && quantity > 0) {
      const selectedtiles = tilesData.find(tiles => tiles.id === parseInt(tilesId));
      addSale(selectedtiles.price * quantity, selectedtiles.cost * quantity);
      setTilesId('');
      setQuantity(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group m-3 ">
        <label><h4> Select Tiles:-  </h4> </label>
        <select className="form-control" value={tilesId} onChange={(e) => setTilesId(e.target.value)} required>
          <option value="">Select...</option>
          {tilesData.map(tiles=> (
            <option key={tiles.id} value={tiles.id}>{tiles.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group m-3 ">
        <label><h4>Quantity:-</h4></label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary m-3">Add Sale</button>
    </form>
  );
};

const SalesSummary = ({ totalSales, totalCosts }) => {
  const profit = totalSales - totalCosts;

  return (
    <div className="mt-4 text-center">
      <h3 class="text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 m-2">Sales Summary</h3>
      <div class="text-secondary">
      <p>Total Sales: {totalSales.toFixed(2)}  </p>
      <p>Total Costs: {totalCosts.toFixed(2)}</p>
      <p>Profit: {profit.toFixed(2)}</p>
    </div>
    </div>
  );
};

const Tileslist = ({ addSale }) => (
  <div className="row">
    {tilesData.map(tiles => (
      <div className="col-md-4" key={tiles.id}>
        <div >
          <img src={tiles.image} alt={tiles.name} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title text-center">{tiles.name}</h3>
            <h5 className="text-center">Price: {tiles.price.toFixed(2)}</h5>
            <h5 className="card-text text-center">Cost: {tiles.cost.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Home = ({ addSale, totalSales, totalCosts }) => (
  <div class =" border border-primary">
    <h1 class=" text-center p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 " >PARI CERAMICS</h1>
    <h5 class="  text-center border border-primary-subtle rounded-3 m-1 ">Tiles Daily Profit/Loss Tracker</h5>
    <Tileslist addSale={addSale} />
    <SalesForm addSale={addSale} />
    <SalesSummary totalSales={totalSales} totalCosts={totalCosts} />
  </div>
);

const App = () => {
  const [sales, setSales] = useState([]);

  const addSale = (amount, cost) => {
    setSales([...sales, { amount, cost }]);
  };

  const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalCosts = sales.reduce((acc, sale) => acc + sale.cost, 0);

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home addSale={addSale} totalSales={totalSales} totalCosts={totalCosts} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
