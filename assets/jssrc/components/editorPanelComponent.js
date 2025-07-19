import {useState} from "@wordpress/element";
import {
    PaddingComponent,
    MarginComponent,
    HeightComponent,
    WidthComponent,
    FontSizeComponent,
    FontWeightComponent,
    SimpleTextComponent,
    ColorSelectorComponent,
    SimpleSelectComponent
} from "./optionsComponent";
import {useFieldsContext} from "../useFieldContext";
import {DefaultIcons} from "./iconsComponent";

export default function EditorPanel() {
    const DetectComponent = {
        padding: MarginComponent,
        margin: MarginComponent,
        height: HeightComponent,
        width: WidthComponent,
        fontSize: FontSizeComponent,
        fontWeight: FontWeightComponent,
        borderRadius: SimpleTextComponent,
        background: ColorSelectorComponent,
        textColor: ColorSelectorComponent,
    };

    const {
        removeField,
        frame,
        activeConfigurationField,
        configurationsEditor,
        editablePath,
        availableFilterFields,
        setConfigurationsEditor,
        setActiveConfigurationField,
        updateOption
    } = useFieldsContext()

    const scrapeOptions = (field, frame) => {
        return Object.keys(field.options).map((key) => {
            const Component = DetectComponent[key];
            return Component ? (
                <Component
                    key={key}
                    path={editablePath + `.options.${key}`}
                    field={field}
                    frames={field.options[key].responsive ? field.options[key].values : []}
                    values={field.options[key].responsive ? field.options[key].values[frame].set : field.options[key].value}
                    label={field.options[key]?.label}
                    measure={field.options[key].responsive && field.options[key]?.values[frame]?.measure ? field.options[key].values[frame].measure : ''}
                    responsive={field.options[key].responsive}
                />
            ) : null;
        });
    };



    const DetectProperty = {
        text: SimpleTextComponent,
        select: SimpleSelectComponent
    };

    const scrapeProperties = (field) => {
        return Object.keys(field.properties).map((key) => {
            const fieldData = field.properties[key];
            const Component = DetectProperty[fieldData.type];
            return Component ? (
                <Component
                    key={key}
                    path={editablePath + `.properties.${key}.content`}
                    field={fieldData}
                    values={fieldData.content}
                    label={fieldData.label}
                    responsive={false}
                />
            ) : null;
        });
    };

    const [activeBlockTab, setActiveBlockTab] = useState('styles');

    return (
        <div className="editor-panel" style={{display: (configurationsEditor) ? 'block' : 'none'}}>
            <div className="block-title-line">
                <h3>Block settings</h3>
                <div className="block-title">
                    {activeConfigurationField.name}
                </div>

                <img src={DefaultIcons.crossClose} alt="" onClick={e => {
                    setActiveBlockTab("styles");
                    setConfigurationsEditor(false);
                    setActiveConfigurationField(false);
                }}/>
            </div>
            <div className="block-tabs-line">
                <div className={`tab-title ${activeBlockTab == "styles" ? "active" : ""}`}
                     onClick={e => {setActiveBlockTab("styles")}}>styles</div>
                <div
                    className={`tab-title ${activeBlockTab == "configurations" ? "active" : ""}`}
                    onClick={e => {setActiveBlockTab("configurations")}}>configurations</div>
            </div>
            <div className="block-tabs">
                <div className="block-tab-item options-tab"
                     style={{display: activeBlockTab == "styles" ? "block" : "none"}}>
                    <div className="setting-holder">
                        <div className="setting-title">Select field to show</div>
                        <div className="setting-content">
                            <select value={activeConfigurationField.associatedMeta} onChange={(e) => {
                                updateOption(`${editablePath}.associatedMeta`, e.target.value)
                            }}>
                                <option value="">Choose field</option>
                                {availableFilterFields.map(field => {
                                    let fieldContext = field.split('|');
                                    let fieldName = fieldContext[2].replace('_', ' ');
                                    return (
                                        <option value={`${field}`}>{fieldName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    {activeConfigurationField.options ? scrapeOptions(activeConfigurationField, frame) : null}
                </div>
                <div className="block-tab-item properties-tab"
                     style={{display: activeBlockTab == "configurations" ? "block" : "none"}}>
                    {activeConfigurationField.properties ? scrapeProperties(activeConfigurationField) : null}
                </div>
            </div>
        </div>
    )
}