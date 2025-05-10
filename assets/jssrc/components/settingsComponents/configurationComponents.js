import {useRef, useState} from "@wordpress/element";
import MeasuringSwitcher from "../MeasuringSwitcher";

export function TextFieldComponent({value, path, method, label, measure = false}) {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            method(path, newValue);
        }, 700);
    };

    return (
        <div className="input-container">
            <label>{label}</label>
            <div className="input-holder">
                <input type="text" value={localValue}
                       onChange={(e) => setLocalValue(e.target.value)}
                       onKeyUp={handleKeyUp}
                />
                {measure && (
                    <MeasuringSwitcher param={measure.path} instance={measure.instance}
                                       current={measure.value} />
                )}
            </div>
        </div>
    )
}