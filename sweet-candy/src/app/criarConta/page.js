import styles from './page.module.css';
import Footer from '@/components/Footer';
import { Formulario, Botao } from '@/components/Form';
import Link from 'next/link';


export default function criarConta() {
    return (
        <div>
            <form className={styles.form}>
                <h1 className={styles.h1}> Criar conta</h1>
                <Formulario 
                name="email" 
                text="E-mail" 
                type="text" 
                id="email" 
                placeholder="Digite seu e-mail"
                src="/images/email.png"
                alt="E-mail: "
                />

                <Formulario 
                name="senha" 
                text="Senha" 
                type="password" 
                id="senha" 
                placeholder="Digite sua senha"
                src="/images/senha.png"
                alt="Senha: "
                />

                <Formulario 
                name="confirmarSenha" 
                text="Confirmar senha" 
                type="password" 
                id="confirmarSenha" 
                placeholder="Confirme sua senha"
                src="/images/senha.png"
                alt="Confirmação de senha: "
                />

                <Formulario 
                name="cpf" 
                text="CPF" 
                type="text" 
                id="cpf" 
                placeholder="Digite seu cpf"
                src="/images/cpf.png"
                alt="CPF: "
                /> 

                <Botao
                href="/"
                text="Entrar" 
                />


                <div className={styles.naoPossuiConta}>
                    <p>Já possui uma conta?</p>
                    <Link className={styles.link} href="/login">Faça seu login</Link>
                </div>              

            </form>

            <Footer />
        </div>
    )
}