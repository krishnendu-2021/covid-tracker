 import React, { useState, useEffect } from "react";
 import Spinner from "./Spinner";


const Home = () => {
  const [status, setstatus] = useState(1);
  const [pin, setpin] = useState(null);
  const [data, setdata] = useState([]);
  const [state, setstate] = useState([]);
  const [stateid, setstateid] = useState(null);
  const [district, setdistrict] = useState([]);
  const [districtid, setdistrictid] = useState(null);
  const [districtdata, setdistrictdata] = useState([]);
  const [loading,setloading] = useState(false)
  const [flag, setflag] = useState(false)

  const radioHandler = (status) => {
    setstatus(status);
  };
  useEffect(() => {
    const getState = async () => {
      const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
      
      const state = await fetch(url);
      const parsedState = await state.json();
      setstate(await parsedState.states);
    };
    getState();
  }, []);

  const handleChangeid = async (e) => {
    setstateid(e.target.value);
  };

  useEffect(() => {
    const getDistrict = async () => {
      const district = await fetch(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`
      );
      const parsedDist = await district.json();
      setdistrict(await parsedDist.districts);
    };
    getDistrict();
  }, [stateid]);

  const handledistrict = (e) => {
    setdistrictid(e.target.value);
  };

  const getdate = () => {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    const dte = d.getDate();
    let sdate = dte + "-" + month + "-" + year;
    return sdate;
  };
  const onchange = (e) => {
    
    setpin(e.target.value);

  };

  const handleclick = async (e) => {
    e.preventDefault();
    setloading(true)
    let date = getdate();
    const data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
    );
    const parsedData = await data.json();
    // console.log(parsedData.error)
    if(parsedData.error === 'Invalid Pincode') {
      setloading(false)
      return alert("Invalid Pincode")
    }
    setdata(parsedData.sessions);
    if(parsedData.sessions.length === 0){
      setflag(true);
    }
    setloading(false)
  };

  const handledistrictData = async (e) => {
    e.preventDefault();
    setloading(true)
    let date = getdate();
    const districtdata = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtid}&date=${date}`
    );
    const parsedDistrictData = await districtdata.json();
    // console.log(parsedDistrictData)
    setdistrictdata(parsedDistrictData.sessions);
    if(parsedDistrictData.sessions.length=== 0){
      setflag(true)
    }
    setloading(false)
  };
  return (
    <div className="container my-3">
      <h1 className="text-center">Search Your Nearest Vaccination Center </h1>
      <p className="text-center my-4">
        Get a preview list of the nearest centers and check availability of
        vaccination slots
      </p>

      <div className="d-flex justify-content-around">
        <div className="radiowrapper" id="wrap1">
          <input
            type="radio"
            onClick={(e) => radioHandler(1)}
            checked={status === 1}
            name="radioSelect"
            id="sectionFirst"
            style={{ visibility: "hidden", width: 0 }}
          />
          <label htmlFor="sectionFirst">Search by Pin</label>
        </div>

        <div className="radiowrapper" id="wrap2">
          <input
            type="radio"
            onClick={(e) => radioHandler(2)}
            checked={status === 2}
            name="radioSelect"
            id="sectionTwo"
            style={{ visibility: "hidden", width: 0 }}
          />
          <label htmlFor="sectionTwo">Search by District </label>
        </div>
       
        {/* <div className="radiowrapper" id="wrap3">
          <input
            type="radio"
            onClick={(e) => radioHandler(3)}
            checked={status === 3}
            name="radioSelect"
            id="sectionThree"
            style={{ visibility: "hidden", width: 0 }}
          />
          <label htmlFor="sectionThree">Search on Map</label>
        </div> */}
      </div>
      {status === 1 && (
        <>
          <div
            style={{ backgroundColor: "#eaf1fb", height: "150px" }}
            className="d-flex justify-content-center align-items-center my-5"
          >
            <form className="d-flex" style={{ width: "40%" }}>
              <input
                type="pin"
                className="form-control"
                id="pin"
                aria-describedby="emailHelp"
                placeholder="Enter Your Pin"
                onChange={(e) => onchange(e)}
                maxLength={6}
              />
             
              <div className="d-flex justify-content-center mx-5">
                <button
                  onClick={handleclick}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="container row">
            {loading && <Spinner/>}
            { flag ?<div>No vaccination centers available</div>:
             data.map((element) => {
              return (
                <>
                <div className="col-md-4 my-2" key={element.session_id} >
                  <div className="card" style={{ width: " 18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">Address : {element.address}</p>
                      <p className="card-text">Type : {element.fee_type}</p>
                      <p className="card-text">
                        Age Limit : {element.min_age_limit}-
                        {element.max_age_limit}
                      </p>
                      <p className="card-text">Vaccine : {element.vaccine}</p>
                      <p className="card-text">
                        Slots :
                      </p>
                        {element.slots.map((ele) => {
                          return (
                            <div className="container">
                              <p className="card-text">time : {ele.time}</p>
                              <p className="card-text">seats : {ele.seats}</p>
                            </div>
                          );
                        })}                    
                      <a
                        rel="noreferrer"
                        href="https://www.cowin.gov.in"
                        target="_blank"
                        className="btn btn-primary"
                      >
                        Book Appiontment
                      </a>
                    </div>
                  </div>
                  </div>
                </>
                
              );
            })}
          </div>
        </>
      )}
      {status === 2 && (
        <>
          <div
            style={{ backgroundColor: "#eaf1fb", height: "150px" }}
            className="d-flex justify-content-center align-items-center my-5"
          >
            <select
              className="form-select mx-3"
              style={{ width: "30%" }}
              aria-label="Default select example"
              onChange={(e) => handleChangeid(e)}
            >
              <option defaultValue>--Select State--</option>
              {state.map((ele) => {
                return (
                  <option key={ele.state_id} value={ele.state_id}>
                    {ele.state_name}
                  </option>
                );
              })}
            </select>

            <select
              className="form-select"
              style={{ width: "30%" }}
              aria-label="Default select example"
              onChange={(e) => handledistrict(e)}
            >
              <option defaultValue>--Select District--</option>
              {district.map((ele) => {
                return (
                  <option key={ele.district_id} value={ele.district_id}>
                    {ele.district_name}
                  </option>
                );
              })}
            </select>
            <div className=" mx-5">
              <button
                onClick={handledistrictData}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="container row">
            {loading && <Spinner/>}
            {flag ? "No Vaccination Center available" :
            districtdata.map((element) => {
              return (
                <>
                <div className="col-md-4 my-2" key={element.session_id}>
                  <div className="card" style={{ width: " 18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">Address : {element.address}</p>
                      <p className="card-text">Type : {element.fee_type}</p>
                      <p className="card-text">
                        Age Limit : {element.min_age_limit}-
                        {element.max_age_limit}
                      </p>
                      <p className="card-text">Vaccine : {element.vaccine}</p>
                      <p className="card-text">
                        Slots :
                      </p>
                        {element.slots.map((ele) => {
                          return (
                            <div className="container">
                              <p className="card-text ">time : {ele.time}</p>
                              <p className="card-text my-2">seats : {ele.seats}</p>
                            </div>
                          );
                        })}
                      <a
                        rel="noreferrer"
                        href="https://www.cowin.gov.in"
                        target="_blank"
                        className="btn btn-primary"
                      >
                        Book Appiontment
                      </a>
                    </div>
                  </div>
                </div>
                </>
              ); 
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
