import React from 'react';

const DisciplinaList = ({ disciplinas, onDelete }) => (
    <div className="container">
        <h2>Lista de Disciplinas</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Curso</th>
                    <th>Professor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {disciplinas.map(disciplina => (
                    <tr key={disciplina.id}>
                        <td>{disciplina.nome}</td>
                        <td>{disciplina.descricao}</td>
                        <td>{disciplina.status}</td>
                        <td>{disciplina.cursoId}</td>
                        <td>{disciplina.professorId}</td>
                        <td>
                            <button onClick={() => onDelete(disciplina.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DisciplinaList;
