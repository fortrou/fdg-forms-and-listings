export default function GridStyles({styles, updateStyle}) {
    return (
        <div className="tab-item" style={{display: styles.type === 'masonry' ? 'none' : 'block'}}>
            <div className="tab-heading">
                Grid styles
            </div>
            <div className="tab-content">
                <div className="setting-holder">
                    <div className="setting-content">
                        <div className="grid grid-3">
                            <div className="input-container">
                                <label>columns</label>
                                <input type="number" name="grid-columns" min="1" max="8"
                                       value={styles.gridColumns}
                                       onChange={(e) => updateStyle('gridColumns', parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>columns gap</label>
                                <input type="number" name="column-gap" value={styles.gridGap}
                                       onChange={(e) => updateStyle('gridGap', parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>row gap</label>
                                <input type="number" name="column-gap" value={styles.rowGap}
                                       onChange={(e) => updateStyle('rowGap', parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}