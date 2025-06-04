import {useState, useRef, useEffect} from "@wordpress/element";
import MeasuringSwitcher from './MeasuringSwitcher';
import {useFieldsContext} from "../useFieldContext";
import { RgbaColorPicker } from "react-colorful";



export const PaddingComponent = ({field, values, path, measure = ''}) => {
    const [localState, setLocalState] = useState({
        top: values.top,
        right: values.right,
        bottom: values.bottom,
        left: values.left,
    });

    useEffect(() => {
        setLocalState({
            top: values.top,
            right: values.right,
            bottom: values.bottom,
            left: values.left,
        });
    }, [values]);

    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localProperty, setLocalProperty] = useState('');
    const timeoutRef = useRef(null);

    const setLocals = (localState, localProperty) => {
        setLocalState(localState);
        setLocalProperty(localProperty);
    }

    const handleKeyUp = (value, property) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            updateOption(`${path}.values.${frame}.${property}`, value);
        }, 500);
    };

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Padding
            </div>
            <div className="setting-content">
                <div className="grid grid-4">
                    <div className="input-container">
                        <label>Top</label>
                        <input type="text" value={values.top}
                           onChange={(e) => {
                               const value = e.target.value;
                               setLocalState(prev => ({
                                   ...prev,
                                   top: value
                               }));
                           }}
                           onKeyUp={(e) => handleKeyUp(e.target.value, 'top')}
                        />
                    </div>
                    <div className="input-container">
                        <label>Right</label>
                        <input type="text" value={values.right}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       right: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'right')}
                        />
                    </div>
                    <div className="input-container">
                        <label>Bottom</label>
                        <input type="text" value={values.bottom}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       bottom: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'bottom')}
                        />
                    </div>
                    <div className="input-container">
                        <label>Left</label>
                        <input type="text" value={values.left}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       left: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'left')}
                        />
                    </div>
                    <MeasuringSwitcher
                        param={`${path}.measure`}
                        current={measure} />
                </div>
            </div>
        </div>
    )
}

export const MarginComponent = ({field, values, path, measure = ''}) => {
    const [localState, setLocalState] = useState({
        top: values.top,
        right: values.right,
        bottom: values.bottom,
        left: values.left,
    });
    useEffect(() => {
        setLocalState({
            top: values.top,
            right: values.right,
            bottom: values.bottom,
            left: values.left,
        });
    }, [values]);

    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localProperty, setLocalProperty] = useState('');
    const timeoutRef = useRef(null);

    const setLocals = (localState, localProperty) => {
        setLocalState(localState);
        setLocalProperty(localProperty);
    }

    const handleKeyUp = (value, property) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            updateOption(`${path}.values.${frame}.${property}`, value);
        }, 500);
    };

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Margin
            </div>
            <div className="setting-content">
                <div className="grid grid-4">
                    <div className="input-container">
                        <label>Top</label>
                        <input type="text" value={localState.top}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       top: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'top')}
                        />
                    </div>
                    <div className="input-container">
                        <label>Right</label>
                        <input type="text" value={localState.right}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       right: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'right')}/>
                    </div>
                    <div className="input-container">
                        <label>Bottom</label>
                        <input type="text" value={localState.bottom}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       bottom: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'bottom')}/>
                    </div>
                    <div className="input-container">
                        <label>Left</label>
                        <input type="text" value={localState.left}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   setLocalState(prev => ({
                                       ...prev,
                                       left: value
                                   }));
                               }}
                               onKeyUp={(e) => handleKeyUp(e.target.value, 'left')}/>
                    </div>
                    <MeasuringSwitcher
                        param={`${path}.measure`}
                        current={measure} />
                </div>
            </div>
        </div>
    )
}

