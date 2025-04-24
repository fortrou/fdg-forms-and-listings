import { createRoot } from '@wordpress/element';
import PreviewApp from './listingapp';
let root = createRoot(document.getElementById('fil-single-listing-container'));


root.render(<PreviewApp />);