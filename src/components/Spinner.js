import loading from '../loading.gif'

const Spinner = () => {
    const myStyles = {
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#fff",
        opacity:" 0.6",
        zIndex: "1000",
    }
  return (
    <div className='text-center' style={myStyles}>
        <img className='my-3' src={loading} alt='loading'/>
      </div>
  )
}

export default Spinner