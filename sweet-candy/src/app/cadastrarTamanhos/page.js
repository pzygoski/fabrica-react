import styles from "./page.module.css"
import Footer from "@/components/Footer"
import { Formulario, Botao } from "@/components/Form"
import Link from "next/link"

export default function cadastrarTamanhos() {
    return (
        <div>
            <form  className={styles.form}>
                <h1 className={styles.h1}>Cadastrar Tamanhos</h1>

                <p className={styles.pDeTamanho}>Tamanhos</p>

                <div className={styles.listaTamanhos}>
                    <p className={styles.tamanhos}>P (pequeno)</p>
                    <p className={styles.tamanhos}>M (médio)</p>
                    <p className={styles.tamanhos}>G (grande)</p>
                </div>

                    <div className={styles.inputNvTamanho}>
                        <label htmlFor="tamanho" className={styles.tituloLabel}>Digite o novo tamanho</label>
                            <input className={styles.input} type="text" id="tamanho" name="tamanho" placeholder="Digite aqui..." required></input>
                    </div>

                    <div className={styles.inputExcluirTamanho}>
                        <label htmlFor="excluirTamanho" className={styles.tituloLabel}>Digite o tamanho que deseja excluir</label>
                        <input className={styles.input} type="text" id="excluirTamanho" name="excluirTamanho" placeholder="Digite aqui..." required></input>
                    </div>

                <button className={styles.button} type="reset"><Link href="">Cancelar</Link></button>
                <button className={styles.button} type="submit"><Link href="">Confirmar</Link></button>
            </form>
            <Footer />
        </div>
    )
}