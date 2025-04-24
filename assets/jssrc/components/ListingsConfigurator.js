import UsedFormFields from './usedFormFields';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

export default function ListingConfigurator({
                                                assignedFields,
                                                setAssignedFields,
                                                updateOption,
                                                styles,
                                                updateStyle,
                                                availableFields,
                                                addOptionToImageArea
                                            }) {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over }) => {
        console.log(123123);
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        console.log(activeId)
        console.log(overId);

        let sourceSection = null;
        let targetSection = null;

        for (const section in assignedFields) {
            if (Array.isArray(assignedFields[section]) &&
                assignedFields[section].some(field => field.key === activeId)) {
                sourceSection = section;
            }
            if (Array.isArray(assignedFields[section]) &&
                assignedFields[section].some(field => field.key === overId)) {
                targetSection = section;
            }
        }
        console.log(sourceSection)
        console.log(targetSection)

        if (!sourceSection || !targetSection) return;


        if (sourceSection === targetSection) {
            const oldIndex = assignedFields[sourceSection].findIndex(f => f.key === activeId);
            const newIndex = assignedFields[targetSection].findIndex(f => f.key === overId);

            const reordered = arrayMove(assignedFields[sourceSection], oldIndex, newIndex);

            setAssignedFields(prev => ({
                ...prev,
                [sourceSection]: reordered
            }));
        } else {
            const movedField = assignedFields[sourceSection].find(f => f.key === activeId);

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
                    <UsedFormFields
                        sectionId="lsection"
                        fields={assignedFields.lsection}
                        setFields={newFields =>
                            setAssignedFields(prev => ({ ...prev, lsection: newFields }))
                        }
                        updateOption={updateOption}
                    />
                </SortableContext>
            </DndContext>
        </div>
    );
}
