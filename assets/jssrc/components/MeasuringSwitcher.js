import {useState} from "@wordpress/element";
import {useFieldsLogic} from "../functions";
import {useFieldsContext} from "../useFieldContext";



export default function MeasuringSwitcher ({param, current, instance = 'styles', available = ['px', 'em', '%', 'custom']}) {
    const [currentState, setCurrentState] = useState(current);
    const [active, setActive] = useState(false)

    const {
        updateOption,
        setFilter,
        filters
    } = useFieldsContext();

    let newState = '';
    const handleMeasureSelect = (measure) => {
        //console.log(measure)
        setCurrentState(measure);
        setActive(false);

        if (instance == 'styles') {
            updateOption(param, measure)
        } else if (instance == 'filters') {
            setFilter(param, measure)
        }
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