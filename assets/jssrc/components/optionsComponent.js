import {useState, useRef} from "@wordpress/element";
import MeasuringSwitcher from './MeasuringSwitcher';



export const PaddingComponent = ({field, values, updateOption, index}) => {
    const [localState, setLocalState] = useState({
        top: values.value.top,
        right: values.value.right,
        bottom: values.value.bottom,
        left: values.value.left,
    });
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
            updateOption(field, index, 'margin', property, value);
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
                        fieldData={{field: field, index: index, key: 'padding'}}
                        current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const MarginComponent = ({field, values, updateOption, index}) => {
    const [localState, setLocalState] = useState({
        top: values.value.top,
        right: values.value.right,
        bottom: values.value.bottom,
        left: values.value.left,
    });
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
            updateOption(field, index, 'margin', property, value);
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
                        fieldData={{field: field, index: index, key: 'margin'}}
                        current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const HeightComponent = ({field, values, updateOption, index}) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(field, index, 'height', '', newValue);
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
                    <MeasuringSwitcher current={values.measure} />
                </div>
            </div>
        </div>
    )
}

export const WidthComponent = ({field, values, updateOption, index}) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(field, index, 'width', '', newValue);
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
                    <MeasuringSwitcher current={values.measure} />

                </div>
            </div>
        </div>
    )
}

export const FontSizeComponent = ({ field, values, updateOption, index }) => {
    const [localValue, setLocalValue] = useState(values.value ?? '');
    const timeoutRef = useRef(null);

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            updateOption(field, index, 'fontSize', '', newValue);
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
                    <MeasuringSwitcher current={values.measure} />
                </div>
            </div>
        </div>
    );
};


export const FontWeightComponent = ({field, values, updateOption, index}) => {

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font weight
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <select value={values.value} onChange={(e) => updateOption(field, index, 'fontWeight', '', parseInt(e.target.value, 10))}>
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