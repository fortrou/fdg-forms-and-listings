import { useState, useEffect } from '@wordpress/element';
import TabButton from './tabbutton';
import TabSwitcher from './switcher';
import ListingData from './tabs/listingData'
import GridStyles from './tabs/gridStyles';
import DynamicComponent from './components/dynamicCompontent';
import PreviewContent from "./previewContainer";

import { FieldsProvider } from './fieldsContext';



export default function PreviewApp() {

    return (
        <FieldsProvider>
            <PreviewContent />
        </FieldsProvider>
    );
}