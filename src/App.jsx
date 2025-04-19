import { memo, useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './NavBar'
import PasswordGenrator from './miniProject/PasswordGenrator.jsx'

function App() {
  const [themeColor, setThemeColor] = useState("#4285f4"); // Default color
  const [count,setCount]=useState(0);
  const callBackU=useCallback(()=>{
    console.log("callback");
  },[]);
  return (
    <>
      {/* <PasswordGenrator /> */}
      <ChildB callBackU={callBackU} />
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)}>Increment</button>
    </>
  )
}

const ChildB = memo(({ value }) => {
  console.log("ChildB rendered");
  return (
    <div>
    </div>
  );
});



export default App
