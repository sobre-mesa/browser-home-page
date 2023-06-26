import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectData, initData } from '../store/slices/dataSlice';
import '../styles/App.css';
import React from 'react';
import { Bar } from '../components/Bar';

function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(initData());
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <Bar category={data.apps}/>
                <div style={{height: 450}}>

                </div>
                <Bar category={data.channels}/>
            </header>
        </div>
    );
}

export default App;
