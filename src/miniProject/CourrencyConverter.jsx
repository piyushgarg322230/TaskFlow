import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";  // ✅ Import Ba
Chart.register(...registerables);

export const APIKEY = "fca_live_Xi8ugaO4H6whB0rVZLchriSyYrWU20ljjmM3bFHU";
// export const URL = "https://api.currencyapi.com/v3/";
export const URL ="https://api.freecurrencyapi.com/v1/";
export const listApi={
    latest:"latest",
    historica:"historical",
}
const CurrencyConverter = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpenTwo, setDropdownOpenTwo] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedCurrencyTwo, setSelectedCurrencyTwo] = useState("INR");
    const [currencies, setCurrencies] = useState([]);
    const [currentCurrency, setToCurrency] = useState(1);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(`${URL+listApi.latest}?apikey=${APIKEY}`).
                    catch((error) => { window.alert("Featch API " + error) }).
                    finally(() => { console.log("Data Fetch SucessFully") });
                const data = await response.json();
                setCurrencies(Object.keys(data.data));
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchCurrencies();
        currenciesConvertOf(selectedCurrency,selectedCurrencyTwo);

        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ["1992", "1995", "1998", "2001", "2003", "2007", "2012", "2015", "2017"],
                    datasets: [{
                        label: 'Exchange Rate',
                        data: [10, 11, 12, 13, 14, 14, 15, 16, 17],
                        borderColor: '#4c4c9d',
                        backgroundColor: 'rgba(76, 76, 157, 0.2)',
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: '#d67dee',
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: false }
                    }
                }
            });
        }
        // updateChartData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    async function getLastFiveYears() {
        const currentYear = new Date().getFullYear();
        async function dateWiseDataFetch(year, currencyFrom, currencyTo,callback) {
            try {
                const api = `${URL + listApi.historica}?apikey=${APIKEY}&currencies=${currencyTo}&base_currency=${currencyFrom}&date=${year}-01-01`;
                const response = await fetch(api);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
                callback({ year, value: data.data[currencyTo].value });
            } catch (error) {
                console.error(`Error fetching currency data for ${year}:`, error);
                return { year, value: null }; // Return null to handle errors gracefully
            }
        }
    
        const dataList = [];
        let i=currentYear - 5;
        let j=0;
        // while(i <= currentYear){
            if(i!=j){
                j=i;
                dateWiseDataFetch(i, selectedCurrency, selectedCurrencyTwo,(data)=>{
                    dataList.push(data);
                    i++;
                })
            }else{
                console.log("dagajgkdbsuoghos g oi[shghois fgoif");
            }
        // }
    
        const results = dataList // Wait for all API calls to complete
        console.log(results); // Array of { year, value }
    
        return results;
    }

    
    function updateChartData() {
        const years = getLastFiveYears();
        const yearsData = Object.keys(years);
        const dataValues = Object.values(years);
        if (chartInstance.current) {
            chartInstance.current.data.labels = yearsData;
            chartInstance.current.data.datasets[0].data = dataValues;
            chartInstance.current.update();
        }
    }

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const toggleDropdownTwo = () => setDropdownOpenTwo(!isDropdownOpen);
    const selectCurrency = (currency) => {
        setSelectedCurrency(currency);
        setDropdownOpen(false);
    };


    const selectCurrencyTwo = (currency) => {
        setSelectedCurrencyTwo(currency);
        setDropdownOpenTwo(false);
    };

    const currenciesConvertOf = async(currencyFrom,currencyTo) => {
        try {
            const response = await fetch(`${URL+listApi.latest}?apikey=${APIKEY}&currencies=${currencyTo}&base_currency=${currencyFrom}`).
                catch((error) => { window.alert("Featch API currenciesConvertOf \n" + error) }).
                finally(() => { console.log("Data Fetch SucessFully") });
            const data = await response.json();
            // setToCurrency(data.data[currencyTo].value);
            setToCurrency(data.data[currencyTo]);
        } catch (error) {
            console.error("Error fetching currency data:", error);
        }
    }


    return (
        <div style={styles.overlay}>
            <div style={styles.converterCard}>
                <button style={styles.closeBtn}>&times;</button>
                <h2 style={styles.heading}>CURRENCY CONVERTER</h2>
                <p>1 {selectedCurrency} equals</p>
                <h3 style={styles.rate}>{currentCurrency} {selectedCurrencyTwo}</h3>



                <div style={styles.currencyInput}>
                    <div style={styles.dropdownContainer}>
                        <button onClick={toggleDropdown} style={styles.input}>{selectedCurrency} ▼</button>
                        {isDropdownOpen && (
                            <ul style={styles.dropdown}>
                                {currencies.map(currency => (
                                    <li key={currency} onClick={() => selectCurrency(currency)} style={styles.dropdownItem}>{currency}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <span>&rarr;</span>
                    <div style={styles.dropdownContainer}>
                        <button onClick={toggleDropdownTwo} style={styles.input}>{selectedCurrencyTwo} ▼</button>
                        {isDropdownOpenTwo && (
                            <ul style={styles.dropdown}>
                                {currencies.map(currency => (
                                    <li key={currency} onClick={() => selectCurrencyTwo(currency)} style={styles.dropdownItem}>{currency}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>



                <button style={styles.resultBtn} onClick={()=>{ 
                    currenciesConvertOf(selectedCurrency,selectedCurrencyTwo);
                    chartInstance.current.update();
                }}>Result</button>
                <div style={styles.chartContainer}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to top, #6a0572, #c850c0)' },
    converterCard: { background: 'white', padding: '35px', borderRadius: '15px', textAlign: 'center', boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.25)', position: 'relative', width: '420px' },
    closeBtn: { position: 'absolute', top: '15px', right: '15px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '35px', height: '35px', fontSize: '20px', cursor: 'pointer' },
    heading: { fontSize: '24px', marginBottom: '12px' },
    rate: { fontSize: '22px', color: '#3e3e7c', marginBottom: '20px' },
    currencyInput: { display: 'flex', justifyContent: 'center', gap: '12px', margin: '18px 0' },
    dropdownContainer: { position: 'relative' },
    input: { width: '110px', textAlign: 'center', padding: '10px', border: 'none', background: '#f3f3f3', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', color: '#3e3e7c', cursor: 'pointer' },
    dropdown: { position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: '200px', overflowY: 'scroll', background: 'white', borderRadius: '6px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', listStyle: 'none', padding: 0, margin: 0, zIndex: 1000 },
    dropdownItem: { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd', textAlign: 'center', background: '#fff', transition: '0.3s' },
    dropdownItemHover: { background: '#f1f1f1' },
    resultBtn: { background: '#3e3e7c', color: 'white', border: 'none', padding: '14px', width: '100%', borderRadius: '8px', cursor: 'pointer', fontSize: '20px', marginTop: '12px' },
    chartContainer: { marginTop: '25px', height: '250px' }
};

export default CurrencyConverter;

