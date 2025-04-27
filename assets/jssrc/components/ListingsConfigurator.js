import UsedFormFields from './usedFormFields';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import TabSwitcher from "../switcher";
import {useFieldsContext} from "../useFieldContext";

export default function ListingConfigurator() {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        assignedFields,
        setAssignedFields,
        updateStyle,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        posts,
        postTypes
    } = useFieldsContext();

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const allSections = Object.keys(assignedFields);
        const movedField = Object.values(assignedFields).flat().find(f => f.key === activeId);
        if (!movedField) return;

        let sourceSection = null;
        for (const section of allSections) {
            if (assignedFields[section].some(f => f.key === activeId)) {
                sourceSection = section;
                break;
            }
        }

        // 👇 Случай 1: дропнули на пустую секцию
        if (allSections.includes(overId)) {
            const targetSection = overId;
            if (targetSection === sourceSection) return;

            setAssignedFields(prev => ({
                ...prev,
                [sourceSection]: prev[sourceSection].filter(f => f.key !== activeId),
                [targetSection]: [movedField, ...prev[targetSection]]
            }));
            return;
        }

        // 👇 Случай 2: перемещение внутри секции или между секциями через другой элемент
        let targetSection = null;
        for (const section of allSections) {
            if (assignedFields[section].some(f => f.key === overId)) {
                targetSection = section;
                break;
            }
        }

        if (!sourceSection || !targetSection) return;

        if (sourceSection === targetSection) {
            const oldIndex = assignedFields[sourceSection].findIndex(f => f.key === activeId);
            const newIndex = assignedFields[targetSection].findIndex(f => f.key === overId);

            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(assignedFields[sourceSection], oldIndex, newIndex);

            setAssignedFields(prev => ({
                ...prev,
                [sourceSection]: reordered
            }));
        } else {
            // drag из одной секции в другую (через элемент)
            setAssignedFields(prev => ({
                ...prev,
                [sourceSection]: prev[sourceSection].filter(f => f.key !== activeId),
                [targetSection]: [movedField, ...prev[targetSection]]
            }));
        }
    };



    return (

        <div className="setting-content">
            <div className="grid grid-2">
                <select
                    value={styles.currentSelectedImageField}
                    onChange={(e) => updateStyle('currentSelectedImageField', e.target.value)}
                >
                    <option value="">Choose field</option>
                    {availableFields.map(field => (
                        <option key={field.key} value={field.key}>{field.name}</option>
                    ))}
                </select>

                <button onClick={() => addOptionToImageArea(styles.currentSelectedImageField)}>
                    Add field
                </button>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                {/* Секция A */}
                <SortableContext
                    items={[
                        ...assignedFields.fsection.map(f => f.key),
                        ...assignedFields.lsection.map(f => f.key)
                    ]}
                    strategy={verticalListSortingStrategy}
                >
                    <UsedFormFields
                        sectionId="fsection"
                        fields={assignedFields.fsection}
                        setFields={newFields =>
                            setAssignedFields(prev => ({ ...prev, fsection: newFields }))
                        }
                        updateOption={updateOption}
                    />

                    {styles.postDisplay === 'flex' && (
                        <TabSwitcher
                            value="use_two_sections"
                            label="Use two sections"
                            active={styles.useTwoSection === true}
                            onClick={(val) => updateStyle('useTwoSection', !styles.useTwoSection)}
                        />
                    )}

                    {styles.useTwoSection && (
                        <UsedFormFields
                            sectionId="lsection"
                            fields={assignedFields.lsection}
                            setFields={newFields =>
                                setAssignedFields(prev => ({ ...prev, lsection: newFields }))
                            }
                            updateOption={updateOption}
                        />
                    )}

                </SortableContext>
            </DndContext>
        </div>
    );
}
