import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
border-radius: 5px;
padding: 8px;
margin-bottom: 8px;color: #3a3a3a;
font-family: Arial, Helvetica, sans-serif;
color: ${(props) => (props.isDragging ? "#fff" : "#3a3a3a")};
background-color: ${(props) => (props.isDragging ? "#FF8700" : "#fff")};
box-shadow: 3px 3px 10px #c9c9c9;
&:hover {
    background-color: #ff88007b;
    transition: ease-in-out .3s;
}
`;

function Item(props) {

  return (
    <Draggable draggableId={props.device.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <h4>Name: {props.device.name}</h4>
          <p>Type: {props.device.type}</p>
          <p>ID: {props.device.id}</p>

        </Container>
      )}
    </Draggable>
  );
}

export default Item;
