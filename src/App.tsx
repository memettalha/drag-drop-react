import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import {FaTrash, FaEdit} from "react-icons/fa"
const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:50px;
`;

const InputContainer = styled.div`
display:flex;
justify-content:center;
gap:1rem;
margin-bottom:20px;`;

const TextField = styled.input`
padding:8px;
font-size:16px;
border:1px solid #ccc;
border-radius:4px;
width:200px;`

const Button = styled.div`
padding:8px 16px;
font-size:16px;
background-color:black;
color:white;
border:none;
border-radius:4px;
cursor:pointer;

&hover{
  background-color:#282b29;
}`;

const ListContainer = styled.div`
display:flex;
justify-content:center;
gap:1rem;
margin:50px;`

const List = styled.div`
display:flex;
flex-direction:column;
text-align:center;
width:300px;`

const ListBox = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
padding: 16px;
margin: 8px;
background-color: #fff;
border:1px solid #ccc;
border-radius:4px;
box-shadow:0 2px 4px rgba(0,0,0,0.1);
`

const EditDeleteContainer = styled.div`
display:flex;
gap:10px;`

const ModalBackground = styled.div`
position: fixed;
top: 0;
left:0;
right:0;
bottom:0;
background-color:rgba(0,0,0,0.5);
display:flex;
justify-content: center;
align-items: center;
`
interface ItemsProps{
  id:string;
  content:string;
}
function App() {
  const [items, setItems] = useState<ItemsProps[]>([])
  const [newItemContent, setNewItemContent] = useState<string>("");
  const [open,setOpen] =useState<boolean>(false);
  const [inputEdit, setInputEdit] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  //OnDragEnd Metodu ekleme
  const  onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const itemsContent = [...items];
    const [RemovedItems] = itemsContent.splice(result.source.index,1);
    itemsContent.splice(result.destination.index,0,RemovedItems);

    setItems( itemsContent);
  }
  const addItems = () => {
    if(!newItemContent.trim()) return;
    const listItemId = nanoid();
    const newList = {
      id:listItemId,
      content: newItemContent,
    }
    setItems([...items, newList])
    setNewItemContent("");
  }

  const deleteItem = (id:string) => {
    setItems((items) => {
      return items.filter((item) => {item.id !==id})
    })
  }
  const openEditModal = (id:string, content:string) => {
    setOpen(true);
    setInputEdit(content);
    setSelectedId(id);
  }
  const saveEditedItem = () => {
    const selectedItem = items.find((item) => item.id = selectedId);
    if(selectedItem){
      selectedItem.content = inputEdit;
      setItems([...items])
    }
    setOpen(false)
  }
  const ClosedEditedModal = () => setOpen(false);
  return (
    <>
      <Container>
        <InputContainer>
        <TextField type="text" value={newItemContent} onChange = {(e) => setNewItemContent(e.target.value)} 
        placeholder= "Yeni bir madde ekleyin"/>
        <Button onClick={addItems}>Ekle</Button>
        </InputContainer>
        <ListContainer>
          <List>
            <h2>To-do List</h2>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="myList">
                  {(provider) =>  (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                    {items.map(({id,content}:ItemsProps,index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provider) => (
                          <ListBox>
                             ref={provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            {content}
                            <EditDeleteContainer>
                            <Button onClick={() => deleteItem(id)}><FaTrash/></Button>
                            <Button onClick={() => openEditModal(id,content)}><FaEdit/></Button>
                            </EditDeleteContainer>
                          </ListBox>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
          </List>
        </ListContainer>
      </Container>
      {open &&(
        <ModalBackground onClick={ClosedEditedModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <TextField type="text" value={inputEdit} onChange={(e) => setInputEdit(e.target.value)}>

            </TextField>
            <Button onClick={saveEditedItem}>OK</Button>
          </ModalContainer>
        </ModalBackground>
      )}
    </>


  );
}

export default App;