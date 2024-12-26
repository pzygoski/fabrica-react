import styles from "./page.module.css"
import Footer from "@/components/Footer"
import { Formulario, Botao } from "@/components/Form"
import Link from "next/link"

export default function cadastrarFuncionario() {
    return (
        <div>
            <form className={styles.form}>
                <h1 className={styles.h1}>Cadastrar Funcionário</h1>

                <Formulario 
                name="nome"
                text="Nome"
                type="text" 
                id="nome" 
                placeholder="Digite o nome do funcionário"
                src="/images/nome.png"
                alt="Nome: "
                />

                <Formulario 
                name="email"
                text="E-mail"
                type="email" 
                id="email" 
                placeholder="Digite o e-mail do funcionário"
                src="/images/email.png"
                alt="E-mail: "
                />

                <Formulario 
                name="telefone"
                text="Telefone"
                type="text" 
                id="telefone" 
                placeholder="Digite o telefone do funcionário"
                src="/images/telefone1.png"
                alt="Telefone: "
                />

                <Formulario 
                name="cpf"
                text="CPF"
                type="text" 
                id="cpf" 
                placeholder="Digite o cpf do funcionário"
                src="/images/cpf.png"
                alt="CPF: "
                />

                <Formulario 
                name="endereco"
                text="Endereço"
                type="text" 
                id="endereco" 
                placeholder="Digite o endereço do funcionário"
                src="/images/endereco.png"
                alt="Endereço: "
                />

                <Botao
                href="/"
                text="Cancelar" 
                />

                <Botao
                href="/"
                text="Confirmar" 
                />
                
            </form>

            <Footer />
        </div>
    )
}