import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

const AlunoForm = ({ onSave }) => {
    const [faculdades, setFaculdades] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [cursosFiltrados, setCursosFiltrados] = useState([]);

    useEffect(() => {
        setFaculdades(JSON.parse(localStorage.getItem('faculdades') || '[]'));
        setCursos(JSON.parse(localStorage.getItem('cursos') || '[]'));
    }, []);

    const validationSchema = Yup.object({
        nome: Yup.string().required('Nome é obrigatório'),
        sobrenome: Yup.string().required('Sobrenome é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        dataNascimento: Yup.string().required('Data de nascimento é obrigatória'),
        telefone: Yup.string().required('Telefone é obrigatório'),
        faculdadeId: Yup.string().required('Faculdade é obrigatória'),
        cursoId: Yup.string().required('Curso é obrigatório'),
        periodo: Yup.string().required('Período é obrigatório'),
        matricula: Yup.string().required('Matrícula é obrigatória'),
        foto: Yup.string().required('Foto é obrigatória'),
    });

    const filtrarCursosPorFaculdade = (faculdadeId) => {
        setCursosFiltrados(cursos.filter(curso => curso.faculdadeId === faculdadeId));
    };

    return (
        <div className="container">
            <h2>Cadastro de Aluno</h2>
            <Formik
                initialValues={{
                    nome: '',
                    sobrenome: '',
                    email: '',
                    dataNascimento: '',
                    telefone: '',
                    faculdadeId: '',
                    cursoId: '',
                    periodo: 'Matutino',
                    matricula: '',
                    foto: ''
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
                            <label>Sobrenome</label>
                            <Field name="sobrenome" type="text" />
                            <ErrorMessage name="sobrenome" component="div" className="error" />
                        </div>
                        <div>
                            <label>E-mail</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div>
                            <label>Data de Nascimento</label>
                            <Field name="dataNascimento" as={InputMask} mask="99/99/9999" />
                            <ErrorMessage name="dataNascimento" component="div" className="error" />
                        </div>
                        <div>
                            <label>Telefone</label>
                            <Field name="telefone" as={InputMask} mask="(99) 99999-9999" />
                            <ErrorMessage name="telefone" component="div" className="error" />
                        </div>
                        <div>
                            <label>Faculdade</label>
                            <Field name="faculdadeId" as="select" onChange={(e) => {
                                const faculdadeId = e.target.value;
                                setFieldValue('faculdadeId', faculdadeId);
                                filtrarCursosPorFaculdade(faculdadeId);
                            }}>
                                <option value="">Selecione uma faculdade</option>
                                {faculdades.map(faculdade => (
                                    <option key={faculdade.id} value={faculdade.id}>{faculdade.nome}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="faculdadeId" component="div" className="error" />
                        </div>
                        <div>
                            <label>Curso</label>
                            <Field name="cursoId" as="select">
                                <option value="">Selecione um curso</option>
                                {cursosFiltrados.map(curso => (
                                    <option key={curso.id} value={curso.id}>{curso.nome}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="cursoId" component="div" className="error" />
                        </div>
                        <div>
                            <label>Período</label>
                            <Field name="periodo" as="select">
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                                <option value="Noturno">Noturno</option>
                            </Field>
                            <ErrorMessage name="periodo" component="div" className="error" />
                        </div>
                        <div>
                            <label>Matrícula</label>
                            <Field name="matricula" type="text" />
                            <ErrorMessage name="matricula" component="div" className="error" />
                        </div>
                        <div>
                            <label>Foto (URL)</label>
                            <Field name="foto" type="text" />
                            <ErrorMessage name="foto" component="div" className="error" />
                        </div>
                        <button type="submit">Salvar Aluno</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AlunoForm;
