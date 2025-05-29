'use client'
import styles from './page.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Formulario, Botao } from '@/components/Form';
import Link from 'next/link';
import { useState } from 'react';

export default function CriarConta() {
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); // sucesso ou erro

    async function handleSubmit(event) {
        event.preventDefault();

        const nome = event.target.nome.value;
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        const confirmarSenha = event.target.confirmarSenha.value;
        const cpf = event.target.cpf.value;

        if (senha !== confirmarSenha) {
            setMensagem('As senhas não coincidem!');
            setTipoMensagem('erro');
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
                setMensagem(dados.mensagem || 'Conta criada com sucesso!');
                setTipoMensagem('sucesso');
                event.target.reset(); // limpa o formulário
            } else {
                setMensagem(dados.mensagem || 'Erro ao criar conta!');
                setTipoMensagem('erro');
            }
        } catch (erro) {
            setMensagem('Erro ao conectar com o servidor!');
            setTipoMensagem('erro');
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
                    placeholder="Digite seu cpf"
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

                {mensagem && (
                    <p className={tipoMensagem === 'sucesso' ? styles.sucesso : styles.erro}>
                        {mensagem}
                    </p>
                )}
            </form>

            <Footer />
        </div>
    );
}
