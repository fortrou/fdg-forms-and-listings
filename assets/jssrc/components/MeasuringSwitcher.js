import {useState} from "@wordpress/element";
import {useFieldsLogic} from "../functions";



export default function MeasuringSwitcher ({fieldData, current, available = ['px', 'em', 'custom']}) {
    const [currentState, setCurrentState] = useState(current);
    const [active, setActive] = useState(false)
    let newState = '';

    const {
        setMeasure
    } = useFieldsLogic();
    const handleMeasureSelect = (measure) => {
        //console.log(measure)
        setCurrentState(measure);
        setActive(false);
        setMeasure(fieldData.field, fieldData.index, fieldData.key, measure)
    }
    return (
        <div className="switcher-holder">
            <div className="current-state" onClick={(e) => setActive(!active)}>
                {currentState}
            </div>
            {active && (<div className="possible-states">
                {available.map(measure => (
                    <div onClick={(e) => handleMeasureSelect(measure)} className="measuring-item">
                        {measure}
                    </div>
                ))}
            </div>)}
        </div>
    )
}