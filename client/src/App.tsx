import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectData, fetchUserData } from './store/slices/dataSlice';
import './App.css';
import React, { useEffect } from 'react';
import Bar from './components/Bar/Bar';
import CustomCategoryPanel from './components/CustomCategoryPanel/CustomCategoryPanel';
import CustomCategoriesSettingsModal from './components/CustomCategoriesSettingsModal/CustomCategoriesSettingsModal';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    useUser,
    RedirectToSignIn,
    SignOutButton
} from '@clerk/clerk-react';


if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
function Welcome() {
    const { user } = useUser();

    const data = useAppSelector(selectData);
    const dispatch = useAppDispatch();
    // console.log(user);
    useEffect(() => {
        dispatch(fetchUserData({userId: user?.id || ''}));
    }, [dispatch]);

    return ( 
        <div className="App">
            <CustomCategoriesSettingsModal
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

    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <SignedIn>
                <SignOutButton/>
                <Welcome />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}

export default App;
