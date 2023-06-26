import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectData, initData } from '../store/slices/dataSlice';
import '../styles/App.css';
import React from 'react';
import { Bar } from '../components/Bar';

import {CustomCategoryPanel} from '../components/CustomCategoryPanel';
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
                <div style={{marginTop: 25, height: 460, width: 964, backgroundColor: 'rgba(0, 0, 0, 0.503)', marginLeft: 'auto', marginRight: 'auto'}}>
                    <CustomCategoryPanel categories={data.categories} />
                </div>
                <Bar category={data.channels}/>
            </header>
        </div>
    );
}

export default App;
