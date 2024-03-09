import Home from './components/Home';
import { useState, useEffect } from 'react';
import { NasaApiUrl, NasaApiKey } from './components/constants';
import Figure from './components/Figure';
import Footer from './components/Footer';
import './App.css'


const App = () => {
  
  const today = new Date(Date.now()).toISOString().slice(0, 10); //ISOS format date

  const [date, setDate] = useState(today); //hold the current date

  const [apodData, setApodData] = useState(null); //hold APOD data

  const [loading, setLoading] = useState(true); //hold loading status

  
  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${NasaApiUrl}?api_key=${NasaApiKey}&date=${date}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setApodData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, [date]);

  
  return (
    <>
      <Home />
      <div>
        <h2>Astronomical Picture of the Day</h2>
        <p>This image corresponds to the date {date}</p>
        <input type="date" value={date} onChange={handleInput} />
        {loading ? (
          <p>Loading...</p>
        ) : apodData ? (
          <Figure data={apodData} />
        ) : (
          <p>No APOD data available</p>
        )}
      </div>
        <Footer />
    </>
  );
};
  
export default App;
