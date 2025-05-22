import {useState} from "@wordpress/element";
import {
    TextFieldComponent,
    ColorSelectorComponent,
    MultiValueComponent,
    ChooseImageComponent,
    SelectSettingComponent,
    NumericSettingComponent,
    SpacingComponent,
    SwitcherComponent,
} from "./configurationComponents.js"

import {DefaultIcons} from "../iconsComponent";
export function ConfigurationSet({set, method, object, label = ''}) {
    const DetectComponent = {
        enable: ({ data }) => (
            <SwitcherComponent method={method} state={data} label={'Enable'} path={''} />
        ),/*
        spacing: ({ field, data }) => (
            <SpacingComponent
                method={method}
                label={"Filters spacing"}
                outer={{
                    top: {
                        value: filters.current.responsive[frame].blockMargin.value.top,
                        path: `responsive.${frame}.blockMargin.value.top`
                    },
                    right: {
                        value: filters.current.responsive[frame].blockMargin.value.right,
                        path: `responsive.${frame}.blockMargin.value.right`
                    },
                    bottom: {
                        value: filters.current.responsive[frame].blockMargin.value.bottom,
                        path: `responsive.${frame}.blockMargin.value.bottom`
                    },
                    left: {
                        value: filters.current.responsive[frame].blockMargin.value.left,
                        path: `responsive.${frame}.blockMargin.value.left`
                    }
                }}
                internal={{
                    top: {
                        value: filters.current.responsive[frame].blockPadding.value.top,
                        path: `responsive.${frame}.blockPadding.value.top`
                    },
                    right: {
                        value: filters.current.responsive[frame].blockPadding.value.right,
                        path: `responsive.${frame}.blockPadding.value.right`
                    },
                    bottom: {
                        value: filters.current.responsive[frame].blockPadding.value.bottom,
                        path: `responsive.${frame}.blockPadding.value.bottom`
                    },
                    left: {
                        value: filters.current.responsive[frame].blockPadding.value.left,
                        path: `responsive.${frame}.blockPadding.value.left`
                    }
                }}
            />
        ),
        position: ({ field, data }) => (
            <SelectSettingComponent  label={"Font weight"} method={method} value={data} path={field} />
        ),
        fontSize: ({ field, data }) => (
            <TextFieldComponent label={"Font weight"} method={method} />
        ),
        fontWeight: ({ field, data }) => (
            <TextFieldComponent label={"Font weight"} method={method} />
        ),*/
    };

    const [expanded, setExpanded] = useState(false);

    const scrapeOptions = (field) => {

        return Object.keys(field).map((key) => {
            console.log(field)
            console.log(key)
            const Component = DetectComponent[key];
            return Component ? (
                <Component data={field[key]} />
            ) : null;
        });
    };
    return (
        <div className="configurations-set">
            <div className={`configurations-title-line ${expanded ? 'active' : ''}`} onClick={(e) => setExpanded(!expanded)}>
                <div className="config-title">{label}</div>
                <div className="config-settings">
                    <img src={DefaultIcons.settings} alt=""/>
                </div>
            </div>
            <div className="configurations-content">
                {expanded && (
                    <div className="field-details">
                        {set ? scrapeOptions(set) : null}
                    </div>
                )}
            </div>
        </div>
    )
}