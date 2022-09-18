import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import "./card.css"

const Cards = () => {
    const [cvalue,setcvalue] = useState(0)
    // const [rvalue,setrvalue] = useState(0)
    const [dvalue,setdvalue] = useState(0)
    const [lastUpdate,setlastUpdate] = useState("")

    useEffect(() => {
      const fetchData = async()=>{
        const data = await fetch('https://covid19.mathdro.id/api');
        const parsedData = await data.json();
        // console.log(parsedData.confirmed);
        setcvalue(parsedData.confirmed.value)
        // setrvalue(parsedData.recovered.value)
        setdvalue(parsedData.deaths.value)
        setlastUpdate(parsedData.lastUpdate)
      }
      fetchData();
    }, [])
    
  return (
    <>        
    <h2 className='text-center my-3 '>Covid Tracker</h2>
    <div className='container d-flex my-3 justify-content-center '>
        <div className="card mx-2  animated slideInLeft delay-2s" style={{width: "15rem", borderBottom:'10px solid orange'}}>
            <div className="card-body">
                <h5 className="card-title small">Infected</h5>
                <p className="card-text small">
                    <CountUp start={0} end={cvalue} duration={2.5} separator=','/>
                    
                </p>
                <p className="card-text small">{new Date(lastUpdate).toDateString()}</p>
                <p className="card-text small">Number of infected from COVID-19</p>
            </div>
        </div>

        <div className="card mx-2 animated slideInRight delay-2s" style={{width: "15rem", borderBottom:'10px solid red'}}>
            <div className="card-body">
                <h5 className="card-title small">Deaths</h5>
                <p className="card-text small">
                    <CountUp start={0} end={dvalue} duration={2.5} separator=','/>
                </p>
                <p className="card-text small">{new Date(lastUpdate).toDateString()}</p>
                <p className="card-text small">Number of deaths from COVID-19</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Cards