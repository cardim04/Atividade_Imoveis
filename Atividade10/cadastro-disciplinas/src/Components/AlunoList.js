import React from 'react';

const AlunoList = ({ alunos, onDelete }) => (
    <div className="container">
        <h2>Lista de Alunos</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome Completo</th>
                    <th>Email</th>
                    <th>Data de Nascimento</th>
                    <th>Telefone</th>
                    <th>Faculdade</th>
                    <th>Curso</th>
                    <th>Período</th>
                    <th>Matrícula</th>
                    <th>Foto</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {alunos.map(aluno => (
                    <tr key={aluno.id}>
                        <td>{aluno.nome} {aluno.sobrenome}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.dataNascimento}</td>
                        <td>{aluno.telefone}</td>
                        <td>{aluno.faculdadeId}</td>
                        <td>{aluno.cursoId}</td>
                        <td>{aluno.periodo}</td>
                        <td>{aluno.matricula}</td>
                        <td><img src={aluno.foto} alt="Foto do aluno" style={{ width: '50px', borderRadius: '50%' }} /></td>
                        <td>
                            <button onClick={() => onDelete(aluno.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AlunoList;
