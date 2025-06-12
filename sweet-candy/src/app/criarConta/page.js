'use client'
import styles from './page.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Formulario, Botao } from '@/components/Form';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CriarConta() {
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const router = useRouter(); // hook para redirecionamento

    async function handleSubmit(event) {
        event.preventDefault();

        const nome = event.target.nome.value;
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        const confirmarSenha = event.target.confirmarSenha.value;
        const cpf = event.target.cpf.value;

        if (senha !== confirmarSenha) {
            const msg = 'As senhas não coincidem!';
            setMensagem(msg);
            setTipoMensagem('erro');
            alert(msg);
            return;
        }

        try {
            const resposta = await fetch('https://apisweetcandy.dev.vilhena.ifro.edu.br/cadastrarCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_completo: nome,
                    email,
                    senha,
                    cpf,
                }),
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                const msg = dados.mensagem || 'Conta criada com sucesso!';
                setMensagem(msg);
                setTipoMensagem('sucesso');
                alert(msg);
                event.target.reset();

                // *** Aqui adiciona a linha para salvar clienteId no localStorage ***
                // O backend não retorna clienteId, então precisamos fazer login automático ou obter o id após criar.
                // Como a API não retorna o id ao criar, para simplificar, podemos salvar o email no localStorage
                // ou fazer login automático depois de criar a conta.
                // Vou fazer uma chamada fetch para login para obter o id e salvar localStorage

                // Faz login automático após criar a conta para obter o clienteId e salvar localStorage
                const loginResponse = await fetch('https://apisweetcandy.dev.vilhena.ifro.edu.br/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha }),
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    localStorage.setItem('clienteId', loginData.clienteId);
                }

                // Redireciona para a tela de fazer pedido
                router.push('/pedido');
            } else {
                const msg = dados.mensagem || 'Erro ao criar conta!';
                setMensagem(msg);
                setTipoMensagem('erro');
                alert(msg);
            }
        } catch (erro) {
            const msg = 'Erro ao conectar com o servidor!';
            setMensagem(msg);
            setTipoMensagem('erro');
            alert(msg);
        }
    }

    return (
        <div>
            <Header />
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.h1}> Criar conta</h1>

                <Formulario 
                    name="nome" 
                    text="Nome" 
                    type="text" 
                    placeholder="Digite seu nome completo"
                    src="/images/nome.png"
                    alt="Nome: "
                    required
                />
                <Formulario 
                    name="email" 
                    text="E-mail" 
                    type="text" 
                    placeholder="Digite seu e-mail"
                    src="/images/email.png"
                    alt="E-mail: "
                    required 
                />
                <Formulario 
                    name="senha" 
                    text="Senha" 
                    type="password" 
                    placeholder="Digite sua senha"
                    src="/images/senha.png"
                    alt="Senha: "
                    required 
                />
                <Formulario 
                    name="confirmarSenha" 
                    text="Confirmar senha" 
                    type="password" 
                    placeholder="Confirme sua senha"
                    src="/images/senha.png"
                    alt="Confirmação de senha: "
                    required 
                />
                <Formulario 
                    name="cpf" 
                    text="CPF" 
                    type="text" 
                    placeholder="Digite seu CPF"
                    src="/images/cpf.png"
                    alt="CPF: "
                    required 
                /> 
                <Botao
                    type="submit"
                    text="Criar conta" 
                />

                <div className={styles.naoPossuiConta}>
                    <p>Já possui uma conta?</p>
                    <Link className={styles.link} href="/login">Faça seu login</Link>
                </div>
            </form>
            <Footer />
        </div>
    );
}
