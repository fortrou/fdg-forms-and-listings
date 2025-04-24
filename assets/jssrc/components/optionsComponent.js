export default function PaddingComponent({field, values, updateOption}) {

    return (
        <div className="setting-holder">
            <div className="setting-title">
                Padding
            </div>
            <div className="setting-content">
                <div className="grid grid-4">
                    <div className="input-container">
                        <label>Top</label>
                        <input type="number" min="0" value={values.top}
                               onChange={(e) => updateOption(field, 'padding', 'top', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Right</label>
                        <input type="number" min="0" value={values.right}
                               onChange={(e) => updateOption(field, 'padding', 'right', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Bottom</label>
                        <input type="number" min="0" value={values.bottom}
                               onChange={(e) => updateOption(field, 'padding', 'bottom', parseInt(e.target.value, 10))}/>
                    </div>
                    <div className="input-container">
                        <label>Left</label>
                        <input type="number" min="0" value={values.left}
                               onChange={(e) => updateOption(field, 'padding', 'left', parseInt(e.target.value, 10))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}