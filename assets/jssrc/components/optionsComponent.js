import {useState, useRef} from "@wordpress/element";
import MeasuringSwitcher from './MeasuringSwitcher';
import {useFieldsContext} from "../useFieldContext";



export const PaddingComponent = ({field, values, index, section}) => {
    const [localState, setLocalState] = useState({
        top: values.value.top,
        right: values.value.right,
        bottom: values.value.bottom,
        left: values.value.left,
    });

    const {
        updateOption,
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
            updateOption(`${section}[${index}].options.padding.value.${property}`, value);
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
                        <input type="text" value={values.value.top}
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
                        <input type="text" value={values.value.right}
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
                        <input type="text" value={values.value.bottom}
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
                        <input type="text" value={values.value.left}
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
                        param={`${section}[${index}].options.padding.measure`}
                        current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const MarginComponent = ({field, values, index, section}) => {
    const [localState, setLocalState] = useState({
        top: values.value.top,
        right: values.value.right,
        bottom: values.value.bottom,
        left: values.value.left,
    });

    const {
        updateOption,
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
            updateOption(`${section}[${index}].options.margin.value.${property}`, value);
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
                        param={`${section}[${index}].options.margin.measure`}
                        current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const HeightComponent = ({field, values, index, section}) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const {
        updateOption,
    } = useFieldsContext();

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${section}[${index}].options.height.value`, newValue);
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
                    <MeasuringSwitcher param={`${section}[${index}].options.height.measure`} current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const WidthComponent = ({field, values, index, section}) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const {
        updateOption,
    } = useFieldsContext();

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${section}[${index}].options.width.value`, newValue);
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
                    <MeasuringSwitcher param={`${section}[${index}].options.width.measure`} current={values.measure} />

                </div>
            </div>
        </div>
    )
}

export const FontSizeComponent = ({ field, values, index, section}) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const {
        updateOption,
    } = useFieldsContext();

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(`${section}[${index}].options.fontSize.value`, newValue);
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
                    <MeasuringSwitcher param={`${section}[${index}].options.fontSize.measure`} current={values.measure} />
                </div>
            </div>
        </div>
    );
};


export const FontWeightComponent = ({field, values, index, section}) => {

    const {
        updateOption,
    } = useFieldsContext();

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font weight
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <select value={values.value} onChange={(e) => updateOption(`${section}[${index}].options.fontWeight.value`, e.target.value)}>
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