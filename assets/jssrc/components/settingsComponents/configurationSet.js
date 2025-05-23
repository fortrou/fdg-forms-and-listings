import {useState} from "@wordpress/element";
import {
    TextFieldComponent,
    ColorSelectorComponent,
    MultiValueComponent,
    ChooseImageComponent,
    SelectSettingComponent,
    NumericSettingComponent,
    SpacingComponent,
    SwitcherComponent, FontWeightConfigComponent,
} from "./configurationComponents.js"

import {DefaultIcons} from "../iconsComponent";
export function ConfigurationSet({set, method, object, label = '', basicSelector}) {
    const DetectComponent = {
        enable: ({ data }) => (
            <SwitcherComponent method={method} state={data} label={'Enable'} path={basicSelector + '.enable'} />
        ),
        spacing: ({ field, data }) => (
            <SpacingComponent
                method={method}
                label={"Spacing"}
                outer={{
                    top: {
                        value: data.margin.value.top,
                        path: basicSelector + `.spacing.margin.value.top`
                    },
                    right: {
                        value: data.margin.value.right,
                        path: basicSelector + `.spacing.margin.value.right`
                    },
                    bottom: {
                        value: data.margin.value.bottom,
                        path: basicSelector + `.spacing.margin.value.bottom`
                    },
                    left: {
                        value: data.margin.value.left,
                        path: basicSelector + `.spacing.margin.value.left`
                    }
                }}
                internal={{
                    top: {
                        value: data.padding.value.top,
                        path: basicSelector + `.spacing.padding.value.top`
                    },
                    right: {
                        value: data.padding.value.right,
                        path: basicSelector + `.spacing.padding.value.right`
                    },
                    bottom: {
                        value: data.padding.value.bottom,
                        path: basicSelector + `.spacing.padding.value.bottom`
                    },
                    left: {
                        value: data.padding.value.left,
                        path: basicSelector + `.spacing.padding.value.left`
                    }
                }}
            />
        ),
        position: ({ data }) => (
            <SelectSettingComponent listSet={[
                {
                    key: 'inline',
                    label: 'In line'
                },
                {
                    key: 'below',
                    label: 'Below filters'
                }
            ]} label={"Position"} method={method} value={data} path={basicSelector + '.position'} />
        ),
        fontSize: ({ data }) => (
            <TextFieldComponent label={"Font size"} method={method} value={data} path={basicSelector + '.fontSize'} />
        ),
        background: ({ data }) => (
            <ColorSelectorComponent label={"Background color"} method={method} value={data} path={basicSelector + '.background'} />
        ),
        textColor: ({ data }) => (
            <ColorSelectorComponent label={"Text color"} method={method} value={data} path={basicSelector + '.textColor'} />
        ),
        fontWeight: ({ data }) => (
            <FontWeightConfigComponent label={"Font weight"} method={method} value={data} path={basicSelector + '.fontWeight'} />
        ),
        borderRadius: ({ data }) => (
            <TextFieldComponent value={data.value}
                                path={basicSelector + '.borderRadius.value'}
                                label={"Border radius"}
                                method={method}
                                measure={{
                                    path: basicSelector + '.borderRadius.measure',
                                    instance: 'filters',
                                    value: data.measure
                                }}
            />
        )
    };

    const [expanded, setExpanded] = useState(false);

    const scrapeOptions = (field) => {
        console.log(field);
        return Object.keys(field).map((key) => {
            const Component = DetectComponent[key];
            const data = field[key];

            return Component ? (
                <Component key={key} data={data} />
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
            {expanded && (
            <div className="configurations-content">

                    <div className="field-details grid grid-2">
                        {set ? scrapeOptions(set) : null}
                    </div>

            </div>
            )}
        </div>
    )
}