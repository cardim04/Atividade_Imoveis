import React, { useEffect, useState } from 'react';
import DisciplinaForm from './Components/DisciplinaForm';
import DisciplinaList from './Components/DisciplinaList';
import './styles.css';

const App = () => {
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        // Carregar dados de cursos e professores no LocalStorage, caso não existam
        const cursosSalvos = JSON.parse(localStorage.getItem('cursos'));
        const professoresSalvos = JSON.parse(localStorage.getItem('professores'));

        if (!cursosSalvos) {
            const cursos = [
                { id: "1", nome: "Engenharia" },
                { id: "2", nome: "Ciência da Computação" },
                { id: "3", nome: "Design" }
            ];
            localStorage.setItem('cursos', JSON.stringify(cursos));
        }

        if (!professoresSalvos) {
            const professores = [
                { id: "1", nome: "Professor A", cursoId: "1" },
                { id: "2", nome: "Professor B", cursoId: "2" },
                { id: "3", nome: "Professor C", cursoId: "1" },
                { id: "4", nome: "Professor D", cursoId: "3" }
            ];
            localStorage.setItem('professores', JSON.stringify(professores));
        }

        // Carregar disciplinas salvas no LocalStorage
        const disciplinasSalvas = JSON.parse(localStorage.getItem('disciplinas') || '[]');
        setDisciplinas(disciplinasSalvas);
    }, []);

    const salvarDisciplina = (disciplina) => {
        const novasDisciplinas = [...disciplinas, disciplina];
        setDisciplinas(novasDisciplinas);
        localStorage.setItem('disciplinas', JSON.stringify(novasDisciplinas));
    };

    const deletarDisciplina = (id) => {
        const disciplinasAtualizadas = disciplinas.filter(d => d.id !== id);
        setDisciplinas(disciplinasAtualizadas);
        localStorage.setItem('disciplinas', JSON.stringify(disciplinasAtualizadas));
    };

    return (
        <div>
            <h1>Cadastro de Disciplinas</h1>
            <DisciplinaForm onSave={salvarDisciplina} />
            <DisciplinaList disciplinas={disciplinas} onDelete={deletarDisciplina} />
        </div>
    );
};

export default App;
