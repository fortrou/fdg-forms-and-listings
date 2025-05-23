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
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        posts,
        postTypes,
        formRef,
        submitPreviewForm,
    } = useFieldsContext();

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const allSections = Object.keys(assignedFields.current);
        const movedField = Object.values(assignedFields.current).flat().find(f => f.key === activeId);
        if (!movedField) return;

        let sourceSection = null;
        for (const section of allSections) {
            if (assignedFields.current[section].some(f => f.key === activeId)) {
                sourceSection = section;
                break;
            }
        }

        // Случай 1: дропнули на пустую секцию
        if (allSections.includes(overId)) {

            const targetSection = overId;
            if (targetSection === sourceSection) return;


            updateOption(sourceSection, assignedFields.current[sourceSection].filter((f) => f.key !== activeId))
            updateOption(targetSection, [
                movedField,
                ...assignedFields.current[targetSection]
            ])
            return;
        }

        // Случай 2: перемещение внутри секции или между секциями через другой элемент
        let targetSection = null;
        for (const section of allSections) {
            if (assignedFields.current[section].some(f => f.key === overId)) {
                targetSection = section;
                break;
            }
        }

        if (!sourceSection || !targetSection) return;

        if (sourceSection === targetSection) {
            const oldIndex = assignedFields.current[sourceSection].findIndex(f => f.key === activeId);
            const newIndex = assignedFields.current[targetSection].findIndex(f => f.key === overId);

            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(assignedFields.current[sourceSection], oldIndex, newIndex);

            updateOption(sourceSection, reordered)

        } else {
            updateOption(sourceSection, assignedFields.current[sourceSection].filter(f => f.key !== activeId))
            updateOption(targetSection, [movedField, ...assignedFields.current[targetSection]])
        }
    };



    return (
        <>
            <div className="setting-content">
                <div className="grid grid-2">
                    <select
                        value={styles.current.shared.currentSelectedImageField}
                        onChange={(e) => setStyles(`shared.currentSelectedImageField`, e.target.value)}
                    >
                        <option value="">Choose field</option>
                        {availableFields.map(field => (
                            <option key={field.key} value={field.key}>{field.name}</option>
                        ))}
                    </select>

                    <button onClick={() => addOptionToImageArea(styles.current.shared.currentSelectedImageField)}>
                        Add field
                    </button>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {/* Секция A */}
                    <SortableContext
                        items={[
                            ...assignedFields.current.fsection.map(f => f.key),
                            ...assignedFields.current.lsection.map(f => f.key)
                        ]}
                        strategy={verticalListSortingStrategy}
                    >
                        <UsedFormFields
                            sectionId="fsection"
                            fields={assignedFields.current.fsection}
                            updateOption={updateOption}
                        />

                        {styles.current.shared.useTwoSection && (
                            <UsedFormFields
                                sectionId="lsection"
                                fields={assignedFields.current.lsection}
                                updateOption={updateOption}
                            />
                        )}

                    </SortableContext>
                </DndContext>
            </div>
        </>
    );
}
