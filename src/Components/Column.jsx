import Item from "./Item";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./style.scss";

const DeviceList = styled.div`
padding: 8px;
min-height:100px;
max-height: 50vh;
overflow: scroll;
`;

function Column(props) {

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div className="column-container" ref={provided.innerRef} {...provided.draggableProps}>
          <h3 className="title" {...provided.dragHandleProps}>{props.column.title}</h3>
          <Droppable droppableId={props.column.id} type="device">
            {(provided, snapshot) => (
              <DeviceList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.devices.map((device, index) => (
                  <Item device={device} index={index} key={device.id} />
                ))}
                {provided.placeholder}
              </DeviceList>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
