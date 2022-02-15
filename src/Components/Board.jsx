import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";

//variable to create log for when the status of a device changes
let log = [];

function Board({ data }) {
  let [isActive, setActive] = useState(false);

  let handleToggle = (e) => {
    e.preventDefault()
    setActive(!isActive);
  };

  //function to give all devices from API an id
  let idDevices = data.devices.map((item, index) => {
    item["id"] = `000000000${index}`;
    return item;
  });

  //generating list of just ids for the column data below
  let ids = idDevices.map((item) => {
    return item.id;
  });

  //column data
  const colData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "Requested",
        devicelist: ids,
      },
      "column-2": { id: "column-2", title: "Purchased", devicelist: [] },
      "column-3": { id: "column-3", title: "Shipped", devicelist: [] },
      "column-4": { id: "column-4", title: "Installed", devicelist: [] },
    },

    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };

  //hook to update the columns
  const [dragCol, setDragCol] = useState(colData);

  //function containing all of the possible board movement scenarios
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //For no destination
    if (!destination) {
      return;
    }

    //For re-arranging columns
    if (type === "column") {
      const newColumnOrder = dragCol.columnOrder;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...dragCol,
        columnOrder: newColumnOrder,
      };
      setDragCol(newState);
      return;
    }

    //For when a device is dropped into a new spot in the same column
    const start = dragCol.columns[source.droppableId];
    const end = dragCol.columns[destination.droppableId];

    if (start === end) {
      const newDeviceIds = start.devicelist;
      newDeviceIds.splice(source.index, 1);
      newDeviceIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        devicelist: newDeviceIds,
      };
      const newState = {
        ...dragCol,
        columns: {
          ...dragCol.columns,
          [newColumn.id]: newColumn,
        },
      };
      setDragCol(newState);
      return;
    }

    //For when a device is dropped in a new column
    const startDeviceIds = start.devicelist;
    startDeviceIds.splice(source.index, 1);
    const newStart = {
      ...start,
      devicelist: startDeviceIds,
    };

    const endDeviceIds = end.devicelist;
    endDeviceIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      devicelist: endDeviceIds,
    };

    const newState = {
      ...dragCol,
      columns: {
        ...dragCol.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      },
    };

    setDragCol(newState);
    log.push(
      `The status of item ID-${draggableId} has changed from "${start.title}" to ${end.title}"`
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="device-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dragCol.columnOrder.map((id, index) => {
                const column = dragCol.columns[id];
                const devices = column.devicelist.map((deviceId) => {
                  for (let i = 0; i <= idDevices.length - 1; i++) {
                    if (deviceId === idDevices[i].id) {
                      return idDevices[i];
                    }
                  }
                });

                return (
                  <Column
                    key={column.id}
                    column={column}
                    devices={devices}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleToggle}>{isActive ? "Hide" : "Show "} Device Tracking History</button>
      {isActive ? (
        <ul>
          {log.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      ) : null}
    </>
  );
}

export default Board;
