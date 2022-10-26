import './App.css';
import Header from './component/header/header';
import { useDispatch,useSelector} from 'react-redux';
import { increaseCounter,decreaseCounter } from './component/Redux/Action/counterAction';
const App = () => {
  const dispatch  =useDispatch()
  const count= useSelector(state=>state.counter.count)
  return (
    <div className="App">
      <Header></Header>
      
      

         <div>Count:{count}</div>

         <button onClick={()=>dispatch(increaseCounter())}>Increase Count</button>
         <button onClick={()=>dispatch(decreaseCounter())}>Decrease Count</button>


      
    </div>
  );
}

export default App;
