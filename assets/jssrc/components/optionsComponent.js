export const PaddingComponent = ({field, values, updateOption, index}) => {

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Padding
            </div>
            <div className="setting-content">
                <div className="grid grid-4">
                    <div className="input-container">
                        <label>Top</label>
                        <input type="number" min="0" value={values.value.top}
                               onChange={(e) => updateOption(field, index, 'padding', 'top', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Right</label>
                        <input type="number" min="0" value={values.value.right}
                               onChange={(e) => updateOption(field, index, 'padding', 'right', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Bottom</label>
                        <input type="number" min="0" value={values.value.bottom}
                               onChange={(e) => updateOption(field, index, 'padding', 'bottom', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Left</label>
                        <input type="number" min="0" value={values.value.left}
                               onChange={(e) => updateOption(field, index, 'padding', 'left', parseInt(e.target.value, 10))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const MarginComponent = ({field, values, updateOption, index}) => {
    return (
        <div className="setting-holder">
            <div className="setting-title">
                Margin
            </div>
            <div className="setting-content">
                <div className="grid grid-4">
                    <div className="input-container">
                        <label>Top</label>
                        <input type="number" min="0" value={values.value.top}
                               onChange={(e) => updateOption(field, index, 'margin', 'top', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Right</label>
                        <input type="number" min="0" value={values.value.right}
                               onChange={(e) => updateOption(field, index, 'margin', 'right', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Bottom</label>
                        <input type="number" min="0" value={values.value.bottom}
                               onChange={(e) => updateOption(field, index, 'margin', 'bottom', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Left</label>
                        <input type="number" min="0" value={values.value.left}
                               onChange={(e) => updateOption(field, index, 'margin', 'left', parseInt(e.target.value, 10))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const HeightComponent = ({field, values, updateOption, index}) => {

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Height
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <input type="text" min="0" value={values.value}
                               onChange={(e) => updateOption(field, index, 'height', '', e.target.value !== 'auto' ? parseInt(e.target.value, 10) : 'auto')}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export const WidthComponent = ({field, values, updateOption, index}) => {
    return (
        <div className="setting-holder">
            <div className="setting-title">
                Width
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <input type="text" min="0" value={values.value}
                               onChange={(e) => updateOption(field, index, 'width', '', parseInt(e.target.value, 10))}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export const FontSizeComponent = ({field, values, updateOption, index}) => {
console.log(values);
console.log(field)
    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font size
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <input type="text" min="1" value={values.value}
                               onChange={(e) => updateOption(field, index, 'fontSize', '', parseInt(e.target.value, 10))}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export const FontWeightComponent = ({field, values, updateOption, index}) => {

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Font weight
            </div>
            <div className="setting-content">
                <div className="grid grid-2">
                    <div className="input-container">
                        <select value={values.value} onChange={(e) => updateOption(field, index, 'fontSize', '', parseInt(e.target.value, 10))}>
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