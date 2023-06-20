import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectData, initData } from '../store/slices/dataSlice';
import '../styles/App.css';
import React from 'react';

import {Bar} from '../components/Bar';
import { BookmarkPanel } from '../components/BookmarkPanel';

function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(initData());
    }, []);
    console.table(data.channels);
    return (
        <div className="App">
            <header className="App-header">
                <Bar items={data.channels}/>
                <BookmarkPanel categories={data.categories}/>
                <Bar items={data.apps}/>
            </header>
        </div>
    );
}

export default App;
