import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const DisciplinaForm = ({ onSave }) => {
    const [cursos, setCursos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [professoresFiltrados, setProfessoresFiltrados] = useState([]);

    useEffect(() => {
        setCursos(JSON.parse(localStorage.getItem('cursos') || '[]'));
        setProfessores(JSON.parse(localStorage.getItem('professores') || '[]'));
    }, []);

    const validationSchema = Yup.object({
        nome: Yup.string().required('Nome é obrigatório'),
        descricao: Yup.string().required('Descrição é obrigatória'),
        status: Yup.string().required('Status é obrigatório'),
        cursoId: Yup.string().required('Curso é obrigatório'),
        professorId: Yup.string().required('Professor é obrigatório'),
    });

    const filtrarProfessoresPorCurso = (cursoId) => {
        setProfessoresFiltrados(professores.filter(prof => prof.cursoId === cursoId));
    };

    return (
        <div className="container">
            <h2>Adicionar Disciplina</h2>
            <Formik
                initialValues={{
                    nome: '',
                    descricao: '',
                    status: 'Ativo',
                    cursoId: '',
                    professorId: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSave({ id: Date.now(), ...values });
                    resetForm();
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div>
                            <label>Nome</label>
                            <Field name="nome" type="text" />
                            <ErrorMessage name="nome" component="div" className="error" />
                        </div>

                        <div>
                            <label>Descrição</label>
                            <Field name="descricao" as="textarea" />
                            <ErrorMessage name="descricao" component="div" className="error" />
                        </div>

                        <div>
                            <label>Status</label>
                            <Field name="status" as="select">
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="error" />
                        </div>

                        <div>
                            <label>Curso</label>
                            <Field name="cursoId" as="select" onChange={(e) => {
                                const cursoId = e.target.value;
                                setFieldValue('cursoId', cursoId);
                                filtrarProfessoresPorCurso(cursoId);
                            }}>
                                <option value="">Selecione um curso</option>
                                {cursos.map(curso => (
                                    <option key={curso.id} value={curso.id}>{curso.nome}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="cursoId" component="div" className="error" />
                        </div>

                        <div>
                            <label>Professor</label>
                            <Field name="professorId" as="select">
                                <option value="">Selecione um professor</option>
                                {professoresFiltrados.map(professor => (
                                    <option key={professor.id} value={professor.id}>{professor.nome}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="professorId" component="div" className="error" />
                        </div>

                        <button type="submit">Salvar Disciplina</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DisciplinaForm;
