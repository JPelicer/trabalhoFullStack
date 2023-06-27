import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 15px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  color: white;
  height: 42px;
  margin-top: 20px;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);

`;


const Label = styled.label``;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
          const user = ref.current;
    
          user.nome.value = onEdit.nome;
          user.email.value = onEdit.email;
          user.telefone.value = onEdit.telefone; 
          user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;


        if (
            !user.nome.value ||
            !user.email.value ||
            !user.telefone.value ||
            !user.data_nascimento.value
        ) { 
            return toast.warn("Preencha todos os campos!");
        }

          
        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                email: user.email.value,
                telefone: user.telefone.value,
                data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
           await axios
            .post("http://localhost:8800", {
                nome: user.nome.value,
                email: user.email.value,
                telefone: user.telefone.value,
                data_nascimento: user.data_nascimento.value,
            })

            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }


        user.nome.value = "";
        user.email.value = "";
        user.telefone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();

    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name= "nome"/>
            </InputArea>

            <InputArea>
                <Label>E-mail</Label>
                <Input name = "email" type = "email" />
            </InputArea>

            <InputArea>
                <Label>Telefone</Label>
                <Input name = "telefone"/>
            </InputArea>

            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name = "data_nascimento" type = "date"/>
            </InputArea>

            <Button type = "submit">SALVAR </Button>

        </FormContainer>
    );


};

export default Form;