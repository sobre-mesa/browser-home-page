import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectData, initData } from '../store/slices/dataSlice';
import '../styles/App.css';
import React from 'react';

import { SavedItemsSettingsModal } from '../components/SavedItemsSettingsModal';
function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(initData());
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <SavedItemsSettingsModal category={data.channels}/>
                {/* <Bar category={data.apps}/>
                <BookmarkPanel categories={data.categories}/>
                <Bar category={data.channels}/> */}
            </header>
        </div>
    );
}

export default App;
