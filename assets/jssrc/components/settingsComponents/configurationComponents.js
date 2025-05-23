import { useRef, useState, useEffect } from "@wordpress/element";
import MeasuringSwitcher from "../MeasuringSwitcher";
import { RgbaColorPicker } from "react-colorful";
import {DefaultIcons} from "../iconsComponent";
import {useFieldsContext} from "../../useFieldContext";
import TabSwitcher from "../../switcher";

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


export function ColorSelectorComponent({ value = "#ffffff", path, method, label }) {
    const [colorPickerEnabled, setColorPickerEnabled] = useState(false);
    const timeoutRef = useRef(null);

    const hexToRgba = (hex) => {
        hex = hex.replace("#", "");
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
        return { r, g, b, a };
    };

    const rgbaToHex = ({ r, g, b, a }) => {
        const toHex = (v) => v.toString(16).padStart(2, "0");
        const alpha = Math.round(a * 255);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
    };

    const [color, setColor] = useState(hexToRgba(value));

    const handleChange = (newColor) => {
        setColor(newColor);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            method(path, rgbaToHex(newColor));
        }, 700);
    };

    return (
        <div className="input-container color-picker-component">
            <label>{label}</label>
            <div className="input-holder">
                <div className="color-preview" onClick={() => setColorPickerEnabled(!colorPickerEnabled)}>
                    <div
                        className="internal-block"
                        style={{
                            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        }}
                    />
                </div>
                {colorPickerEnabled && (
                    <RgbaColorPicker color={color} onChange={handleChange} />
                )}
            </div>
        </div>
    );
}

export function SpacingComponent({ outer, internal = {}, label, method }) {
    const [values, setValues] = useState({ outer, internal });
    const timeoutRefs = useRef({});

    const handleChange = (section, side, newValue) => {
        const updated = { ...values };
        updated[section][side] = {
            ...updated[section][side],
            value: newValue
        };
        setValues(updated);

        const path = updated[section][side].path;

        if (timeoutRefs.current[path]) {
            clearTimeout(timeoutRefs.current[path]);
        }

        timeoutRefs.current[path] = setTimeout(() => {
            method(path, newValue);
        }, 700);
    };

    useEffect(() => {
        return () => {
            Object.values(timeoutRefs.current).forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="input-container spacing-component">
            <label>{label}</label>
            <div className="spacing-container">
                <div className="spacing-margin-wrapper">
                    {['top', 'right', 'bottom', 'left'].map((side) => (
                        <div key={`margin-${side}`} className={`margin-${side}-line line-holder ${side}-line`}>
                            <input
                                type="text"
                                value={values.outer[side].value}
                                onChange={(e) => handleChange('outer', side, e.target.value)}
                                className="no-focus"
                            />
                        </div>
                    ))}

                    <div className="spacing-padding-wrapper">
                        {['top', 'right', 'bottom', 'left'].map((side) => (
                            <div key={`padding-${side}`} className={`margin-${side}-line line-holder ${side}-line`}>
                                <input
                                    type="text"
                                    value={values.internal[side].value}
                                    onChange={(e) => handleChange('internal', side, e.target.value)}
                                    className="no-focus"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



export function MultiValueComponent({values = [], method, label, measure = false}) {
    const [currentValues, setCurrentValues] = useState(values);
    const timeoutRefs = useRef({});

    const handleChange = (index, newValue) => {
        const updated = [...currentValues];
        updated[index] = { ...updated[index], value: newValue };
        setCurrentValues(updated);

        const path = updated[index].path;

        // Очистка debounce для этого поля
        if (timeoutRefs.current[path]) {
            clearTimeout(timeoutRefs.current[path]);
        }

        // Новый таймер на метод
        timeoutRefs.current[path] = setTimeout(() => {
            method(path, newValue);
        }, 700);
    };

    useEffect(() => {
        return () => {
            Object.values(timeoutRefs.current).forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="input-container multivalue-component">
            <label>{label}</label>
            <div className={`input-holder ${measure ? ' measure-enabled' : ''}`}>
                <div className={`settings-list grid grid-${values.length}`}>
                {currentValues.map((field, index) => (
                    <div className="item" key={index}>
                        <div className="input-label">{field.label}</div>
                        <div className="input-value">
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                </div>
                {measure && (
                    <MeasuringSwitcher param={measure.path} instance={measure.instance}
                                       current={measure.value} available={['px', '%']} />
                )}
            </div>
        </div>
    );
}

export function ChooseImageComponent({values = [], path, defaultPath, label = 'Sections direction', method, object}) {
    const {
        getter
    } = useFieldsContext();
    return (
        <div className="input-container">
            <label>{label}</label>
            <div className={`icons-list grid grid-${values.length} no-padding`}>
                {values.map(field => (
                    <div
                        className={`icon-item ${getter(object, path, defaultPath) === field.key ? 'active' : ''}`}
                        onClick={(e) => method(path, field.key)}>
                        <img src={field.icon}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function SelectSettingComponent({value, listSet = [], label, method, path}) {
    return (
        <div className={`input-container select-setting-component`}>
            <label>{label}</label>
            <div className="input-holder">
                <select value={value}
                        onChange={e => method(path, e.target.value)}
                >
                    {listSet.map(field => (
                        <option value={`${field.key}`}>{field.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export function NumericSettingComponent({value, label, method, path, limit = 10, positive = true}) {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef(null);

    const moderateValue = (value) => {
        if (limit != -1 && parseInt(value) > limit) {
            value = limit;
        } else if (limit != -1 && positive && parseInt(value) <= 0) {
            value = 0;
        } else {
            value = parseInt(value)
        }
        if (isNaN(value)) {
            value = '';
        }
        setLocalValue(value)
    }

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        moderateValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            method(path, localValue);
        }, 700);
    };
    return (
        <div className={`input-container numeric-setting-component`}>
            <label>{label}</label>
            <div className="input-holder">
                <input type="text" value={localValue}
                       onChange={(e) => moderateValue(e.target.value)}
                       onKeyUp={handleKeyUp}/>

            </div>
        </div>
    )
}

export function SwitcherComponent({label, state, method, path}) {
    return (
        <div className="setting-item">
            <div className="setting-title">
                {label}
            </div>
            <div className="setting-content">
                <TabSwitcher
                    value="enable_button"
                    label=""
                    active={state === true}
                    onClick={(val) => method(path, !state)}
                />
            </div>
        </div>
    )
}


export const FontWeightConfigComponent = ({method, value, path, label = 'Font weight'}) => {
    return (
        <div className="setting-holder">
            <div className="setting-title">
                {label}
            </div>
            <div className="setting-content">
                <div className="input-container">
                    <select value={value} onChange={(e) => method(path, e.target.value)}>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                    </select>
                </div>
            </div>
        </div>
    )
}