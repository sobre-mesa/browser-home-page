import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectData, initData } from './store/slices/dataSlice';
import './styles/App.css';
import React, { useEffect } from 'react';
import { Bar } from './components/Bar';
import { CustomCategoryPanel } from './components/CustomCategoryPanel';
import {CustomCategoriesSettingsModal} from './components/CustomCategoriesSettingsModal';

function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initData());
    }, [dispatch]);

    return (
        <div className="App">

            <CustomCategoriesSettingsModal
                open={true}
                setOpen={() => {}}
                onEdit={() => {}}
                categories={data.categories}
            />
            <header className="App-header">
                <div className="container">
                    <Bar category={data.apps} />
                    <div className="custom-category-panel-container">
                        <CustomCategoryPanel categories={data.categories} />
                    </div>
                    <Bar category={data.channels} />
                </div>
            </header>

        </div>
    );
}

export default App;
