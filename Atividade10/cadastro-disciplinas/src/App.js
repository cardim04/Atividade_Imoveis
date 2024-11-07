import React, { useEffect, useState } from 'react';
import AlunoForm from './Components/AlunoForm';
import AlunoList from './Components/AlunoList';
import './styles.css';

const App = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const alunosSalvos = JSON.parse(localStorage.getItem('alunos') || '[]');
        setAlunos(alunosSalvos);
    }, []);

    const salvarAluno = (aluno) => {
        const novosAlunos = [...alunos, aluno];
        setAlunos(novosAlunos);
        localStorage.setItem('alunos', JSON.stringify(novosAlunos));
    };

    const deletarAluno = (id) => {
        const alunosAtualizados = alunos.filter(a => a.id !== id);
        setAlunos(alunosAtualizados);
        localStorage.setItem('alunos', JSON.stringify(alunosAtualizados));
    };

    return (
        <div>
            <h1>Cadastro de Alunos</h1>
            <AlunoForm onSave={salvarAluno} />
            <AlunoList alunos={alunos} onDelete={deletarAluno} />
        </div>
    );
};

export default App;
