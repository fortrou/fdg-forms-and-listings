import { useContext } from 'react';
import { FieldsContext } from './fieldsContext'; // путь туда, где ты создаёшь FieldsContext

export function useFieldsContext() {
    const context = useContext(FieldsContext);
    if (!context) {
        throw new Error('useFieldsContext must be used within a FieldsProvider');
    }
    return context;
}
