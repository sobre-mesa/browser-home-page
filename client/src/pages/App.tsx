import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectData, initData } from '../store/slices/dataSlice';
import '../styles/App.css';
import React from 'react';

function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(initData());
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <p>{JSON.stringify(data)}</p>
            </header>
        </div>
    );
}

export default App;
