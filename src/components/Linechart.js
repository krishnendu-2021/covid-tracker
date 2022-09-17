import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const Linechart = () => {
    const [confirmed,setconfirmed]= useState([])
    const [date, setdate] = useState([])
    const [deaths,setdeaths] = useState([])

    // useEffect(() => {
    //     let dataarray = []
    //     let timearray =[]
    //   const data = async()=>{
    //     const gdata =await fetch('https://data.covid19india.org/data.json')
    //     const pdata = await gdata.json();
        // console.log(pdata)
        // console.log( pdata.cases_time_series[1].dailyconfirmed);
        // console.log(pdata.cases_time_series.length)
        // for(let i=0;i<pdata.cases_time_series.length;i++){
            // console.log(pdata.cases_time_series[i].dailyconfirmed)
    //         dataarray.push( pdata.cases_time_series[i].dailyconfirmed)
    //         timearray.push(pdata.cases_time_series[i].dateymd)
    //     }
    //     setchartData(dataarray)
    //     setdate(timearray);
    //   }
    //   data();
    // }, [])

    useEffect(() => {
      const getData= async()=>{
        const date=[]
        const confirmed =[]
        const deaths = []
        const data = await fetch("https://covid19.mathdro.id/api/daily");
        const parsedData = await data.json();
        // console.log(parsedData.length);
        for(let i=0;i<parsedData.length;i++){
          deaths.push(parsedData[i].deaths.total)
          confirmed.push(parsedData[i].confirmed.total)
          date.push(parsedData[i].reportDate)
        }
        setdeaths(deaths)
        setconfirmed(confirmed)
        setdate(date)
      }
      getData()
    }, [])
    
  return (
    

    <div className='container justify-content-center my-3'>
        <Chart type='area'
            // height={550}
            // width={1000}  
            series={
              [{name:'dailyCases', data:confirmed, color:'#ffa500'},{name:'deaths',data:deaths, color:'#ff0000'}]
              
            }   
            options={
                {
                  title:{text:"Covid Daily Cases"},
                  xaxis:{
                    type:'datetime',
                    title:{text:'Date'},
                    categories:date,
                  },
                 
                  tooltip:{
                    x:{
                      format:'yyyy MMM dd'
                    }
                  },
                  stroke:{
                    // show:true,
                    curve: 'smooth',
                    colors:'black',
                    width:1,
   
                  },
                  dataLabels:{
                    enabled: false
                  },
                  fill:{
                    opacity:0.9,
                    type:'gradient',
                    gradient:{
                      shade:'dark',
                      type:'horizontal',
                      shadeIntensity:0,
                      opacityFrom:0.7,
                      opacityTo:0.9
                    }
                  },
                  // plotOptions:{
                  //   bar:{
                  //     distributed:false
                  //   }
                  // }
                }
            }
        
        />
    </div>
  )
}

export default Linechart