export const HeightComponent = ({field, values, path, measure = ''}) => {
    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localValue, setLocalValue] = useState(values.value ?? '');
    const [localFrame, setLocalFrame] = useState(frame);
    if (frame != localFrame) {
        setLocalFrame(frame);
        setLocalValue(values.value ?? '')
    }
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${path}.values.${frame}.value`, newValue);
        }, 700);
    };
    return (
        <div className="setting-holder">
            <div className="setting-title">
                Height
            </div>
            <div className="setting-content">
                <div className="grid grid-1">
                    <div className="input-container">
                        <input type="text" min="0" value={localValue}
                               onChange={(e) => setLocalValue(e.target.value)}
                               onKeyUp={handleKeyUp}
                        />
                    </div>
                    <MeasuringSwitcher param={`${path}.measure`} current={measure} />
                </div>
            </div>
        </div>
    )
}

export const WidthComponent = ({field, values, path, measure = ''}) => {
    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localValue, setLocalValue] = useState(values.value ?? '');
    const [localFrame, setLocalFrame] = useState(frame);
    if (frame != localFrame) {
        setLocalFrame(frame);
        setLocalValue(values.value ?? '')
    }
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${path}.values.${frame}.value`, newValue);
        }, 700);
    };
    return (
        <div className="setting-holder">
            <div className="setting-title">
                Width
            </div>
            <div className="setting-content">
                <div className="grid grid-1">
                    <div className="input-container">
                        <input type="text" min="0" value={localValue}
                               onChange={(e) => setLocalValue(e.target.value)}
                               onKeyUp={handleKeyUp}/>
                    </div>
                    <MeasuringSwitcher param={`${path}.measure`} current={measure} />

                </div>
            </div>
        </div>
    )
}

export const FontSizeComponent = ({ field, values, path, measure = ''}) => {
    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localValue, setLocalValue] = useState(values.value ?? '');
    const [localFrame, setLocalFrame] = useState(frame);
    if (frame != localFrame) {
        setLocalFrame(frame);
        setLocalValue(values.value ?? '')
    }
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${path}.values.${frame}.value`, newValue);
        }, 700);
    };

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font size
            </div>
            <div className="setting-content">
                <div className="grid grid-1">
                    <div className="input-container">
                        <input
                            type="text"
                            min="1"
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            onKeyUp={handleKeyUp}
                        />
                    </div>
                    <MeasuringSwitcher param={`${path}.measure`} current={measure} available={['px', 'em', 'rem']} />
                </div>
            </div>
        </div>
    );
};

export const SimpleTextComponent = ({field, values, path, label = 'Font size', measure = '', responsive = true}) => {
    const {
        updateOption,
        frame
    } = useFieldsContext();

    const [localValue, setLocalValue] = useState(values.value ? values.value : (values ? values : ''));
    const [localFrame, setLocalFrame] = useState(frame);
    if (responsive) {
        if (frame != localFrame) {
            setLocalFrame(frame);
            setLocalValue(values.value ? values.value : (values ? values : ''))
        }
    }
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (responsive) {
                updateOption(`${path}.values.${frame}.value`, newValue);
            } else {
                updateOption(`${path}`, newValue);
            }
        }, 700);
    };
    return (
        <div className="property-holder">
            <div className="setting-title">
                {label}
            </div>
            <div className="setting-content">
                <div className="grid grid-1">
                    <div className="input-container">
                        <input
                            type="text"
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            onKeyUp={handleKeyUp}
                        />
                    </div>
                    {measure != '' &&
                        <MeasuringSwitcher param={`${path}.measure`} current={measure} />
                    }
                </div>
            </div>
        </div>
    )
}

export const FontWeightComponent = ({field, values, path}) => {

    const {
        updateOption,
        frame
    } = useFieldsContext();

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font weight
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <select value={values.value}
                                onChange={(e) => updateOption(`${path}.value`, e.target.value)}>
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
        </div>
    )
}

export function ColorSelectorComponent({ value = "#ffffff", path, method, label }) {
    console.log(path)
    const [colorPickerEnabled, setColorPickerEnabled] = useState(false);
    const timeoutRef = useRef(null);
    const {
        updateOption,
        frame
    } = useFieldsContext();
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
            updateOption(path + '.value', rgbaToHex(newColor));
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
                    <div className="color-picker-wrapper">
                        <div className="color-input-manual">
                            <input type="text" value={rgbaToHex(color)} onChange={(e) => handleChange(hexToRgba(e.target.value))}/>
                        </div>
                        <RgbaColorPicker color={color} onChange={handleChange} />
                    </div>
                )}
            </div>
        </div>
    );
}