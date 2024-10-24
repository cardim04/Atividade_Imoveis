'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaCheck, FaTrash } from 'react-icons/fa'
import ReactInputMask from 'react-input-mask'
import * as Yup from "yup"

export default function CadastroPage() {

  function cadastrar(aluno) {
    // Recebo os dados do aluno do formulário
    console.log(aluno)
    // Busco no localStorage a lista de alunos, se não existir crio uma nova vazia
    const alunos = JSON.parse(localStorage.getItem('alunos')) || []
    // Acrescento o novo aluno na lista
    alunos.push(aluno)
    // Gravar a nova lista de alunos no localStorage, substituindo a antiga
    localStorage.setItem('alunos', JSON.stringify(alunos))
    // alert de sucesso
    alert("Aluno cadastrado com sucesso!")
  }

  const initialValues = 
  {
    tipo: "",
    finalidade: "",
    valor: "",
    area: "",
    quartos: "",
    banheiros: "",
    descricao: "",
    foto: "",
    vagasGaragem: "",
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      UF: ""
    },
    proprietario: {
      nome: "",
      CPF: "",
      telefone: "",
      email: ""
    }
  }
    
  

  const validationSchema = Yup.object().shape({
    proprietario: Yup.object(). shape({
    nome: Yup.string().required("Campo é obrigatório"),
    CPF: Yup.string().required("Campo é obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo é obrigatório"),
    
    telefone: Yup.string().required("Campo é obrigatório")
  }),
    endereco: Yup.object().shape({
      cep: Yup.string().required("Campo é obrigatório"),
      logradouro: Yup.string().required("Campo é obrigatório"),
      numero: Yup.string().required("Campo é obrigatório"),
      complemento: Yup.string(),
      bairro: Yup.string().required("Campo é obrigatório"),
      cidade: Yup.string().required("Campo é obrigatório"),
      uf: Yup.string().required("Campo é obrigatório"),
    }),
    tipo: Yup.string().required("Campo é obrigatório"),
    finalidade: Yup.string().required("Campo é obrigatório"),
    valor: Yup.string().required("Campo é obrigatório"),
    area: Yup.string().required("Campo é obrigatório"),
    quartos: Yup.string().required("Campo é obrigatório"),
    area: Yup.string().required("Campo é obrigatório"),
    banheiros: Yup.string().required("Campo é obrigatório"),
    descricao: Yup.string().required("Campo é obrigatório"),
    vagasGaragem: Yup.string().required("Campo é obrigatório"),
    foto: Yup.string()
  })

  return (
    <Pagina titulo={"Cadastro de Imóveis"}>

      {/* Formulário de Cadastro de Aluno */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={cadastrar}
      >
        {({ values, errors, touched, handleBlur, handleSubmit, handleReset, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            
            <div className='text-center'>
              <h3>Dados Do Imovel</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>tipo:</Form.Label>
                <Form.Select
                  name='tipo'
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipo && !errors.tipo}
                  isInvalid={touched.tipo && !!errors.tipo}
                >
                  <option value=''>Selecione</option>
                  <option value="CASA">CASA</option>
                  <option value="APARTAMENTO">APARTAMENTO</option>
                  <option value="CHACARA">CHACARA</option>
                  <option value="LOJA">LOJA</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Finalidade:</Form.Label>
                <Form.Select
                  name='finalidade'
                  value={values.finalidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.finalidade && !errors.finalidade}
                  isInvalid={touched.finalidade && !!errors.finalidade}
                >
                  <option value=''>Selecione</option>
                  <option value="RESIDENCIAL">RESIDENCIAL</option>
                  <option value="COMERCIAL">COMERCIAL</option>
                  <option value="INDUSTRIAL">INDUSTRIAL</option>
                  <option value="RURAL">RURAL</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.finalidade}</Form.Control.Feedback>
              </Form.Group>
            </Row>

              <Row className='mb-2'>
              <Form.Group as={Col} md={6}>
                <Form.Label>Valor:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"R$ 999.999"}
                  placeholder='R$ 999.999'
                  name='valor'
                  type='text'
                  value={values.valor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.valor && !errors.valor}
                  isInvalid={touched.valor && !!errors.valor}
                />
                <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Área</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={" 999m2 x 999m2"}
                  placeholder='999m2 x 999m2'
                  name='area'
                  type='text'
                  value={values.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.area && !errors.area}
                  isInvalid={touched.area && !!errors.area}
                />
                <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
              </Form.Group>
              </Row>
              
              <Row className='mb-2'>
              <Form.Group as={Col} md={6}>
                <Form.Label>Quartos</Form.Label>
                <Form.Control as={ReactInputMask}
                  placeholder='X'
                  name='quartos'
                  type='number'
                  value={values.quartos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quartos && !errors.quartos}
                  isInvalid={touched.quartos && !!errors.quartos}
                  min={"0"}
                />
                <Form.Control.Feedback type='invalid'>{errors.quartos}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Banheiros</Form.Label>
                <Form.Control as={ReactInputMask}
                  placeholder='X'
                  name='banheiros'
                  type='number'
                  value={values.banheiros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.banheiros && !errors.banheiros}
                  isInvalid={touched.banheiros && !!errors.banheiros}
                  min={"0"}
                />
                <Form.Control.Feedback type='invalid'>{errors.banheiros}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Vagas de Garagem</Form.Label>
                <Form.Control as={ReactInputMask}
                  placeholder='X'
                  name='vagasGaragem'
                  type='number'
                  value={values.vagasGaragem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.vagasGaragem && !errors.vagasGaragem}
                  isInvalid={touched.vagasGaragem && !!errors.vagasGaragem}
                  min={"0"}
                />
                <Form.Control.Feedback type='invalid'>{errors.vagasGaragem}</Form.Control.Feedback>
              </Form.Group>
            
              </Row>

              <Row className='md-2'>
              <Form.Group as={Col}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  name='descricao'
                  type='descricao'
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && !!errors.descricao}
                />
                <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
              </Form.Group>
              </Row>

              
            <Row className='mb-2'>
            <Form.Group as={Col}>
                <Form.Label>Link da Foto:</Form.Label>
                <Form.Control
                  name='foto'
                  type='text'
                  value={values.foto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.foto && !errors.foto}
                  isInvalid={touched.foto && !!errors.foto}
                />
                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Dados pessoais */}
            <div className='text-center'>
              <h3>Proprietario</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  tipo='tipo'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && !!errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"999.999.999-99"}
                  placeholder='999.999.999-99'
                  name='CPF'
                  type='text'
                  value={values.CPF}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.CPF && !errors.CPF}
                  isInvalid={touched.CPF && !!errors.CPF}
                />
                <Form.Control.Feedback type='invalid'>{errors.CPF}</Form.Control.Feedback>
              </Form.Group>

            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"(99)99999-9999"}
                  placeholder='(99)99999-9999'
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && !!errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

            </Row>

            {/* Endereço */}

            <div className='text-center'>
              <h3>Endereço</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col} md={3}>
                <Form.Label>CEP:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"99999-999"}
                  placeholder="99999-999"
                  name='endereco.cep'
                  type='text'
                  value={values?.endereco?.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.cep && !errors?.endereco?.cep}
                  isInvalid={touched?.endereco?.cep && !!errors?.endereco?.cep}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.cep}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Logradouro:</Form.Label>
                <Form.Control
                  name='endereco.logradouro'
                  type='text'
                  value={values?.endereco?.logradouro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.logradouro && !errors?.endereco?.logradouro}
                  isInvalid={touched?.endereco?.logradouro && !!errors?.endereco?.logradouro}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.logradouro}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Numero:</Form.Label>
                <Form.Control
                  name='endereco.numero'
                  type='text'
                  value={values?.endereco?.numero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.numero && !errors?.endereco?.numero}
                  isInvalid={touched?.endereco?.numero && !!errors?.endereco?.numero}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.numero}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Complemento:</Form.Label>
                <Form.Control
                  name='endereco.complemento'
                  type='text'
                  value={values?.endereco?.complemento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.complemento && !errors?.endereco?.complemento}
                  isInvalid={touched?.endereco?.complemento && !!errors?.endereco?.complemento}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.complemento}</Form.Control.Feedback>
              </Form.Group>

            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  name='endereco.cidade'
                  type='text'
                  value={values?.endereco?.cidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.cidade && !errors?.endereco?.cidade}
                  isInvalid={touched?.endereco?.cidade && !!errors?.endereco?.cidade}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.cidade}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  name='endereco.bairro'
                  type='text'
                  value={values?.endereco?.bairro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.bairro && !errors?.endereco?.bairro}
                  isInvalid={touched?.endereco?.bairro && !!errors?.endereco?.bairro}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.bairro}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>UF:</Form.Label>
                <Form.Control
                  name='endereco.uf'
                  type='text'
                  value={values?.endereco?.uf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched?.endereco?.uf && !errors?.endereco?.uf}
                  isInvalid={touched?.endereco?.uf && !!errors?.endereco?.uf}
                />
                <Form.Control.Feedback type='invalid'>{errors?.endereco?.uf}</Form.Control.Feedback>
              </Form.Group>

            </Row>

            
           

            {/* Botões */}

            <Form.Group className='text-end mb-5'>
              <Button onClick={handleReset} className='me-2'><FaTrash /> Limpar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>


          </Form>
        )}
      </Formik>



    </Pagina>
  )
}
