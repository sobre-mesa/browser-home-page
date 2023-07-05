import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectData, initData } from './store/slices/dataSlice';
import './styles/App.css';
import React, { useEffect } from 'react';
import { Bar } from './components/Bar';
import { CustomCategoryPanel } from './components/CustomCategoryPanel';
import {CustomCategoriesSettingsModal} from './components/CustomCategoriesSettingsModal';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
    SignOutButton
} from '@clerk/clerk-react';


if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
function Welcome({data}) {
    const { user } = useUser();
    console.log(user.id)
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
function App() {
    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    // console.log(user);
    useEffect(() => {

        dispatch(initData());
    }, [dispatch]);

    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <SignedIn>
                <SignOutButton/>
                <Welcome data={data}/>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}

export default App;
